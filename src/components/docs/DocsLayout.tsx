import Link from "next/link";

import { DocsBreadcrumbs } from "@/components/docs/DocsBreadcrumbs";
import { DocsMetadataPanel } from "@/components/docs/DocsMetadataPanel";
import { DocsReader } from "@/components/docs/DocsReader";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsTableOfContents } from "@/components/docs/DocsTableOfContents";
import {
  toDocumentSummary,
  toTreeSummary,
} from "@/components/docs/docs-shared";
import { Button } from "@/components/ui/button";
import type { KnowledgeCorpus, KnowledgeDocument } from "@/lib/docs/types";

export function DocsLayout({
  corpus,
  document,
}: {
  corpus: KnowledgeCorpus;
  document?: KnowledgeDocument;
}) {
  const documents = corpus.documents.map(toDocumentSummary);
  const tree = toTreeSummary(corpus.tree);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background/60">
      <div className="grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)_17rem]">
        <DocsSidebar tree={tree} activeSlug={document?.slug} />

        <main className="min-w-0 rounded-lg border border-border bg-card/80 px-5 py-6 shadow-sm sm:px-8 lg:px-10">
          <DocsBreadcrumbs document={document} />
          {document ? (
            <DocsReader document={document} />
          ) : (
            <section className="mx-auto max-w-3xl py-12">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Knowledge Viewer
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Read-only research and delivery documentation.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Browse Markdown files that already exist under the repository
                docs directory. The viewer discovers content, metadata, and
                local media references without providing any editing or upload
                controls.
              </p>
              {documents[0] ? (
                <Button asChild className="mt-8">
                  <Link href={documents[0].path}>Open first document</Link>
                </Button>
              ) : (
                <p className="mt-8 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
                  No Markdown documents were found under docs.
                </p>
              )}
            </section>
          )}
        </main>

        <div className="hidden xl:block">
          {document ? (
            <div className="sticky top-20 space-y-6">
              <DocsTableOfContents items={document.toc} />
              <DocsMetadataPanel document={document} documents={documents} />
            </div>
          ) : (
            <DocsMetadataPanel documents={documents} />
          )}
        </div>
      </div>
    </div>
  );
}
