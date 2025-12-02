import axios from "axios";

export async function evaluateTaskWithAI(description, githubLink) {
  const res = await axios.post("https://ai-mini-saas.onrender.com/api/test-evaluate", {
    description,
    githubLink
  });

  return res.data;
}
