import { useState } from "react";
import { brokenSnippets } from "../data/brokenSnippets";
import { evaluateTaskWithAI } from "../lib/aiClient";

export default function CodeFixPage() {
  const [selectedId, setSelectedId] = useState(brokenSnippets[0].id);
  const [fixedCode, setFixedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const current = brokenSnippets.find((s) => s.id === selectedId);

  const handleFix = async () => {
    setLoading(true);
    setFixedCode("");
    try {
      const result = await evaluateTaskWithAI(current.code);
      setFixedCode(result);
    } catch (err) {
      console.error(err);
      alert("AI error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">AI Code Fix & Refactor</h1>
        <p className="text-sm text-slate-300">
          This demonstrates using AI to fix a broken UI component, a buggy API handler,
          and a poorly written function.
        </p>
        <div className="flex gap-4">
          <select
            className="px-2 py-1 rounded bg-slate-800"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {brokenSnippets.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleFix}
            disabled={loading}
            className="px-4 py-2 rounded bg-emerald-500 text-sm disabled:opacity-50"
          >
            {loading ? "Fixing with AI..." : "Fix Code with AI"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold mb-2">Original Code</h2>
            <pre className="bg-slate-800 p-3 rounded text-xs overflow-auto">
              {current.code}
            </pre>
          </div>
          <div>
            <h2 className="font-semibold mb-2">AI Fixed Code</h2>
            <pre className="bg-slate-800 p-3 rounded text-xs overflow-auto">
              {fixedCode || "Click 'Fix Code with AI' to generate improved code."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
