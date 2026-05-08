import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { KnowledgeDocument } from "@/lib/docs/types";

export function DocsBreadcrumbs({ document }: { document?: KnowledgeDocument }) {
  return (
    <nav aria-label="Document breadcrumbs" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
        <li>
          <Link
            href="/knowledge"
            className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Knowledge
          </Link>
        </li>
        {document?.slugSegments.map((segment, index) => {
          const isLast = index === document.slugSegments.length - 1;
          return (
            <li key={`${segment}-${index}`} className="flex items-center gap-1">
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className={isLast ? "text-foreground" : undefined}>
                {isLast ? document.title : segment.replace(/-/g, " ")}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
