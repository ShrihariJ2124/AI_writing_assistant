require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ---------- Middleware ----------
app.use(express.json());

// Allowed origins (use env for production)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);


// ---------- Routes ----------
const grammarRouter = require("./routes/grammarCheck");
const spellRouter = require("./routes/spellChecker");

app.use("/grammar", grammarRouter);
app.use("/spell", spellRouter);

// ---------- Health Check ----------
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Server running",
    time: new Date()
  });
});

// ---------- Error Handler ----------
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
