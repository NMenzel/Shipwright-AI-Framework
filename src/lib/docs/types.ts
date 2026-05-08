export const DOCUMENT_TYPES = [
  "research",
  "standard",
  "control",
  "playbook",
  "prompt",
  "validation",
] as const;

export const RISK_LEVELS = ["low", "medium", "high", "critical"] as const;

export const DOCUMENT_STATUSES = [
  "draft",
  "source-informed",
  "internally-reviewed",
  "expert-reviewed",
  "deprecated",
] as const;

export type KnowledgeDocumentType = (typeof DOCUMENT_TYPES)[number];
export type KnowledgeRiskLevel = (typeof RISK_LEVELS)[number];
export type KnowledgeDocumentStatus = (typeof DOCUMENT_STATUSES)[number];

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface KnowledgeDocumentMeta {
  id: string;
  title: string;
  description?: string;
  type?: KnowledgeDocumentType;
  category?: string;
  status?: KnowledgeDocumentStatus | string;
  validationStatus?: string;
  riskLevel?: KnowledgeRiskLevel;
  owner?: string;
  reviewCycle?: string;
  tags: string[];
  related: string[];
  updated?: string;
  isStarred: boolean;
}

export interface KnowledgeDocument extends KnowledgeDocumentMeta {
  slug: string;
  slugSegments: string[];
  path: string;
  relativePath: string;
  content: string;
  toc: TableOfContentsItem[];
}

export interface KnowledgeTreeNode {
  title: string;
  segment: string;
  path: string;
  children: KnowledgeTreeNode[];
  documents: KnowledgeDocument[];
}

export interface KnowledgeCorpus {
  documents: KnowledgeDocument[];
  tree: KnowledgeTreeNode[];
}
