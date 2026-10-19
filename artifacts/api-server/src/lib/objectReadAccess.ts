import { configuredAdminPasswordMatches } from "./adminPassword";

export interface ObjectReadLookups {
  repositoryReferences(aliases: string[]): Promise<boolean>;
  songReferences(aliases: string[]): Promise<boolean>;
  clanReferences(aliases: string[]): Promise<boolean>;
  validClanSession(authorization: unknown): Promise<boolean>;
}

/** The three object-reference forms supported by the existing web client. */
export function privateObjectAliases(wildcardPath: unknown): string[] | null {
  if (typeof wildcardPath !== "string" || !wildcardPath.startsWith("uploads/")) return null;
  const segments = wildcardPath.split("/");
  if (segments.some((part) => !part || part === "." || part === ".." || /[\\\u0000-\u001f\u007f]/.test(part))) return null;
  return [`/objects/${wildcardPath}`, wildcardPath, `/${wildcardPath}`];
}

/** Resource records, rather than an object's optional cache ACL, grant reads. */
export async function objectReadAccess({
  wildcardPath,
  configuredPassword,
  providedPassword,
  authorization,
  lookups,
}: {
  wildcardPath: unknown;
  configuredPassword: unknown;
  providedPassword: unknown;
  authorization: unknown;
  lookups: ObjectReadLookups;
}): Promise<"public" | "private" | null> {
  const aliases = privateObjectAliases(wildcardPath);
  if (!aliases) return null;
  if (configuredAdminPasswordMatches(configuredPassword, providedPassword)) return "private";
  // A clan administrator can attach arbitrary URLs to documents. A private
  // repository record must win over any song/document alias of the same key.
  if (await lookups.repositoryReferences(aliases)) return null;
  if (await lookups.songReferences(aliases)) return "public";
  if (await lookups.clanReferences(aliases) && await lookups.validClanSession(authorization)) return "private";
  return null;
}
