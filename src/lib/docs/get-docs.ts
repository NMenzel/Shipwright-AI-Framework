import fs from "node:fs";
import path from "node:path";

import { buildDocTree } from "@/lib/docs/build-doc-tree";
import { parseKnowledgeDocument } from "@/lib/docs/parse-doc";
import {
  DOCS_ROOT,
  isAllowedMarkdownFile,
  isSafeSlugSegments,
  resolveDocsRelativePath,
} from "@/lib/docs/resolve-doc-path";
import type { KnowledgeCorpus } from "@/lib/docs/types";

function discoverMarkdownFiles(directory = DOCS_ROOT): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return discoverMarkdownFiles(absolutePath);
      }

      if (!entry.isFile() || !isAllowedMarkdownFile(entry.name)) {
        return [];
      }

      return [absolutePath];
    });
}

export function getKnowledgeDocuments() {
  return discoverMarkdownFiles()
    .map((absolutePath) => {
      const relativePath = path.relative(DOCS_ROOT, absolutePath);
      const safePath = resolveDocsRelativePath(relativePath);
      const raw = fs.readFileSync(safePath, "utf8");
      return parseKnowledgeDocument(raw, relativePath);
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getKnowledgeCorpus(): KnowledgeCorpus {
  const documents = getKnowledgeDocuments();

  return {
    documents,
    tree: buildDocTree(documents),
  };
}

export function getKnowledgeDocumentBySlug(slugSegments: string[]) {
  if (!isSafeSlugSegments(slugSegments)) {
    return undefined;
  }

  const slug = slugSegments.join("/");
  return getKnowledgeDocuments().find((document) => document.slug === slug);
}

export function getFirstKnowledgeDocument() {
  return getKnowledgeDocuments()[0];
}

export function getKnowledgeStaticParams() {
  return getKnowledgeDocuments().map((document) => ({
    slug: document.slugSegments,
  }));
}
