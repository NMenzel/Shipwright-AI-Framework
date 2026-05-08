import type { TableOfContentsItem } from "@/lib/docs/types";
import { normalizeSlugSegment } from "@/lib/docs/resolve-doc-path";

const headingPattern = /^(#{2,3})\s+(.+)$/gm;

function stripMarkdownInline(value: string) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export function getTableOfContents(content: string): TableOfContentsItem[] {
  const usedIds = new Map<string, number>();
  const items: TableOfContentsItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingPattern.exec(content)) !== null) {
    const level = match[1].length;
    const title = stripMarkdownInline(match[2]);
    const baseId = normalizeSlugSegment(title);

    if (!title || !baseId) {
      continue;
    }

    const count = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, count + 1);

    items.push({
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
      title,
      level: level as 2 | 3,
    });
  }

  return items;
}
