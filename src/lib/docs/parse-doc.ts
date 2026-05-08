import path from "node:path";
import matter from "gray-matter";

import { getTableOfContents } from "@/lib/docs/get-table-of-contents";
import {
  createSlugFromRelativePath,
  hasImportantFilenameMarker,
  stripImportantFilenameMarker,
} from "@/lib/docs/resolve-doc-path";
import {
  DOCUMENT_STATUSES,
  DOCUMENT_TYPES,
  RISK_LEVELS,
  type KnowledgeDocument,
  type KnowledgeDocumentStatus,
  type KnowledgeDocumentType,
  type KnowledgeRiskLevel,
} from "@/lib/docs/types";

function arrayFromUnknown(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function stringFromUnknown(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
}

function enumValue<T extends readonly string[]>(values: T, value: unknown) {
  const candidate = stringFromUnknown(value);
  return values.includes(candidate ?? "") ? (candidate as T[number]) : undefined;
}

function titleFromContent(content: string, fallback: string) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();

  if (heading) {
    return heading;
  }

  return fallback
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function removeLeadingH1(content: string) {
  return content.replace(/^#\s+.+(?:\r?\n)+/, "").trim();
}

export function parseKnowledgeDocument(
  raw: string,
  relativePath: string,
): KnowledgeDocument {
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const slug = createSlugFromRelativePath(relativePath);
  const parsedPath = path.parse(relativePath);
  const fallbackTitle = titleFromContent(
    parsed.content,
    stripImportantFilenameMarker(parsedPath.name),
  );
  const title = stringFromUnknown(data.title) ?? fallbackTitle;
  const id = stringFromUnknown(data.id) ?? `doc.${slug.replaceAll("/", ".")}`;
  const status =
    enumValue(DOCUMENT_STATUSES, data.status) ??
    stringFromUnknown(data.status);
  const content = removeLeadingH1(parsed.content);

  return {
    id,
    title,
    description: stringFromUnknown(data.description),
    type: enumValue(DOCUMENT_TYPES, data.type) as
      | KnowledgeDocumentType
      | undefined,
    category: stringFromUnknown(data.category),
    status: status as KnowledgeDocumentStatus | string | undefined,
    validationStatus:
      stringFromUnknown(data.validation_status) ??
      stringFromUnknown(data.validationStatus),
    riskLevel: enumValue(RISK_LEVELS, data.risk_level ?? data.riskLevel) as
      | KnowledgeRiskLevel
      | undefined,
    owner: stringFromUnknown(data.owner),
    reviewCycle:
      stringFromUnknown(data.review_cycle) ?? stringFromUnknown(data.reviewCycle),
    tags: arrayFromUnknown(data.tags),
    related: arrayFromUnknown(data.related),
    updated: stringFromUnknown(data.updated),
    isStarred: hasImportantFilenameMarker(relativePath),
    slug,
    slugSegments: slug.split("/"),
    path: `/knowledge/${slug}`,
    relativePath: relativePath.replaceAll(path.sep, "/"),
    content,
    toc: getTableOfContents(content),
  };
}
