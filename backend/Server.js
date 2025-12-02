import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

import assignmentRoutes from "./routes/assignments.js";
import queryRoutes from "./routes/query.js";


const app = express();
// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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
const frontendBuildPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendBuildPath));

// Fallback for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});


app.listen(5000, () => {
  console.log("CipherSQLStudio backend running on port 5000");
});
