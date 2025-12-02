import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { evaluateTaskWithAI } from "../lib/aiClient";

export default function NewTaskPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Insert basic task
      const { data: insertData, error: insertError } = await supabase
        .from("tasks")
        .insert({
          user_id: user.id,
          title,
          description,
          github_link: githubLink,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // 2. Call AI evaluation
      const ai = await evaluateTaskWithAI(description, githubLink);

      // 3. Update task with AI results
      await supabase
        .from("tasks")
        .update({
          ai_score: ai.score,
          ai_strengths: ai.strengths,
          ai_improvements: ai.improvements,
        })
        .eq("id", insertData.id);

      navigate(`/tasks/${insertData.id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-slate-300"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-semibold mb-4">
          New Coding Task for Evaluation
        </h1>
        <form className="space-y-4" onSubmit={handleCreate}>
          <input
            className="w-full px-4 py-2 rounded bg-slate-800"
            placeholder="Task Title (e.g. E-commerce Cart API)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full px-4 py-2 rounded bg-slate-800 h-40"
            placeholder="Describe your coding task, what you implemented, tech stack, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 rounded bg-slate-800"
            placeholder="GitHub link (optional)"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Evaluating with AI..." : "Create & Run AI Evaluation"}
          </button>
        </form>
      </div>
    </div>
  );
}
