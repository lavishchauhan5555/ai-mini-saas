import axios from "axios";

export async function evaluateTaskWithAI(description, githubLink) {
  const prompt = `
You are a senior code reviewer.

Task description:
${description}

GitHub link: ${githubLink || "Not provided"}

Return valid JSON exactly in this format:

{
  "score": number (1-10),
  "strengths": ["point1", "point2"],
  "improvements": ["point1", "point2"]
}
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    return JSON.parse(aiText.replace(/```json|```/g, "").trim());

  } catch (err) {
    console.error("Gemini Error →", err.response?.data || err);
    return { score: null, strengths: [], improvements: [] };
  }
}
