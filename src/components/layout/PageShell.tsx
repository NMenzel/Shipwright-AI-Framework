import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  cta?: {
    label: string;
    href: string;
  };
}

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  cta,
}: PageShellProps) {
  return (
    <main id="main-content">
      <Container className="py-14 sm:py-18">
        <div className="max-w-4xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          {cta ? (
            <Button asChild className="mt-2">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </Container>
    </main>
  );
}
