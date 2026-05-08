import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocsLayout } from "@/components/docs/DocsLayout";
import {
  getKnowledgeCorpus,
  getKnowledgeDocumentBySlug,
  getKnowledgeStaticParams,
} from "@/lib/docs/get-docs";

interface KnowledgeDocumentPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export function generateStaticParams() {
  return getKnowledgeStaticParams();
}

export async function generateMetadata({
  params,
}: KnowledgeDocumentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getKnowledgeDocumentBySlug(slug);

  if (!document) {
    return {
      title: "Document not found",
    };
  }

  return {
    title: document.title,
    description: document.description,
  };
}

export default async function KnowledgeDocumentPage({
  params,
}: KnowledgeDocumentPageProps) {
  const { slug } = await params;
  const document = getKnowledgeDocumentBySlug(slug);

  if (!document) {
    notFound();
  }

  return <DocsLayout corpus={getKnowledgeCorpus()} document={document} />;
}
