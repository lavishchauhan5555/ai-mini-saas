import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import assignmentRoutes from "./routes/assignments.js";
import queryRoutes from "./routes/query.js";
import { evaluateTaskWithAI } from "./api/aiTaskEvaluator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/assignments", assignmentRoutes);
app.use("/query", queryRoutes);

app.post("/api/test-evaluate", async (req, res) => {
  const { description, githubLink } = req.body;

  try {
    const aiData = await evaluateTaskWithAI(description, githubLink);
    res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: "AI evaluation failed" });
  }
});

// Frontend path
const frontendPath = path.join(__dirname, "public");

// Serve static files
app.use(express.static(frontendPath));

// SPA fallback (important for React Router)
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`CipherSQLStudio backend running on port ${PORT}`)
);
