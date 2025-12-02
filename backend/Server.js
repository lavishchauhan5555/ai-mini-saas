import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Import your routes
import assignmentRoutes from "./routes/assignments.js";
import queryRoutes from "./routes/query.js";

// Import AI evaluator
import { evaluateTaskWithAI } from "./api/aiTaskEvaluator.js";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// --------------------
// API Routes
// --------------------
app.use("/assignments", assignmentRoutes);
app.use("/query", queryRoutes);

// Test route for AI evaluation
app.post("/api/test-evaluate", async (req, res) => {
  console.log("Received AI evaluation request");
  const { description, githubLink } = req.body;

  try {
    const aiData = await evaluateTaskWithAI(description, githubLink);
    res.json(aiData);
  } catch (err) {
    console.error("AI evaluation error:", err);
    res.status(500).json({ error: "AI evaluation failed" });
  }
});

// --------------------
// Serve Frontend
// --------------------
const frontendBuildPath = path.join(__dirname, "../frontend/dist");

// Serve static files
app.use(express.static(frontendBuildPath));

// SPA fallback: redirect all unknown routes to index.html
app.use((req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CipherSQLStudio backend running on port ${PORT}`);
});
