import Link from "next/link";
import { CalendarDays, FileText, ShieldAlert, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { KnowledgeDocument } from "@/lib/docs/types";
import type { KnowledgeDocumentSummary } from "@/components/docs/docs-shared";

function MetadataRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value?: string;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className="flex items-start gap-2 text-sm">
      <Icon className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function DocsMetadataPanel({
  document,
  documents,
}: {
  document?: KnowledgeDocument;
  documents: KnowledgeDocumentSummary[];
}) {
  if (!document) {
    return (
      <aside className="hidden xl:block">
        <div className="sticky top-20 rounded-lg border border-border bg-card/70 p-5">
          <p className="text-sm font-medium">Read-only documentation</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Select a document to review metadata, tags, and related research.
          </p>
        </div>
      </aside>
    );
  }

  const relatedDocuments = documents.filter((item) =>
    document.related.includes(item.id),
  );

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20 space-y-6 rounded-lg border border-border bg-card/70 p-5">
        <section aria-labelledby="document-metadata" className="space-y-4">
          <h2
            id="document-metadata"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
          >
            Metadata
          </h2>
          <div className="flex flex-wrap gap-2">
            {document.type ? (
              <Badge variant="secondary">{document.type}</Badge>
            ) : null}
            {document.status ? (
              <Badge variant="outline">{document.status}</Badge>
            ) : null}
            {document.riskLevel ? (
              <Badge variant="outline">{document.riskLevel} risk</Badge>
            ) : null}
          </div>
          <div className="space-y-4">
            <MetadataRow
              icon={FileText}
              label="Validation"
              value={document.validationStatus}
            />
            <MetadataRow
              icon={ShieldAlert}
              label="Category"
              value={document.category}
            />
            <MetadataRow icon={UserRound} label="Owner" value={document.owner} />
            <MetadataRow
              icon={CalendarDays}
              label="Updated"
              value={document.updated}
            />
          </div>
        </section>

        {document.tags.length > 0 ? (
          <section aria-labelledby="document-tags" className="space-y-3">
            <h2
              id="document-tags"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </section>
        ) : null}

        {relatedDocuments.length > 0 ? (
          <section aria-labelledby="related-documents" className="space-y-3">
            <h2
              id="related-documents"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Related
            </h2>
            <ul className="space-y-2 text-sm">
              {relatedDocuments.map((related) => (
                <li key={related.id}>
                  <Link
                    href={related.path}
                    className="block rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {related.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </aside>
  );
}
