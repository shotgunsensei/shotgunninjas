const BASE_URL = import.meta.env.BASE_URL || "/";

function endpoint(): string {
  const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  return `${base}api/track/outbound`;
}

export function trackOutbound(url: string, source: string): void {
  try {
    const payload = JSON.stringify({ url, source });
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(endpoint(), blob);
      return;
    }
    void fetch(endpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* swallow */
  }
}
