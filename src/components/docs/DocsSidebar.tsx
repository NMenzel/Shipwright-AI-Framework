"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, Folder, Search } from "lucide-react";

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
}: {
  tree: KnowledgeTreeSummaryNode[];
  activeSlug?: string;
}) {
  const [query, setQuery] = useState("");
  const allDocuments = useMemo(() => flattenTree(tree), [tree]);
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
    <div className="space-y-4">
      <label className="relative block">
        <span className="sr-only">Search documents</span>
        <Search
          className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search docs"
          className="pl-9"
          type="search"
        />
      </label>

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
        <ul className="space-y-1">
          {tree.map((node) => (
            <TreeNode key={node.path} node={node} activeSlug={activeSlug} />
          ))}
        </ul>
      )}
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
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg border border-border bg-card/70 p-4">
          <div className="mb-4">
            <p className="text-sm font-semibold">Research Library</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Read-only documentation
            </p>
          </div>
          <SidebarContent tree={tree} activeSlug={activeSlug} />
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
