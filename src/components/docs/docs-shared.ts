import type {
  KnowledgeDocument,
  KnowledgeTreeNode,
} from "@/lib/docs/types";

export type KnowledgeDocumentSummary = Pick<
  KnowledgeDocument,
  | "id"
  | "title"
  | "description"
  | "type"
  | "status"
  | "validationStatus"
  | "riskLevel"
  | "owner"
  | "tags"
  | "related"
  | "updated"
  | "isStarred"
  | "slug"
  | "path"
  | "relativePath"
>;

export interface KnowledgeTreeSummaryNode {
  title: string;
  segment: string;
  path: string;
  children: KnowledgeTreeSummaryNode[];
  documents: KnowledgeDocumentSummary[];
}

export function toDocumentSummary(
  document: KnowledgeDocument,
): KnowledgeDocumentSummary {
  return {
    id: document.id,
    title: document.title,
    description: document.description,
    type: document.type,
    status: document.status,
    validationStatus: document.validationStatus,
    riskLevel: document.riskLevel,
    owner: document.owner,
    tags: document.tags,
    related: document.related,
    updated: document.updated,
    isStarred: document.isStarred,
    slug: document.slug,
    path: document.path,
    relativePath: document.relativePath,
  };
}

export function toTreeSummary(
  nodes: KnowledgeTreeNode[],
): KnowledgeTreeSummaryNode[] {
  return nodes.map((node) => ({
    ...node,
    documents: node.documents.map(toDocumentSummary),
    children: toTreeSummary(node.children),
  }));
}
