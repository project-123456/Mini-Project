
import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Please enter a message.",
      });
    }

    const conversation = history
      .filter(
        (item) =>
          ["user", "assistant"].includes(item.role) &&
          typeof item.content === "string"
      )
      .slice(-10)
      .map((item) => ({
        role: item.role,
        content: item.content,
      }));

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6-astra",
      instructions: `You are a kind, supportive mental wellness assistant
for a Mental Health Journal application.
Reply in the same language as the user, including Hindi or Hinglish.
Give empathetic, clear and useful answers.
Use short paragraphs and practical coping suggestions.
Do not diagnose medical or mental health conditions.
Never claim to replace a qualified professional.
If the user may be in immediate danger, encourage them to contact
local emergency services or a trusted person.`,
      input: [
        ...conversation,
        { role: "user", content: message.trim() },
      ],
    });

    res.json({
      reply:
        response.output_text ||
        "I'm here to listen. Could you tell me a little more?",
    });
  } catch (error) {
    console.error("AI chatbot error:", error.message);

    res.status(500).json({
      message: "AI reply failed. Please check the API key, model and server logs.",
    });
  }
});

export default router;
