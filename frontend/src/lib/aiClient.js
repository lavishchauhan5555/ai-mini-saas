import axios from "axios";

export async function evaluateTaskWithAI(description, githubLink) {
  const res = await axios.post("http://localhost:5000/api/test-evaluate", {
    description,
    githubLink
  });

  return res.data;
}
