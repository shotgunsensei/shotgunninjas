import { useState, useEffect, useCallback } from "react";
import { Lock, BarChart3, Mail, ExternalLink, RefreshCw, LogOut } from "lucide-react";
import { toast } from "sonner";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API_BASE = `${BASE}/api`;
const STORAGE_KEY = "ssn_admin_password";

function readStoredPassword(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredPassword(value: string | null) {
  try {
    if (value === null) sessionStorage.removeItem(STORAGE_KEY);
    else sessionStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

type SourceRow = { source: string | null; count: number };
type UrlRow = { url: string; source: string | null; count: number };

interface AnalyticsData {
  windowDays: number;
  outbound: {
    totals: { last7: number; last30: number; allTime: number };
    bySource: SourceRow[];
    byUrl: UrlRow[];
  };
  newsletter: {
    total: number;
    active: number;
    last30: number;
    unsubscribed: number;
    unsubscribedLast30: number;
  };
}

async function verifyPassword(password: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/admin/analytics/verify`, {
    method: "POST",
    headers: { "x-admin-password": password },
  });
  if (!res.ok) return false;
  const body = await res.json().catch(() => ({}));
  return body.verified === true;
}

async function fetchAnalytics(
  password: string,
  days: 7 | 30,
): Promise<AnalyticsData> {
  const res = await fetch(`${API_BASE}/admin/analytics?days=${days}`, {
    headers: { "x-admin-password": password },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-[10px] font-[var(--font-display)] tracking-[0.25em] text-gray-400 uppercase mb-2">
        {label}
      </p>
      <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function LoginGate({ onLogin }: { onLogin: (pw: string) => void }) {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setSubmitting(true);
    try {
      const ok = await verifyPassword(password);
      if (!ok) {
        toast.error("Invalid admin password.");
        return;
      }
      writeStoredPassword(password);
      onLogin(password);
    } catch {
      toast.error("Could not verify password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Admin Analytics</h1>
            <p className="text-xs text-gray-400">Restricted access</p>
          </div>
        </div>
        <label className="block text-xs font-[var(--font-display)] tracking-[0.2em] text-gray-400 uppercase mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/40 mb-4"
          autoFocus
        />
        <button
          type="submit"
          disabled={submitting || !password.trim()}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold disabled:opacity-50"
        >
          {submitting ? "Verifying..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function AdminAnalytics() {
  const [password, setPassword] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<7 | 30>(30);

  useEffect(() => {
    const stored = readStoredPassword();
    if (!stored) return;
    verifyPassword(stored)
      .then((ok) => {
        if (ok) setPassword(stored);
        else writeStoredPassword(null);
      })
      .catch(() => {
        writeStoredPassword(null);
      });
  }, []);

  const load = useCallback(
    async (pw: string, range: 7 | 30) => {
      setLoading(true);
      try {
        const result = await fetchAnalytics(pw, range);
        setData(result);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to load.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (password) load(password, days);
  }, [password, days, load]);

  if (!password) {
    return <LoginGate onLogin={setPassword} />;
  }

  const handleLogout = () => {
    writeStoredPassword(null);
    setPassword(null);
    setData(null);
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[10px] font-[var(--font-display)] tracking-[0.3em] text-primary/80 uppercase mb-2">
              Shotgun Ninjas // Admin
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)]">
              Analytics
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Outbound link clicks & newsletter performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-white/10 overflow-hidden">
              {([7, 30] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-4 py-2 text-xs font-semibold transition-colors ${
                    days === d
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/[0.02] text-gray-300 hover:bg-white/[0.06]"
                  }`}
                >
                  Last {d} days
                </button>
              ))}
            </div>
            <button
              onClick={() => load(password, days)}
              disabled={loading}
              className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-gray-300 hover:text-white hover:bg-white/[0.06] disabled:opacity-50"
              title="Refresh"
              aria-label="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-gray-300 hover:text-white hover:bg-white/[0.06]"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!data && loading && (
          <p className="text-sm text-gray-400">Loading analytics…</p>
        )}

        {data && (
          <>
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-[var(--font-display)] tracking-[0.25em] text-gray-300 uppercase">
                  Outbound Clicks
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <StatCard label="Last 7 days" value={data.outbound.totals.last7} />
                <StatCard label="Last 30 days" value={data.outbound.totals.last30} />
                <StatCard label="All time" value={data.outbound.totals.allTime} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">By source</h3>
                    <span className="text-xs text-gray-500">
                      Last {data.windowDays}d
                    </span>
                  </div>
                  {data.outbound.bySource.length === 0 ? (
                    <p className="px-5 py-8 text-sm text-gray-500 text-center">
                      No clicks recorded.
                    </p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-gray-500">
                          <th className="px-5 py-2 font-medium">Source</th>
                          <th className="px-5 py-2 font-medium text-right">Clicks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.outbound.bySource.map((r, i) => (
                          <tr
                            key={`${r.source ?? "null"}-${i}`}
                            className="border-t border-white/5"
                          >
                            <td className="px-5 py-3 text-gray-200">
                              {r.source ?? (
                                <span className="text-gray-500 italic">unknown</span>
                              )}
                            </td>
                            <td className="px-5 py-3 text-right tabular-nums font-semibold">
                              {r.count}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">By URL</h3>
                    <span className="text-xs text-gray-500">
                      Top 100 · last {data.windowDays}d
                    </span>
                  </div>
                  {data.outbound.byUrl.length === 0 ? (
                    <p className="px-5 py-8 text-sm text-gray-500 text-center">
                      No clicks recorded.
                    </p>
                  ) : (
                    <div className="max-h-[480px] overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background">
                          <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-gray-500">
                            <th className="px-5 py-2 font-medium">URL</th>
                            <th className="px-5 py-2 font-medium">Source</th>
                            <th className="px-5 py-2 font-medium text-right">Clicks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.outbound.byUrl.map((r, i) => (
                            <tr
                              key={`${r.url}-${r.source ?? "null"}-${i}`}
                              className="border-t border-white/5"
                            >
                              <td className="px-5 py-3 max-w-[320px]">
                                <a
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-200 hover:text-primary inline-flex items-center gap-1.5 truncate"
                                  title={r.url}
                                >
                                  <span className="truncate">{r.url}</span>
                                  <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-60" />
                                </a>
                              </td>
                              <td className="px-5 py-3 text-gray-400 text-xs">
                                {r.source ?? (
                                  <span className="italic text-gray-600">—</span>
                                )}
                              </td>
                              <td className="px-5 py-3 text-right tabular-nums font-semibold">
                                {r.count}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-[var(--font-display)] tracking-[0.25em] text-gray-300 uppercase">
                  Newsletter Subscribers
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total" value={data.newsletter.total} />
                <StatCard
                  label="Active"
                  value={data.newsletter.active}
                  hint="Not unsubscribed"
                />
                <StatCard
                  label="New (30d)"
                  value={data.newsletter.last30}
                />
                <StatCard
                  label="Unsubscribed"
                  value={data.newsletter.unsubscribed}
                  hint={`${data.newsletter.unsubscribedLast30} in last 30d`}
                />
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
