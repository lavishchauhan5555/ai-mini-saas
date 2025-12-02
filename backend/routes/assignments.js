import express from "express";
import { loadSampleData } from "../db.js";
import fs from "fs";

const router = express.Router();

// GET assignment + load its data
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = fs.readFileSync(`assignments/assignment${id}.json`, "utf-8");
    const assignment = JSON.parse(data);

    await loadSampleData(assignment.sampleData);

    res.json({
      message: "Assignment loaded",
      assignment
    });

  } catch (err) {
    res.status(500).json({ error: "Assignment not found" });
  }
});

export default router;
