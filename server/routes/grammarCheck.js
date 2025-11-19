// server/routes/grammarCheck.js
const express = require("express");
const { callGemini } = require("../geminiClient");
const router = express.Router();

function extractText(data) {
  if (!data || !Array.isArray(data.candidates) || data.candidates.length === 0) return null;
  const parts = data.candidates[0]?.content?.parts || [];
  return parts.map(p => (p.text || "")).join(" ").trim() || null;
}

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Invalid 'text' in request body" });
    }

    const contents = [
      {
        role: "user",
        parts: [
          {
            text:
                 "You are a precise grammar correction system."+
                 "Correct grammar, punctuation, verb tense, clarity, and sentence structure while preserving the original meaning."+
                 "Do NOT add new ideas or remove information. "+
                 "Do NOT show reasoning. "+
                 "Return ONLY the corrected text with no explanations."
          },
          { text }
        ]
      }
    ];

    const data = await callGemini(undefined, contents, {
      maxOutputTokens: 512,
      temperature: 0.0,
      candidateCount: 1
    });

    const corrected = extractText(data);

    if (!corrected) {
      return res.status(502).json({ error: "No output returned from Gemini", details: data });
    }

    res.json({ correctedText: corrected });
  } catch (err) {
    console.error("grammarCheck error:", err?.message || err);
    res.status(err.status || 500).json({ error: "Error checking grammar", details: err?.data || err?.message });
  }
});

module.exports = router;
