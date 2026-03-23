import { createContext, useContext } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API_BASE = `${BASE}/api`;

export interface AuthUser {
  id: number;
  email: string;
  displayName: string;
  isAdmin: boolean;
}

async function authFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("auth_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init?.headers as Record<string, string>) || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function signup(data: {
  email: string;
  password: string;
  displayName: string;
}): Promise<{ user: AuthUser; token: string }> {
  const result = await authFetch<{ user: AuthUser; token: string }>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
  localStorage.setItem("auth_token", result.token);
  return result;
}

export async function signin(data: {
  email: string;
  password: string;
}): Promise<{ user: AuthUser; token: string }> {
  const result = await authFetch<{ user: AuthUser; token: string }>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });
  localStorage.setItem("auth_token", result.token);
  return result;
}

export async function signout(): Promise<void> {
  try {
    await authFetch("/auth/signout", { method: "POST" });
  } finally {
    localStorage.removeItem("auth_token");
  }
}

export async function getMe(): Promise<AuthUser | null> {
  const token = localStorage.getItem("auth_token");
  if (!token) return null;
  try {
    return await authFetch<AuthUser>("/auth/me");
  } catch {
    localStorage.removeItem("auth_token");
    return null;
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem("auth_token");
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  setUser: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
