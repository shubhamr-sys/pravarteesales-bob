"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/careers");
    } else {
      const data = await res.json();
      setError(data.error ?? "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#0057FF]/10 flex items-center justify-center mb-4">
            <Lock size={22} className="text-[#0057FF]" />
          </div>
          <h1 className="text-xl font-bold text-[#0A1F44]">Admin Login</h1>
          <p className="text-sm text-[#0A1F44]/50 mt-1">Pravartee Sales — Careers Manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Enter admin password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A1F44] placeholder-gray-400 focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0057FF] hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
