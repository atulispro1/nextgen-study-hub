import OpenAI from "https://deno.land/x/openai@v4.20.1/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------------------------------------------------------------------------
// SECURITY HARDENING
// ---------------------------------------------------------------------------
// 1. Input validation: subject/difficulty/type/topic are length-capped and
//    newline-stripped so a malicious user cannot inject extra instructions
//    into the prompt (prompt injection) or blow up the request.
// 2. Request size cap: bodies larger than 8KB are rejected before parsing.
// 3. Rate limiting: simple in-memory sliding window (per client IP) so one
//    user cannot hammer the endpoint and run up OpenRouter costs. Supabase
//    also offers an optional API Gateway rate limit (see SECURITY_SETUP.md).
// 4. Error responses never leak internals (no stack traces, no model errors).

const MAX_BODY_BYTES = 8 * 1024; // 8KB
const MAX_FIELD_LENGTH = 2000;
const ALLOWED_TYPES = new Set([
  "quiz",
  "question-answer",
  "simplify",
  "explain",
  "summary",
  "notes",
]);
const ALLOWED_DIFFICULTIES = new Set(["easy", "medium", "hard", ""]);

// Friendly UI labels are mapped to the internal content-type tokens so the
// student's selection actually reaches the prompt. Anything unmapped falls
// back to "explain" (safe generic behavior).
const TYPE_ALIASES = {
  assignment: "explain",
  "viva questions": "question-answer",
  "short notes": "notes",
  explanation: "explain",
  "detailed explanation": "explain",
  "step-by-step solution": "explain",
  "short answer": "explain",
};

// --- Rate limiter (in-memory sliding window) -------------------------------
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12; // 12 calls/minute/IP (student-facing)

const ipBuckets = new Map(); // ip -> number[]

function isRateLimited(ip) {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const timestamps = (ipBuckets.get(ip) || []).filter((t) => t > cutoff);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipBuckets.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipBuckets.set(ip, timestamps);

  // Drop empty buckets so the map never grows unboundedly.
  if (ipBuckets.size > 5000) {
    for (const [key, ts] of ipBuckets) {
      if (ts.length === 0 || ts[ts.length - 1] <= cutoff) {
        ipBuckets.delete(key);
      }
    }
  }

  return false;
}

// Strip control chars / newlines so a crafted value cannot smuggle extra
// instructions into the prompt. Keeps spaces and normal punctuation.
const sanitize = (value) =>
  String(value || "")
    .replace(/[\r\n\t\x00-\x1f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_FIELD_LENGTH);

// Resolve the best-effort client IP from the request headers.
const getClientIp = (req) => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
};

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENROUTER_API_KEY"),
  baseURL: "https://openrouter.ai/api/v1",
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ output: "Method not allowed." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  // Rate limit before any work (or cost) is incurred.
  if (isRateLimited(getClientIp(req))) {
    return new Response(
      JSON.stringify({
        output: "You are sending requests too quickly. Please wait a moment and try again.",
      }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": "10",
        },
      },
    );
  }

  try {
    // Reject oversized bodies before JSON parsing.
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return new Response(
        JSON.stringify({ output: "Request too large." }),
        { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();
    const { subject, difficulty, type, topic } = body || {};

    // Validate + sanitize every input. Types are lowercased first so the
    // UI labels ("Assignment", "Viva Questions", ...) match the whitelist;
    // unknown types fall back to "explain". Difficulty is lowercased too —
    // the quiz UI sends "Easy"/"Medium"/"Hard" but the whitelist is
    // lowercase, so without this every quiz would silently be "medium".
    const rawType = String(type || "").trim().toLowerCase();
    const cleanType = ALLOWED_TYPES.has(rawType)
      ? rawType
      : TYPE_ALIASES[rawType] || "explain";
    const cleanSubject = sanitize(subject) || "General";
    const cleanTopic = sanitize(topic) || "general topic";
    const rawDifficulty = String(difficulty || "").trim().toLowerCase();
    const cleanDifficulty = ALLOWED_DIFFICULTIES.has(rawDifficulty)
      ? rawDifficulty
      : "medium";

    let prompt = "";

    if (cleanType === "quiz") {
      prompt = `
Generate 5 multiple-choice quiz questions.

Subject: ${cleanSubject}
Difficulty: ${cleanDifficulty}

IMPORTANT:
Randomize the correct answer between A, B, C, and D.

Return ONLY valid JSON in this format:

[
{
"question": "Question text",
"option_a": "Option A",
"option_b": "Option B",
"option_c": "Option C",
"option_d": "Option D",
"correct_answer": "A | B | C | D"
}
]

Ensure the correct_answer varies randomly.
Do not repeat the same answer letter.
Do not add explanation.
Return only JSON.
`;
    } else {
      prompt = `
You are an AI academic assistant helping engineering students.

Subject: ${cleanSubject}
Content Type: ${cleanType}
Topic: ${cleanTopic}

Write a clear, well-structured answer using clean Markdown formatting:

# A short, clear title

A simple opening paragraph explaining the topic for a beginner.

## Section headings when useful

- Use bullet points for key facts
- Use numbered lists for steps or processes
- Use **bold** only for the most important terms
- Use \`code\` for technical terms, commands or formulas

Formatting rules (IMPORTANT):
- Always start with a # title.
- Keep paragraphs short and simple.
- Use proper Markdown everywhere — the UI renders it like ChatGPT.
- Do NOT use tables, images, links, or raw symbols like asterisk soup.
- For question-answer or step-by-step types, end with a short ## Summary.
`;
    }

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful academic assistant." },
        { role: "user", content: prompt },
      ],
    });

    const output = completion.choices[0].message.content;

    return new Response(JSON.stringify({ output }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Log details server-side only; never send them to the client.
    console.error("ai-assistant error:", error?.message || error);

    return new Response(
      JSON.stringify({ output: "Error generating response." }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});
