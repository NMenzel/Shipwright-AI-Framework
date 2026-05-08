import path from "node:path";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { Badge } from "@/components/ui/badge";
import { createSlugFromRelativePath, normalizeSlugSegment } from "@/lib/docs/resolve-doc-path";
import type { KnowledgeDocument } from "@/lib/docs/types";
import { cn } from "@/lib/utils";

const mediaExtensions = /\.(png|jpe?g|webp|gif|svg|mp4|webm|mp3|wav|ogg)$/i;

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "audio",
    "video",
    "source",
    "track",
    "figure",
    "figcaption",
  ],
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      "target",
      "rel",
      "aria-label",
    ],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "src",
      "alt",
      "title",
      "loading",
    ],
    audio: ["controls", "src", "title", "preload", "aria-label"],
    video: [
      "controls",
      "src",
      "title",
      "preload",
      "poster",
      "playsinline",
      "aria-label",
    ],
    source: ["src", "type"],
    track: ["src", "kind", "srcLang", "label", "default"],
    figure: ["className"],
    figcaption: ["className"],
  },
};

function getNodeText(children: unknown): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getNodeText).join("");
  }

  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    children.props &&
    typeof children.props === "object" &&
    "children" in children.props
  ) {
    return getNodeText(children.props.children);
  }

  return "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function customMediaToHtml(content: string) {
  return content.replace(
    /^::(video|audio)\{([^}]*)\}\s*$/gm,
    (_match, type: "video" | "audio", rawAttributes: string) => {
      const src = rawAttributes.match(/src="([^"]+)"/)?.[1];
      const title = rawAttributes.match(/title="([^"]+)"/)?.[1];

      if (!src || !src.startsWith("/docs-media/") || !mediaExtensions.test(src)) {
        return "";
      }

      const escapedSrc = escapeHtml(src);
      const escapedTitle = title ? escapeHtml(title) : undefined;
      const caption = escapedTitle
        ? `<figcaption>${escapedTitle}</figcaption>`
        : "";

      return `<figure><${type} controls preload="metadata" src="${escapedSrc}" title="${escapedTitle ?? ""}"></${type}>${caption}</figure>`;
    },
  );
}

function resolveInternalMarkdownHref(
  href: string | undefined,
  document: KnowledgeDocument,
) {
  if (!href || href.startsWith("#")) {
    return href;
  }

  if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:")) {
    return href;
  }

  if (!href.endsWith(".md")) {
    return href;
  }

  const currentDirectory = path.posix.dirname(document.relativePath);
  const targetPath = path.posix.normalize(path.posix.join(currentDirectory, href));

  if (targetPath.startsWith("../")) {
    return href;
  }

  return `/knowledge/${createSlugFromRelativePath(targetPath)}`;
}

function createHeading(level: 2 | 3) {
  const usedIds = new Map<string, number>();
  const Tag = `h${level}` as const;

  return function Heading({
    children,
    className,
    ...props
  }: React.ComponentProps<typeof Tag>) {
    const text = getNodeText(children);
    const baseId = normalizeSlugSegment(text);
    const count = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

    return (
      <Tag
        id={id}
        className={cn(
          "scroll-mt-20 font-semibold tracking-tight text-foreground",
          level === 2 && "mt-12 border-t border-border pt-8 text-2xl",
          level === 3 && "mt-8 text-xl",
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  };
}

export function DocsReader({ document }: { document: KnowledgeDocument }) {
  const components: Components = {
    h1: ({ children, ...props }) => (
      <h1
        className="mt-8 text-4xl font-semibold tracking-tight text-balance text-foreground"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: createHeading(2),
    h3: createHeading(3),
    p: ({ children, ...props }) => (
      <p className="my-5 leading-8 text-foreground/90" {...props}>
        {children}
      </p>
    ),
    a: ({ href, children, ...props }) => {
      const resolvedHref = resolveInternalMarkdownHref(href, document);
      const isExternal = Boolean(resolvedHref?.startsWith("http"));

      if (!resolvedHref) {
        return <span>{children}</span>;
      }

      if (isExternal) {
        return (
          <a
            href={resolvedHref}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...props}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={resolvedHref}
          className="font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {children}
        </Link>
      );
    },
    ul: ({ children, ...props }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 leading-7" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 leading-7" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="pl-1 marker:text-muted-foreground" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 rounded-lg border border-border bg-accent/50 px-5 py-4 text-foreground/90"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ className, children, ...props }) => {
      const isBlock = Boolean(className);

      if (isBlock) {
        return (
          <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-foreground p-4 text-sm text-background">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        );
      }

      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    },
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border-b border-border bg-muted px-4 py-3 font-semibold"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-b border-border px-4 py-3 align-top" {...props}>
        {children}
      </td>
    ),
    img: ({ src, alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="my-6 w-full rounded-lg border border-border bg-muted object-contain"
        {...props}
      />
    ),
    video: ({ children, ...props }) => (
      <video
        controls
        preload="metadata"
        className="my-6 w-full rounded-lg border border-border bg-foreground"
        {...props}
      >
        {children}
      </video>
    ),
    audio: ({ children, ...props }) => (
      <audio controls preload="metadata" className="my-6 w-full" {...props}>
        {children}
      </audio>
    ),
    hr: (props) => <hr className="my-10 border-border" {...props} />,
  };

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {document.type ? <Badge variant="secondary">{document.type}</Badge> : null}
          <Badge variant="outline">Read-only documentation</Badge>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {document.title}
        </h1>
        {document.description ? (
          <p className="text-lg leading-8 text-muted-foreground">
            {document.description}
          </p>
        ) : null}
      </div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
        components={components}
      >
        {customMediaToHtml(document.content)}
      </ReactMarkdown>
    </article>
  );
}
