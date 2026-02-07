export function withBasePath(path?: string): string | undefined {
  if (!path) return path;

  // Don't touch absolute URLs
  if (/^https?:\/\//i.test(path)) return path;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!basePath) return path;

  // Avoid double-prefixing
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;

  if (path.startsWith("/")) return `${basePath}${path}`;
  return `${basePath}/${path}`;
}
