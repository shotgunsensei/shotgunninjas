import { useEffect } from "react";

export interface SEOOptions {
  title: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}

const SITE_NAME = "Shotgun Ninjas Productions";
const DEFAULT_OG = "https://shotgunninjas.com/opengraph.jpg";
const SITE_ORIGIN = "https://shotgunninjas.com";
const DEFAULT_DESCRIPTION =
  "An indie studio building purpose-built operator tools, automations, and games.";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({ title, description, ogImage, canonical }: SEOOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
    document.title = fullTitle;

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }

    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);

    const img = ogImage ?? DEFAULT_OG;
    setMeta('meta[property="og:image"]', "property", "og:image", img);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", img);

    const canonicalUrl = canonical ?? `${SITE_ORIGIN}${window.location.pathname}`;
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setLink("canonical", canonicalUrl);

    return () => {
      // Reset to safe site defaults when this page unmounts so the next
      // route doesn't inherit stale per-page meta.
      document.title = SITE_NAME;
      setMeta('meta[name="description"]', "name", "description", DEFAULT_DESCRIPTION);
      setMeta('meta[property="og:description"]', "property", "og:description", DEFAULT_DESCRIPTION);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", DEFAULT_DESCRIPTION);
      setMeta('meta[property="og:title"]', "property", "og:title", SITE_NAME);
      setMeta('meta[name="twitter:title"]', "name", "twitter:title", SITE_NAME);
      setMeta('meta[property="og:image"]', "property", "og:image", DEFAULT_OG);
      setMeta('meta[name="twitter:image"]', "name", "twitter:image", DEFAULT_OG);
    };
  }, [title, description, ogImage, canonical]);
}
