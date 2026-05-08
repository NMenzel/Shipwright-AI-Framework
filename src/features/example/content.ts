import type { ExampleNote } from "./types";

export const starterBadges = [
  "TypeScript",
  "Accessibility",
  "Testing",
  "CI/CD",
  "AI-assisted review",
] as const;

export const engineeringPrinciples: ExampleNote[] = [
  {
    title: "Clean architecture",
    description:
      "Keep route files thin, move product logic into features, and separate reusable primitives from domain code.",
  },
  {
    title: "Maintainable components",
    description:
      "Start with small editable components that stay readable and can evolve into a design system over time.",
  },
  {
    title: "Testing discipline",
    description:
      "Protect behavior with targeted unit tests and lightweight end-to-end coverage for critical entry flows.",
  },
  {
    title: "Security-conscious defaults",
    description:
      "Avoid secret leakage, keep dependencies intentional, and document decisions around trust boundaries.",
  },
];

export const qualityGates: ExampleNote[] = [
  {
    title: "Linting",
    description:
      "Static checks keep the codebase consistent and catch common mistakes early in the review cycle.",
  },
  {
    title: "Type safety",
    description:
      "A dedicated `tsc --noEmit` step ensures the starter enforces type correctness outside editor tooling.",
  },
  {
    title: "Unit and component tests",
    description:
      "Vitest and React Testing Library cover reusable behavior without depending on browser-level flows.",
  },
  {
    title: "Production build",
    description:
      "A successful build confirms the App Router surface, imports, and production bundle remain healthy.",
  },
];

export const accessibilityNotes: ExampleNote[] = [
  {
    title: "Semantic structure",
    description:
      "Meaningful headings, landmarks, buttons, and links stay in place before any ARIA is considered.",
  },
  {
    title: "Focus visibility",
    description:
      "Interactive elements preserve visible focus states so keyboard users can navigate confidently.",
  },
  {
    title: "Reusable accessible primitives",
    description:
      "shadcn and Radix patterns are preserved so customization does not silently break interaction behavior.",
  },
];

export const componentFoundationNotes: ExampleNote[] = [
  {
    title: "shadcn/ui conventions",
    description:
      "Primitive components live in `src/components/ui` and remain editable source files committed to the repository.",
  },
  {
    title: "Radix where it helps",
    description:
      "Use Radix primitives directly when accessible interactive behavior is needed and the baseline does not already cover it.",
  },
  {
    title: "Typed variants",
    description:
      "Visual variants remain explicit and constrained with `class-variance-authority` rather than scattered conditionals.",
  },
  {
    title: "Intentional growth",
    description:
      "Add new primitives when real project needs appear instead of preloading a large unused component inventory.",
  },
];

export const aiAssistedDevelopmentNotes: ExampleNote[] = [
  {
    title: "Prompt with context",
    description:
      "State the goal, architecture constraints, expected output, and quality criteria before asking an AI tool to generate changes.",
  },
  {
    title: "Review all output",
    description:
      "Generated code should be checked for correctness, maintainability, accessibility, security, and edge cases before merge.",
  },
  {
    title: "Protect sensitive data",
    description:
      "Secrets, credentials, customer information, and private infrastructure details should never be pasted into AI tools.",
  },
];
