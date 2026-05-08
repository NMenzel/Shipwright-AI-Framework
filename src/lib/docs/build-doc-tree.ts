import type {
  KnowledgeDocument,
  KnowledgeTreeNode,
} from "@/lib/docs/types";

function displayTitle(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getOrCreateNode(
  nodes: KnowledgeTreeNode[],
  segment: string,
  parentPath: string,
) {
  let node = nodes.find((item) => item.segment === segment);

  if (!node) {
    const path = [parentPath, segment].filter(Boolean).join("/");
    node = {
      title: displayTitle(segment),
      segment,
      path,
      children: [],
      documents: [],
    };
    nodes.push(node);
  }

  return node;
}

function sortNodes(nodes: KnowledgeTreeNode[]) {
  nodes.sort((a, b) => a.title.localeCompare(b.title));

  for (const node of nodes) {
    node.documents.sort((a, b) => a.title.localeCompare(b.title));
    sortNodes(node.children);
  }
}

export function buildDocTree(documents: KnowledgeDocument[]) {
  const roots: KnowledgeTreeNode[] = [];

  for (const document of documents) {
    const folderSegments = document.slugSegments.slice(0, -1);
    let currentNodes = roots;
    let parentPath = "";

    for (const segment of folderSegments) {
      const node = getOrCreateNode(currentNodes, segment, parentPath);
      currentNodes = node.children;
      parentPath = node.path;
    }

    if (folderSegments.length === 0) {
      const node = getOrCreateNode(roots, "root", "");
      node.title = "Root";
      node.documents.push(document);
    } else {
      const parent = folderSegments.reduce<KnowledgeTreeNode | undefined>(
        (found, segment) => {
          const list = found ? found.children : roots;
          return list.find((node) => node.segment === segment);
        },
        undefined,
      );
      parent?.documents.push(document);
    }
  }

  sortNodes(roots);
  return roots;
}
