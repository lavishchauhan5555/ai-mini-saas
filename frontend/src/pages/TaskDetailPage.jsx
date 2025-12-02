import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("tasks").select("*").eq("id", id).single();
      setTask(data);
    };
    load();
  }, [id]);

  if (!task) return <div className="p-4 text-white">Loading...</div>;

  const strengths = task.ai_strengths ? String(task.ai_strengths) : "";
  const improvements = task.ai_improvements ? String(task.ai_improvements) : "";

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <button onClick={() => navigate(-1)} className="text-sm text-slate-300">
          ← Back
        </button>
        <h1 className="text-2xl font-semibold">{task.title}</h1>
        <p className="text-slate-200 whitespace-pre-wrap">{task.description}</p>
        {task.github_link && (
          <a
            href={task.github_link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 text-sm"
          >
            View GitHub
          </a>
        )}

        <div className="bg-slate-800 p-4 rounded space-y-3">
          <h2 className="text-lg font-semibold">AI Evaluation</h2>
          <p>
            <span className="font-semibold">Score:</span>{" "}
            {task.ai_score ?? "Running / Not available"}
          </p>

          <div>
            <h3 className="font-semibold">Strengths</h3>
            <p className="text-sm text-slate-200">
              {task.paid
                ? strengths
                : strengths
                ? strengths.slice(0, 120) + "..."
                : "No data"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Improvements</h3>
            <p className="text-sm text-slate-200">
              {task.paid
                ? improvements
                : "Unlock full report to view detailed improvement suggestions."}
            </p>
          </div>

          {!task.paid && (
            <div className="pt-2">
              <Link
                to={`/payment/${task.id}`}
                className="px-3 py-2 rounded bg-amber-500 text-sm"
              >
                Pay to Unlock Full Report
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
