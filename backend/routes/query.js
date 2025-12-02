import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Execute SQL query from UI
router.post("/", (req, res) => {
  const { query } = req.body;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({ result: rows });
  });
});

// Simple AI hint (you can replace with OpenAI/Gemini later)
router.post("/hint", (req, res) => {
  const { question, userQuery } = req.body;

  res.json({
    hint: `Try using SELECT with a WHERE clause. Look at age column in table.`
  });
});

export default router;
