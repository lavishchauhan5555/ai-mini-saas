import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function evaluateCodeFix(brokenCode) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
    });

    const prompt = `
You are a senior software engineer.
Fix and refactor the following code.
Return ONLY corrected code.

Broken code:
${brokenCode}
`;

    const result = await model.generateContent(prompt);

    return result.response.text().trim();
  } catch (err) {
    console.error("Gemini Error →", err);
    return null;
  }
}
