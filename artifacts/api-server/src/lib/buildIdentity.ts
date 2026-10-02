declare const __BUILD_SHA__: string | null;

// esbuild replaces this at build time; source-mode development is unstamped.
export const buildIdentity = {
  sha: typeof __BUILD_SHA__ === "undefined" ? null : __BUILD_SHA__,
};
