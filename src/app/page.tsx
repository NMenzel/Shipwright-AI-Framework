import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionIntro } from "@/features/example/components/SectionIntro";
import {
  accessibilityNotes,
  aiAssistedDevelopmentNotes,
  componentFoundationNotes,
  engineeringPrinciples,
  qualityGates,
  starterBadges,
} from "@/features/example/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to content
      </a>

      <header className="border-b border-border bg-background/95 backdrop-blur">
        <Container className="flex flex-col gap-5 py-6">
          <div className="flex flex-wrap items-center gap-3">
            {starterBadges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Next.js Production Starter
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Production-ready Next.js foundation for maintainable frontend
                projects.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                A reusable starter focused on TypeScript, accessibility,
                shadcn/ui components, testing, CI/CD quality gates, and
                AI-assisted development with human review.
              </p>
            </div>

            <Card className="w-full max-w-md border-border/80 bg-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  Engineering baseline
                </CardTitle>
                <CardDescription>
                  Built for teams that expect clear boundaries, reviewable code,
                  and dependable delivery.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  The starter keeps architecture visible, components editable,
                  and quality gates automated.
                </p>
                <p>
                  It is designed for serious project work rather than generic
                  landing-page scaffolding.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="#quality-gates">
                Review quality gates
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#component-foundation">
                Inspect component foundation
              </Link>
            </Button>
          </div>
        </Container>
      </header>

      <main id="main-content">
        <Container className="py-16 sm:py-20">
          <section
            aria-labelledby="engineering-principles"
            className="space-y-8"
          >
            <SectionIntro
              eyebrow="Architecture"
              title="Engineering principles"
              description="A production starter should make good defaults obvious: typed boundaries, accessible markup, readable components, and small units of change."
              id="engineering-principles"
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {engineeringPrinciples.map((principle) => (
                <Card key={principle.title} className="h-full">
                  <CardHeader>
                    <CardTitle>{principle.title}</CardTitle>
                    <CardDescription>{principle.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-14" />

          <section aria-labelledby="quality-gates" className="space-y-8">
            <SectionIntro
              eyebrow="Delivery"
              title="Quality gates"
              description="The baseline covers the checks that should fail fast in normal delivery workflows: linting, typing, tests, and a production build."
              id="quality-gates"
            />

            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Core verification pipeline</CardTitle>
                  <CardDescription>
                    Keep confidence high without turning the starter into a
                    heavyweight template.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 text-sm text-muted-foreground">
                    {qualityGates.map((gate) => (
                      <li key={gate.title} className="flex gap-3">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-medium text-foreground">
                            {gate.title}
                          </p>
                          <p>{gate.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current CI scope</CardTitle>
                  <CardDescription>
                    Lean by default, expandable when the project needs a
                    stronger pipeline.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    GitHub Actions runs install, lint, typecheck, unit tests,
                    and build.
                  </p>
                  <p>
                    Playwright is configured locally and can be promoted into CI
                    once browser coverage becomes worth the extra runtime.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-14" />

          <section
            aria-labelledby="accessibility-foundation"
            className="space-y-8"
          >
            <SectionIntro
              eyebrow="Accessibility"
              title="Accessible by default"
              description="This starter favors semantic HTML, visible focus management, readable contrast, and interactive primitives that preserve keyboard behavior."
              id="accessibility-foundation"
            />

            <div className="grid gap-6 md:grid-cols-3">
              {accessibilityNotes.map((note) => (
                <Card key={note.title} className="h-full">
                  <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                    <CardDescription>{note.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-14" />

          <section aria-labelledby="component-foundation" className="space-y-8">
            <SectionIntro
              eyebrow="Components"
              title="shadcn/ui foundation with Radix UI primitives"
              description="Use source-based components for common primitives. Use Radix directly only where accessible interaction behavior is needed."
              id="component-foundation"
            />

            <div className="grid gap-6 md:grid-cols-2">
              {componentFoundationNotes.map((note) => (
                <Card key={note.title}>
                  <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                    <CardDescription>{note.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-14" />

          <section
            aria-labelledby="ai-assisted-development"
            className="space-y-8"
          >
            <SectionIntro
              eyebrow="Workflow"
              title="AI-assisted development with human review"
              description="This starter treats AI as an accelerator for implementation and review support, not as a substitute for engineering ownership."
              id="ai-assisted-development"
            />

            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Working principle</CardTitle>
                  <CardDescription>
                    AI can accelerate development, but it does not remove the
                    need for engineering discipline.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Prompts, generated code, and suggested refactors still need
                    review for correctness, maintainability, accessibility,
                    security, and architectural fit.
                  </p>
                  <p>
                    The goal is faster delivery with better feedback loops, not
                    reduced accountability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What that means in practice</CardTitle>
                  <CardDescription>
                    Keep inputs explicit and review outputs with the same rigor
                    as hand-written changes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 text-sm text-muted-foreground">
                    {aiAssistedDevelopmentNotes.map((note) => (
                      <li key={note.title}>
                        <p className="font-medium text-foreground">
                          {note.title}
                        </p>
                        <p>{note.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
