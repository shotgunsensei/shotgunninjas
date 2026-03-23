const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API_BASE = `${BASE}/api`;

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { ...getHeaders(), ...((init?.headers as Record<string, string>) || {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export interface AdminUser {
  id: number;
  email: string;
  displayName: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Ban {
  id: number;
  userId: number;
  userName: string | null;
  userEmail: string | null;
  reason: string | null;
  bannedAt: string;
}

export function listUsers(): Promise<AdminUser[]> {
  return adminFetch("/admin/users");
}

export function listBans(): Promise<Ban[]> {
  return adminFetch("/admin/bans");
}

export function banUser(userId: number, reason?: string): Promise<Ban> {
  return adminFetch("/admin/bans", {
    method: "POST",
    body: JSON.stringify({ userId, reason }),
  });
}

export function unbanUser(banId: number): Promise<void> {
  return adminFetch(`/admin/bans/${banId}`, { method: "DELETE" });
}
