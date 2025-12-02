import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

export default function PaymentPage() {
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const simulatePayment = async () => {
    setLoading(true);
    try {
      // In real app, you would call Stripe/Razorpay test here.
      // For assignment, we simulate success:
      const amount = 199;

      const userRes = await supabase.auth.getUser();
      const userId = userRes.data.user.id;

      await supabase.from("payments").insert({
        user_id: userId,
        task_id: taskId,
        amount,
        status: "success",
      });

      await supabase.from("tasks").update({ paid: true }).eq("id", taskId);

      navigate(`/tasks/${taskId}`);
    } catch (err) {
      console.error(err);
      alert("Payment failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold text-center">Unlock Full Report</h1>
        <p className="text-sm text-slate-200">
          Pay a small amount to unlock the detailed AI evaluation (full strengths & improvements).
          For this assignment, this is a simulated test payment.
        </p>
        <p className="font-semibold text-center text-2xl">₹199</p>
        <button
          onClick={simulatePayment}
          disabled={loading}
          className="w-full py-2 rounded bg-emerald-500 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Simulate Payment"}
        </button>
      </div>
    </div>
  );
}
