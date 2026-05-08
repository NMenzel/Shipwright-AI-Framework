import { ListTree } from "lucide-react";

import type { TableOfContentsItem } from "@/lib/docs/types";
import { cn } from "@/lib/utils";

export function DocsTableOfContents({
  items,
}: {
  items: TableOfContentsItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="document-toc" className="space-y-3">
      <h2
        id="document-toc"
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
      >
        <ListTree className="size-3.5" aria-hidden="true" />
        Contents
      </h2>
      <ol className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id} className={cn(item.level === 3 && "pl-4")}>
            <a
              href={`#${item.id}`}
              className="block rounded-sm py-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
