import OpenAI from "https://deno.land/x/openai@v4.20.1/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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

  try {
    // READ BODY ONLY ONCE
    const { subject, difficulty, type, topic } = await req.json();

    let prompt = "";

    if (type === "quiz") {
      prompt = `
Generate 5 multiple-choice quiz questions.

Subject: ${subject}
Difficulty: ${difficulty}

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

Subject: ${subject}
Content Type: ${type}
Topic: ${topic}

Create an engaging and well-structured response with:

📘 A clear title  
✨ Small emojis for sections  
📌 Bullet points when useful  
🧠 Simple explanations for beginners  
⚡ Key points highlighted  
📚 Short and easy-to-remember notes

Make it visually structured and easy to read for students.
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
