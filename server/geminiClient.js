// geminiClient.js - debug version of callGemini
const axios = require("axios");
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL = "gemini-2.5-flash";

function normalizeModel(model) {
  const m = (model || DEFAULT_MODEL).toString().trim();
  return m.replace(/^\/?models\//, "");
}

async function callGemini(model = DEFAULT_MODEL, contents = [], options = {}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set in environment");

  const modelId = normalizeModel(model);
  const url = `${GEMINI_BASE}/models/${modelId}:generateContent`;

  const defaultGenConfig = {
    maxOutputTokens: 300,
    temperature: 0.0,
    candidateCount: 1,
    topK: 40,
    topP: 0.95,
    ...(options || {}),
  };

  const body = {
    contents,
    generationConfig: defaultGenConfig,
  };

  // DEBUG: log URL and body summary (do NOT log the API key)
  console.log("DEBUG callGemini -> url:", url);
  console.log("DEBUG callGemini -> body preview:", JSON.stringify(body).slice(0, 1000));

  try {
    const resp = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      timeout: 30000,
    });
    return resp.data;
  } catch (err) {
    if (err.response) {
      console.error("Gemini API response error:", err.response.status, JSON.stringify(err.response.data));
      const e = new Error(`Gemini API error: ${err.response.status}`);
      e.status = err.response.status;
      e.data = err.response.data;
      throw e;
    }
    console.error("Gemini API request error:", err.message);
    throw err;
  }
}

module.exports = { callGemini, DEFAULT_MODEL };
