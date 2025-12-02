import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import cors from "cors";

import assignmentRoutes from "./routes/assignments.js";
import queryRoutes from "./routes/query.js";


const app = express();
app.use(cors());
app.use(express.json()); // <-- FIXED

// Routes
app.use("/assignments", assignmentRoutes);
app.use("/query", queryRoutes);

// Test route for AI evaluation
import { evaluateTaskWithAI } from "./api/aiTaskEvaluator.js";

app.post("/api/test-evaluate", async (req, res) => {
  console.log("abc"); // <-- NOW THIS WILL PRINT

  const { description, githubLink } = req.body;
  try {
    const aiData = await evaluateTaskWithAI(description, githubLink);
    res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: "AI evaluation failed" });
  }
});
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => {
  console.log("CipherSQLStudio backend running on port 5000");
});
