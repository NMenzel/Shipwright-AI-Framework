import path from "node:path";

export const DOCS_ROOT = path.join(process.cwd(), "docs");
export const ALLOWED_MARKDOWN_EXTENSIONS = new Set([".md"]);

export function isAllowedMarkdownFile(filePath: string) {
  return ALLOWED_MARKDOWN_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

export function assertInsideDocsRoot(absolutePath: string) {
  const resolvedRoot = path.resolve(DOCS_ROOT);
  const resolvedPath = path.resolve(absolutePath);
  const isInside =
    resolvedPath === resolvedRoot ||
    resolvedPath.startsWith(`${resolvedRoot}${path.sep}`);

  if (!isInside) {
    throw new Error("Document path escapes docs root.");
  }

  return resolvedPath;
}

export function resolveDocsRelativePath(relativePath: string) {
  const absolutePath = assertInsideDocsRoot(path.resolve(DOCS_ROOT, relativePath));

  if (!isAllowedMarkdownFile(absolutePath)) {
    throw new Error("Only Markdown documents are supported.");
  }

  return absolutePath;
}

export function normalizeSlugSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isSafeSlugSegments(segments: string[]) {
  return (
    segments.length > 0 &&
    segments.every((segment) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segment))
  );
}

export function createSlugFromRelativePath(relativePath: string) {
  const parsed = path.parse(relativePath);
  const directorySegments = parsed.dir
    ? parsed.dir.split(path.sep).map(normalizeSlugSegment).filter(Boolean)
    : [];
  const fileSegment = normalizeSlugSegment(parsed.name);

  if (parsed.name.toLowerCase() === "readme" && directorySegments.length > 0) {
    return directorySegments.join("/");
  }

  return [...directorySegments, fileSegment].filter(Boolean).join("/");
}
