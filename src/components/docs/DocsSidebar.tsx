"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, Folder, Search, Star, X } from "lucide-react";

import type {
  KnowledgeDocumentSummary,
  KnowledgeTreeSummaryNode,
} from "@/components/docs/docs-shared";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function flattenTree(
  nodes: KnowledgeTreeSummaryNode[],
): KnowledgeDocumentSummary[] {
  return nodes.flatMap((node) => [
    ...node.documents,
    ...flattenTree(node.children),
  ]);
}

function DocumentLink({
  document,
  activeSlug,
}: {
  document: KnowledgeDocumentSummary;
  activeSlug?: string;
}) {
  const isActive = document.slug === activeSlug;

  return (
    <Link
      href={document.path}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group block rounded-md px-2 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "bg-accent text-accent-foreground",
      )}
    >
      <span className="flex min-w-0 items-center gap-2">
        <BookOpen
          className="size-3.5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <span className="truncate">{document.title}</span>
        {document.isStarred ? (
          <Star
            className="ml-auto size-3.5 shrink-0 fill-primary text-primary"
            aria-label="Important document"
          />
        ) : null}
      </span>
      <span className="mt-1 flex flex-wrap gap-1 pl-5">
        {document.type ? (
          <Badge variant="secondary" className="px-1.5 py-0 text-[0.65rem]">
            {document.type}
          </Badge>
        ) : null}
        {document.status ? (
          <span className="truncate text-xs text-muted-foreground">
            {document.status}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

function TreeNode({
  node,
  activeSlug,
}: {
  node: KnowledgeTreeSummaryNode;
  activeSlug?: string;
}) {
  return (
    <li>
      <div className="mb-1 mt-3 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <Folder className="size-3.5" aria-hidden="true" />
        <span>{node.title}</span>
      </div>
      <ul className="space-y-1">
        {node.documents.map((document) => (
          <li key={document.slug}>
            <DocumentLink document={document} activeSlug={activeSlug} />
          </li>
        ))}
        {node.children.map((child) => (
          <TreeNode key={child.path} node={child} activeSlug={activeSlug} />
        ))}
      </ul>
    </li>
  );
}

function SidebarContent({
  tree,
  activeSlug,
  showHeading = false,
}: {
  tree: KnowledgeTreeSummaryNode[];
  activeSlug?: string;
  showHeading?: boolean;
}) {
  const [query, setQuery] = useState("");
  const allDocuments = useMemo(() => flattenTree(tree), [tree]);
  const starredDocuments = allDocuments.filter((document) => document.isStarred);
  const normalizedQuery = query.trim().toLowerCase();
  const matches = normalizedQuery
    ? allDocuments.filter((document) =>
        [
          document.title,
          document.description,
          document.relativePath,
          document.type,
          document.status,
          ...document.tags,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : [];

  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      <div className="w-full min-w-0 shrink-0 border-b border-border bg-card pb-4">
        {showHeading ? (
          <div className="mb-4">
            <p className="text-sm font-semibold">Research Library</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Read-only documentation
            </p>
          </div>
        ) : null}
        <label className="relative block w-full min-w-0">
          <span className="sr-only">Search documents</span>
          <Search
            className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search docs"
            className="w-full min-w-0 pl-9 pr-9 [&::-webkit-search-cancel-button]:appearance-none"
            type="search"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear document search"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 inline-flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pt-3">
        {normalizedQuery ? (
          <div>
            <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
              {matches.length} match{matches.length === 1 ? "" : "es"}
            </p>
            <ul className="space-y-1">
              {matches.map((document) => (
                <li key={document.slug}>
                  <DocumentLink document={document} activeSlug={activeSlug} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            {starredDocuments.length > 0 ? (
              <section aria-labelledby="starred-docs-navigation">
                <div
                  id="starred-docs-navigation"
                  className="mb-1 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  <Star className="size-3.5" aria-hidden="true" />
                  <span>Starred Docs</span>
                </div>
                <ul className="space-y-1">
                  {starredDocuments.map((document) => (
                    <li key={document.slug}>
                      <DocumentLink
                        document={document}
                        activeSlug={activeSlug}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <ul className="space-y-1">
              {tree.map((node) => (
                <TreeNode key={node.path} node={node} activeSlug={activeSlug} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function DocsSidebar({
  tree,
  activeSlug,
}: {
  tree: KnowledgeTreeSummaryNode[];
  activeSlug?: string;
}) {
  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-20 flex max-h-[calc(100vh-6rem)] w-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card/70 p-4">
          <SidebarContent
            tree={tree}
            activeSlug={activeSlug}
            showHeading
          />
        </div>
      </aside>

      <details className="rounded-lg border border-border bg-card/70 p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Browse documents
        </summary>
        <div className="mt-4">
          <SidebarContent tree={tree} activeSlug={activeSlug} />
        </div>
      </details>
    </>
  );
}
