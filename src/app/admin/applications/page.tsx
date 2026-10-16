"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogOut, Loader2, Download, ChevronDown, ChevronUp, Mail, Phone, ExternalLink,
} from "lucide-react";

interface Application {
  id: number;
  job_id: number | null;
  job_title: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  cover_letter: string;
  resume_filename: string;
  resume_mime: string;
  created_at: string;
}

interface JobGroup {
  key: string;
  title: string;
  applications: Application[];
}

function groupByJob(apps: Application[]): JobGroup[] {
  const map = new Map<string, JobGroup>();

  for (const app of apps) {
    const title = app.job_title?.trim() || "General Application";
    const key =
      app.job_id != null
        ? `id:${app.job_id}`
        : `title:${title.toLowerCase()}`;

    const existing = map.get(key);
    if (existing) {
      existing.applications.push(app);
    } else {
      map.set(key, { key, title, applications: [app] });
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    const aGeneral = a.title.toLowerCase() === "general application";
    const bGeneral = b.title.toLowerCase() === "general application";
    if (aGeneral !== bGeneral) return aGeneral ? 1 : -1;
    return a.title.localeCompare(b.title);
  });
}

function ApplicationCard({
  app,
  expanded,
  onToggle,
}: {
  app: Application;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-5 flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[#0A1F44] text-base truncate">{app.name}</h3>
          <p className="text-xs text-[#0A1F44]/50 mt-0.5">
            {app.email}
            {app.phone ? ` · ${app.phone}` : ""}
            {" · "}
            {new Date(app.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <a
            href={`/api/admin/applications/${app.id}/resume`}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] text-[#0A1F44]/50 hover:text-[#0057FF] transition-colors"
            title={`Download ${app.resume_filename}`}
          >
            <Download size={16} />
          </a>
          <button
            type="button"
            onClick={onToggle}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] text-[#0A1F44]/50"
          >
            {expanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href={`mailto:${app.email}`}
              className="inline-flex items-center gap-1.5 text-[#0057FF] hover:underline"
            >
              <Mail size={14} /> {app.email}
            </a>
            {app.phone && (
              <a
                href={`tel:${app.phone}`}
                className="inline-flex items-center gap-1.5 text-[#0A1F44]/70 hover:underline"
              >
                <Phone size={14} /> {app.phone}
              </a>
            )}
            {app.linkedin && (
              <a
                href={app.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0A1F44]/70 hover:underline"
              >
                <ExternalLink size={14} /> LinkedIn
              </a>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/40 mb-1">
              Resume
            </p>
            <a
              href={`/api/admin/applications/${app.id}/resume`}
              className="text-sm text-[#0057FF] hover:underline"
            >
              {app.resume_filename}
            </a>
          </div>
          {app.cover_letter && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/40 mb-1">
                Cover note
              </p>
              <p className="text-sm text-[#0A1F44]/70 whitespace-pre-wrap leading-relaxed">
                {app.cover_letter}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminApplicationsPage() {
  const router = useRouter();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const groups = groupByJob(apps);

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/applications");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to load applications.");
        setLoading(false);
        return;
      }
      setApps(data.applications ?? []);
    } catch {
      setError("Could not reach the server.");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE", credentials: "same-origin" });
    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-[#0A1F44] text-white px-6 py-4 flex items-center justify-end gap-4">
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          <LogOut size={15} /> Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-[#0A1F44]">Job Applications</h2>
            <p className="text-sm text-[#0A1F44]/50 mt-0.5">
              {apps.length} application{apps.length === 1 ? "" : "s"} · {groups.length} job
              {groups.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            href="/admin/careers"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#F8F9FA] text-[#0A1F44] font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors border border-gray-200"
          >
            Back to Job Openings
          </Link>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#0057FF]" />
          </div>
        ) : apps.length === 0 ? (
          <div className="text-center py-20 text-[#0A1F44]/40">
            No applications yet.
          </div>
        ) : (
          <div className="space-y-10">
            {groups.map((group) => (
              <section key={group.key}>
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
                    {group.title}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0057FF] bg-[#0057FF]/10 px-2.5 py-1 rounded-full shrink-0">
                    {group.applications.length} applicant
                    {group.applications.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="space-y-3">
                  {group.applications.map((app) => (
                    <ApplicationCard
                      key={app.id}
                      app={app}
                      expanded={expandedId === app.id}
                      onToggle={() =>
                        setExpandedId(expandedId === app.id ? null : app.id)
                      }
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
