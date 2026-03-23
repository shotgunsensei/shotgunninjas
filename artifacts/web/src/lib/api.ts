const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API_BASE = `${BASE}/api`;

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export interface Song {
  id: number;
  name: string;
  tags: string;
  fileUrl: string;
  createdAt: string;
}

export function listSongs(): Promise<Song[]> {
  return apiFetch("/songs");
}

export function verifyAdmin(password: string): Promise<{ verified: boolean }> {
  return apiFetch("/songs/admin/verify", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export function createSong(data: {
  name: string;
  tags?: string;
  fileUrl: string;
  adminPassword: string;
}): Promise<Song> {
  return apiFetch("/songs/admin", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateSong(
  id: number,
  data: { name?: string; tags?: string; adminPassword: string }
): Promise<Song> {
  return apiFetch(`/songs/admin/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteSong(id: number, adminPassword: string): Promise<void> {
  return apiFetch(`/songs/admin/${id}`, {
    method: "DELETE",
    headers: { "x-admin-password": adminPassword },
  });
}

export function submitContact(data: {
  name: string;
  email: string;
  type: string;
  message: string;
}): Promise<{ message: string }> {
  return apiFetch("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function requestUploadUrl(data: {
  fileName: string;
  contentType: string;
  adminPassword: string;
}): Promise<{ uploadURL: string; objectPath: string }> {
  return apiFetch("/storage/uploads/request-url", {
    method: "POST",
    body: JSON.stringify({ name: data.fileName, size: 0, contentType: data.contentType }),
    headers: { "x-admin-password": data.adminPassword },
  });
}

export function getSongStreamUrl(objectPath: string): string {
  const cleanPath = objectPath.startsWith("/objects/")
    ? objectPath.slice("/objects/".length)
    : objectPath.startsWith("/")
    ? objectPath.slice(1)
    : objectPath;
  return `${API_BASE}/storage/objects/${cleanPath}`;
}
