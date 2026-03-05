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
  // Handle preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { subject, type, topic } = await req.json();

    const prompt = `
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
