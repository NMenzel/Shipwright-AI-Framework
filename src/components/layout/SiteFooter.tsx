import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { secondaryNavigation } from "@/content/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <Container className="grid gap-8 py-10 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          <p className="font-semibold">AI-Assisted Delivery Lab</p>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Source-informed and prepared for expert review. This project does
            not claim legal, compliance, security, or accessibility
            certification.
          </p>
        </div>
        <nav aria-label="Secondary navigation">
          <ul className="grid gap-3 sm:grid-cols-2">
            {secondaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm text-sm font-medium outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
