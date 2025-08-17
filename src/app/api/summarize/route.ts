import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();

    // 🔹 validation
    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ error: "Transcript is required" }, { status: 400 });
    }

    // 🔹 Call Groq API
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // GROQ MODEL
      messages: [
        {
          role: "system",
          content: "You are a helpful AI that summarizes transcripts clearly in bullet points.",
        },
        {
          role: "user",
          content: `Summarize this transcript:\n\n${transcript}`,
        },
      ],
    });

    // 🔹 Extract summary
    const summary = completion.choices[0]?.message?.content?.trim() || "No summary generated.";

    // 🔹 Send back summary
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      { error: "Failed to summarize transcript" },
      { status: 500 }
    );
  }
}
