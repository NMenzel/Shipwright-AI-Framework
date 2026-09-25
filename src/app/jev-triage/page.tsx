import type { Metadata } from "next";
import { connection } from "next/server";

import { TriageForm } from "@/components/jev/TriageForm";
import { PageShell } from "@/components/layout";
import { isJevConfigured } from "@/lib/jev/client";

export const metadata: Metadata = {
  title: "Jev PR Triage",
  description:
    "Advisory pull request triage with TypeSafe AI's Jev decision model: risk score, review path, and yes/no signals with probabilities.",
};

export default async function JevTriagePage() {
  // Read the API key at request time, not at build time.
  await connection();

  return (
    <PageShell
      eyebrow="Decision support"
      title="Advisory PR triage with Jev"
      description="Jev, TypeSafe AI's structured decision model, reads a pull request summary and returns bounded, probability-scored decisions. The result routes human review; it never approves a merge."
    >
      <TriageForm enabled={isJevConfigured()} />
    </PageShell>
  );
}
