/** An unconfigured shared password must never grant administrative access. */
export function configuredAdminPasswordMatches(
  configured: unknown,
  provided: unknown,
): boolean {
  return typeof configured === "string" && configured.length > 0 && provided === configured;
}
