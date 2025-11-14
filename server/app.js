// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// allow only your frontend origin in dev (adjust port if your React runs on 3000)
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));


// routers
const grammarRouter = require("./routes/grammarCheck");
const spellRouter = require("./routes/spellChecker");

app.use("/grammar", grammarRouter);
app.use("/spell", spellRouter);

// health check
app.get("/", (req, res) => res.json({ ok: true, message: "Server running" }));

// basic error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

module.exports = app;
