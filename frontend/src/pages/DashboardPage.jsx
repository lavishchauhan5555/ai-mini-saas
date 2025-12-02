import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });
      setTasks(data || []);
    };
    loadTasks();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="flex justify-between items-center p-4 bg-slate-800">
        <h1 className="text-xl font-semibold">Smart Task Evaluator</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-red-500 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-4 max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Tasks</h2>
          <div className="space-x-2">
            <Link
              to="/tasks/new"
              className="px-3 py-2 rounded bg-blue-500 text-sm"
            >
              + New Task
            </Link>
            <Link
              to="/code-fix"
              className="px-3 py-2 rounded bg-emerald-500 text-sm"
            >
              AI Code Fix
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.length === 0 && <p>No tasks yet. Create one!</p>}
          {tasks.map((task) => (
            <Link
              key={task.id}
              to={`/tasks/${task.id}`}
              className="block bg-slate-800 p-4 rounded-lg hover:bg-slate-700"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-slate-300 truncate">
                    {task.description}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p>Score: {task.ai_score ?? "N/A"}</p>
                  <p className={task.paid ? "text-emerald-400" : "text-yellow-400"}>
                    {task.paid ? "Paid" : "Locked"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
