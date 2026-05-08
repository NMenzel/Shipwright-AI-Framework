import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function listFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return listFiles(absolutePath);
    }

    return [absolutePath];
  });
}

describe("knowledge routes", () => {
  it("does not define document mutation route handlers", () => {
    const routeFiles = listFiles(path.join(process.cwd(), "src", "app")).filter(
      (file) => file.endsWith(`route.ts`) || file.endsWith(`route.tsx`),
    );

    const forbiddenKnowledgeRoutes = routeFiles.filter((file) =>
      /knowledge|docs/i.test(file),
    );

    expect(forbiddenKnowledgeRoutes).toEqual([]);
  });
});
