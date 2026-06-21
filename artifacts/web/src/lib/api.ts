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

export function subscribeNewsletter(data: {
  email: string;
  source?: string;
}): Promise<{ message: string }> {
  return apiFetch("/newsletter/subscribe", {
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

export interface BroadcastResult {
  message: string;
  recipientCount: number;
  successCount: number;
  failureCount: number;
}

export function broadcastNewsletter(data: {
  subject: string;
  html: string;
  adminPassword: string;
  testEmail?: string;
}): Promise<BroadcastResult> {
  return apiFetch("/admin/newsletter/broadcast", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export interface NewsletterStats {
  total: number;
  active: number;
  unsubscribed: number;
}

export function getNewsletterStats(adminPassword: string): Promise<NewsletterStats> {
  return apiFetch("/admin/newsletter/stats", {
    method: "POST",
    body: JSON.stringify({ adminPassword }),
  });
}

export function getStorageObjectUrl(objectPath: string): string {
  const cleanPath = objectPath.startsWith("/objects/")
    ? objectPath.slice("/objects/".length)
    : objectPath.startsWith("/")
    ? objectPath.slice(1)
    : objectPath;
  return `${API_BASE}/storage/objects/${cleanPath}`;
}

export function getSongStreamUrl(objectPath: string): string {
  return getStorageObjectUrl(objectPath);
}

export interface RepositoryFile {
  id: number;
  name: string;
  size: number;
  contentType: string;
  fileUrl: string;
  createdAt: string;
}

export function listRepositoryFiles(adminPassword: string): Promise<RepositoryFile[]> {
  return apiFetch("/repository/files", {
    headers: { "x-admin-password": adminPassword },
  });
}

export function requestRepositoryUploadUrl(data: {
  name: string;
  size: number;
  contentType: string;
  adminPassword: string;
}): Promise<{ uploadURL: string; objectPath: string }> {
  return apiFetch("/repository/uploads/request-url", {
    method: "POST",
    body: JSON.stringify({ name: data.name, size: data.size, contentType: data.contentType }),
    headers: { "x-admin-password": data.adminPassword },
  });
}

export function saveRepositoryFile(data: {
  name: string;
  size: number;
  contentType: string;
  fileUrl: string;
  adminPassword: string;
}): Promise<RepositoryFile> {
  return apiFetch("/repository/files", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getRepositoryDownloadUrl(id: number, adminPassword: string): string {
  return `${API_BASE}/repository/files/${id}/download?adminPassword=${encodeURIComponent(
    adminPassword
  )}`;
}

export function deleteRepositoryFile(
  id: number,
  adminPassword: string
): Promise<{ message: string }> {
  return apiFetch(`/repository/files/${id}`, {
    method: "DELETE",
    headers: { "x-admin-password": adminPassword },
  });
}

/**
 * Upload a file directly to object storage via a presigned PUT URL.
 * Uses XMLHttpRequest so upload progress can be reported (fetch cannot).
 */
export function uploadFileToStorage(
  uploadURL: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadURL);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.send(file);
  });
}
