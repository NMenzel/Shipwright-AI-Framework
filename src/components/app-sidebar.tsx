"use client";

import Link from "next/link";
import type * as React from "react";
import {
  BookOpenCheck,
  Boxes,
  FileCheck2,
  Gauge,
  GitPullRequestDraft,
  Home,
  KeyRound,
  Library,
  Route,
  ScanEye,
  ShieldCheck,
  Sparkles,
  TextSelect,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navigation = [
  {
    title: "Overview",
    url: "/",
    icon: Home,
  },
  {
    title: "Governance",
    url: "/operating-model",
    icon: Route,
    isActive: true,
    items: [
      {
        title: "Operating Model",
        url: "/operating-model",
      },
      {
        title: "Responsible AI Policy",
        url: "/responsible-ai-policy",
      },
      {
        title: "AI PR Review",
        url: "/ai-pr-review",
      },
      {
        title: "Context Engineering",
        url: "/context-engineering",
      },
    ],
  },
  {
    title: "Prompt Library",
    url: "/prompt-library",
    icon: Library,
    items: [
      {
        title: "All Prompts",
        url: "/prompt-library",
      },
      {
        title: "Coding",
        url: "/prompt-library/coding",
      },
      {
        title: "Refactoring",
        url: "/prompt-library/refactoring",
      },
      {
        title: "PR Review",
        url: "/prompt-library/pr-review",
      },
      {
        title: "Security Review",
        url: "/prompt-library/security-review",
      },
      {
        title: "Accessibility Review",
        url: "/prompt-library/accessibility-review",
      },
      {
        title: "Architecture Review",
        url: "/prompt-library/architecture-review",
      },
      {
        title: "Token Optimized",
        url: "/prompt-library/token-optimized",
      },
    ],
  },
  {
    title: "Controls",
    url: "/security",
    icon: ShieldCheck,
    items: [
      {
        title: "Security Threat Model",
        url: "/security",
      },
      {
        title: "Token Optimization",
        url: "/token-optimization",
      },
      {
        title: "Evaluation Framework",
        url: "/evaluation",
      },
      {
        title: "Accessibility Workflow",
        url: "/accessibility-workflow",
      },
    ],
  },
  {
    title: "Examples",
    url: "/examples",
    icon: Boxes,
    items: [
      {
        title: "Example Workflows",
        url: "/examples",
      },
      {
        title: "Accessible Component Delivery",
        url: "/examples/accessible-component-delivery",
      },
    ],
  },
];

const quickLinks = [
  {
    title: "Review Checklist",
    url: "/ai-pr-review",
    icon: GitPullRequestDraft,
  },
  {
    title: "Security Rules",
    url: "/security",
    icon: KeyRound,
  },
  {
    title: "Accessibility",
    url: "/accessibility-workflow",
    icon: ScanEye,
  },
  {
    title: "Metrics",
    url: "/evaluation",
    icon: Gauge,
  },
];

interface StarredDocNavigationItem {
  title: string;
  path: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  starredDocs?: StarredDocNavigationItem[];
}

function truncateNavTitle(title: string) {
  return title.length > 30 ? `${title.slice(0, 27)}...` : title;
}

export function AppSidebar({ starredDocs = [], ...props }: AppSidebarProps) {
  const docsNavigation = [
    {
      title: "Knowledge Viewer",
      url: "/knowledge",
      icon: BookOpenCheck,
      items: [
        {
          title: "All Docs",
          url: "/knowledge",
        },
        ...starredDocs.map((document) => ({
          title: truncateNavTitle(document.title),
          fullTitle: document.title,
          url: document.path,
        })),
      ],
    },
  ];

  return (
    <Sidebar
      aria-label="Primary navigation"
      collapsible="icon"
      role="navigation"
      variant="inset"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              tooltip="AI-Assisted Delivery Lab"
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Sparkles className="size-4" aria-hidden="true" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    AI Delivery Lab
                  </span>
                  <span className="truncate text-xs">
                    Responsible workflows
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navigation} label="Delivery system" />
        <NavMain items={quickLinks} label="Quality gates" />
        <NavMain items={docsNavigation} label="Docs" />
      </SidebarContent>

      <SidebarFooter className="gap-3">
        <SidebarSeparator />
        <div className="group-data-[collapsible=icon]:hidden">
          <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/45 p-3 text-xs leading-5 text-sidebar-foreground/75">
            <p className="mb-1 flex items-center gap-2 font-medium text-sidebar-foreground">
              <FileCheck2 className="size-3.5" aria-hidden="true" />
              Expert-review-ready
            </p>
            <p>
              Source-informed, human-reviewed workflow guidance. No compliance
              or certification claim.
            </p>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Documentation">
              <Link href="/examples">
                <BookOpenCheck />
                <span>Workflow examples</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Prompt guidance">
              <Link href="/prompt-library/token-optimized">
                <TextSelect />
                <span>Token guidance</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
