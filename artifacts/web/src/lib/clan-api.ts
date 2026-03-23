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

async function clanFetch<T>(path: string, init?: RequestInit): Promise<T> {
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

export interface ForumTopic {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string | null;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
}

export interface ForumReply {
  id: number;
  topicId: number;
  content: string;
  authorId: number;
  authorName: string | null;
  createdAt: string;
}

export interface ClanDocument {
  id: number;
  title: string;
  description: string | null;
  category: string;
  fileUrl: string;
  uploaderName: string | null;
  createdAt: string;
}

export function listTopics(): Promise<ForumTopic[]> {
  return clanFetch("/clan/forum/topics");
}

export function createTopic(data: { title: string; content: string }): Promise<ForumTopic> {
  return clanFetch("/clan/forum/topics", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function deleteTopic(id: number): Promise<void> {
  return clanFetch(`/clan/forum/topics/${id}`, { method: "DELETE" });
}

export function listReplies(topicId: number): Promise<ForumReply[]> {
  return clanFetch(`/clan/forum/topics/${topicId}/replies`);
}

export function createReply(topicId: number, content: string): Promise<ForumReply> {
  return clanFetch(`/clan/forum/topics/${topicId}/replies`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export function deleteReply(topicId: number, replyId: number): Promise<void> {
  return clanFetch(`/clan/forum/topics/${topicId}/replies/${replyId}`, { method: "DELETE" });
}

export function listDocuments(): Promise<ClanDocument[]> {
  return clanFetch("/clan/documents");
}

export function deleteDocument(id: number): Promise<void> {
  return clanFetch(`/clan/documents/${id}`, { method: "DELETE" });
}
