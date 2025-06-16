const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

// Mongoose model
const Resume = mongoose.model("Resume", new mongoose.Schema({
  name: String,
  email: String,
  skills: String,
  summary: String,
}));

// ✅ OpenRouter GPT-3.5 config
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Your frontend URL
    "X-Title": "Smart Resume Builder",
  },
});

// Suggestion route using GPT-3.5 via OpenRouter
app.post("/suggest", async (req, res) => {
  try {
    const { summary } = req.body;

    const response = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a resume expert. Improve resume summaries professionally." },
        { role: "user", content: `Improve this resume summary:\n\n${summary}` },
      ],
      max_tokens: 150,
    });

    const suggestion = response.choices[0].message.content.trim();
    res.json({ suggestion });

  } catch (err) {
    console.error("OpenRouter error:", err);
    res.status(500).json({ error: "AI Suggestion failed" });
  }
});

// Save route
app.post("/save", async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    res.json({ message: "✅ Resume saved!" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Resume save failed" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
