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
  const { content: _content, toc: _toc, slugSegments: _slugSegments, ...summary } =
    document;
  return summary;
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
