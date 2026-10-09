"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Trash2, ToggleLeft, ToggleRight, LogOut,
  ChevronDown, ChevronUp, Pencil, X, Check, Loader2,
} from "lucide-react";

/* ── types ───────────────────────────────────────────────────── */
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  active: boolean;
  created_at: string;
}

const EMPTY_JOB = {
  title: "",
  department: "",
  location: "Noida, UP",
  type: "Full-time",
  experience: "",
  description: "",
  responsibilities: [""],
  requirements: [""],
};

/* ── helpers ─────────────────────────────────────────────────── */
function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
        {label}
      </label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              placeholder={`${label} item ${i + 1}`}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:border-[#0057FF] focus:ring-1 focus:ring-[#0057FF]/20"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="text-xs text-[#0057FF] font-semibold hover:underline"
        >
          + Add item
        </button>
      </div>
    </div>
  );
}

/* ── job form (add / edit) ───────────────────────────────────── */
function JobForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: typeof EMPTY_JOB | Job;
  onSave: (data: typeof EMPTY_JOB) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    title: initial.title,
    department: initial.department,
    location: initial.location,
    type: initial.type,
    experience: initial.experience,
    description: initial.description,
    responsibilities: [...(initial.responsibilities.length ? initial.responsibilities : [""])],
    requirements: [...(initial.requirements.length ? initial.requirements : [""])],
  });

  const field = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(form); }}
      className="space-y-5 bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: "title", label: "Job Title *", placeholder: "e.g. Network Engineer" },
          { key: "department", label: "Department *", placeholder: "e.g. Engineering & Delivery" },
          { key: "location", label: "Location", placeholder: "Noida, UP" },
          { key: "experience", label: "Experience", placeholder: "e.g. 2–5 years" },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
              {label}
            </label>
            <input
              value={(form as Record<string, unknown>)[key] as string}
              onChange={field(key)}
              placeholder={placeholder}
              required={key === "title" || key === "department"}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0A1F44] focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 bg-white"
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
            Employment Type
          </label>
          <select
            value={form.type}
            onChange={field("type")}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0A1F44] focus:outline-none focus:border-[#0057FF] bg-white"
          >
            {["Full-time", "Part-time", "Contract", "Internship"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={field("description")}
          rows={3}
          placeholder="Brief role overview visible on the careers page…"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0A1F44] focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 resize-none bg-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ListEditor
          label="Responsibilities"
          items={form.responsibilities}
          onChange={(v) => setForm((p) => ({ ...p, responsibilities: v }))}
        />
        <ListEditor
          label="Requirements"
          items={form.requirements}
          onChange={(v) => setForm((p) => ({ ...p, requirements: v }))}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#0057FF] hover:bg-blue-600 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 border border-gray-200 text-[#0A1F44]/60 hover:text-[#0A1F44] font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ── main page ───────────────────────────────────────────────── */
export default function AdminCareersPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/jobs");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setJobs(data.jobs ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  /* ── add ─── */
  const handleAdd = async (form: typeof EMPTY_JOB) => {
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        responsibilities: form.responsibilities.filter(Boolean),
        requirements: form.requirements.filter(Boolean),
      }),
    });
    setSaving(false);
    if (!res.ok) { setError("Failed to create job."); return; }
    setShowAdd(false);
    fetchJobs();
  };

  /* ── edit ─── */
  const handleEdit = async (id: number, form: typeof EMPTY_JOB) => {
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        responsibilities: form.responsibilities.filter(Boolean),
        requirements: form.requirements.filter(Boolean),
      }),
    });
    setSaving(false);
    if (!res.ok) { setError("Failed to update job."); return; }
    setEditingId(null);
    fetchJobs();
  };

  /* ── toggle active ─── */
  const handleToggle = async (job: Job) => {
    setTogglingId(job.id);
    await fetch(`/api/admin/jobs/${job.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !job.active }),
    });
    setTogglingId(null);
    fetchJobs();
  };

  /* ── delete ─── */
  const handleDelete = async (id: number) => {
    if (!confirm("Permanently delete this job opening?")) return;
    setDeletingId(id);
    await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
    setDeletingId(null);
    fetchJobs();
  };

  /* ── logout ─── */
  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-[#0A1F44] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">Pravartee Sales</p>
          <h1 className="text-lg font-bold">Careers Manager</h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0A1F44]">Job Openings</h2>
            <p className="text-sm text-[#0A1F44]/50 mt-0.5">
              {jobs.filter((j) => j.active).length} active · {jobs.filter((j) => !j.active).length} disabled
            </p>
          </div>
          <button
            onClick={() => { setShowAdd(true); setEditingId(null); }}
            className="inline-flex items-center gap-2 bg-[#0057FF] hover:bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-blue-900/20"
          >
            <Plus size={16} /> Add Opening
          </button>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
        )}

        {/* Add form */}
        {showAdd && (
          <div className="mb-6">
            <JobForm
              initial={EMPTY_JOB}
              onSave={handleAdd}
              onCancel={() => setShowAdd(false)}
              saving={saving}
            />
          </div>
        )}

        {/* Jobs list */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#0057FF]" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-[#0A1F44]/40">
            No job openings yet. Click &quot;Add Opening&quot; to create one.
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`bg-white rounded-2xl border transition-all duration-200 ${
                  job.active ? "border-gray-100" : "border-gray-100 opacity-60"
                }`}
              >
                {/* Card header */}
                <div className="p-5 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          job.active
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {job.active ? "Active" : "Disabled"}
                      </span>
                      <span className="text-xs text-[#0A1F44]/40">{job.department}</span>
                    </div>
                    <h3 className="font-bold text-[#0A1F44] text-base leading-snug truncate">
                      {job.title}
                    </h3>
                    <p className="text-xs text-[#0A1F44]/50 mt-0.5">
                      {job.location} · {job.type} · {job.experience}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Toggle */}
                    <button
                      onClick={() => handleToggle(job)}
                      disabled={togglingId === job.id}
                      title={job.active ? "Disable" : "Enable"}
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] text-[#0A1F44]/50 hover:text-[#0057FF] transition-colors disabled:opacity-40"
                    >
                      {togglingId === job.id
                        ? <Loader2 size={17} className="animate-spin" />
                        : job.active
                          ? <ToggleRight size={20} className="text-green-600" />
                          : <ToggleLeft size={20} />}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => { setEditingId(editingId === job.id ? null : job.id); setExpandedId(null); }}
                      title="Edit"
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] text-[#0A1F44]/50 hover:text-[#0057FF] transition-colors"
                    >
                      <Pencil size={15} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(job.id)}
                      disabled={deletingId === job.id}
                      title="Delete"
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#0A1F44]/50 hover:text-red-600 transition-colors disabled:opacity-40"
                    >
                      {deletingId === job.id
                        ? <Loader2 size={15} className="animate-spin" />
                        : <Trash2 size={15} />}
                    </button>

                    {/* Expand */}
                    <button
                      onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                      title="Preview"
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] text-[#0A1F44]/50 hover:text-[#0A1F44] transition-colors"
                    >
                      {expandedId === job.id ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                    </button>
                  </div>
                </div>

                {/* Inline edit form */}
                {editingId === job.id && (
                  <div className="px-5 pb-5">
                    <JobForm
                      initial={job}
                      onSave={(form) => handleEdit(job.id, form)}
                      onCancel={() => setEditingId(null)}
                      saving={saving}
                    />
                  </div>
                )}

                {/* Expand preview */}
                {expandedId === job.id && editingId !== job.id && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/40 mb-2">Description</p>
                      <p className="text-sm text-[#0A1F44]/70 leading-relaxed">{job.description || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/40 mb-2">Responsibilities</p>
                      <ul className="space-y-1">
                        {job.responsibilities.map((r, i) => (
                          <li key={i} className="text-sm text-[#0A1F44]/70 flex gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0057FF] shrink-0" />{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/40 mb-2">Requirements</p>
                      <ul className="space-y-1">
                        {job.requirements.map((r, i) => (
                          <li key={i} className="text-sm text-[#0A1F44]/70 flex gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F5A623] shrink-0" />{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
