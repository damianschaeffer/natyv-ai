import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Index from "./pages/Index";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/Layout.tsx",
    children: [
      { index: true, Component: Index, entry: "src/pages/Index.tsx" },
      {
        path: "services",
        lazy: async () => ({ Component: (await import("./pages/Services")).default }),
        entry: "src/pages/Services.tsx",
      },
      {
        path: "about",
        lazy: async () => ({ Component: (await import("./pages/About")).default }),
        entry: "src/pages/About.tsx",
      },
      {
        path: "advisory",
        lazy: async () => ({ Component: (await import("./pages/Advisory")).default }),
        entry: "src/pages/Advisory.tsx",
      },
      {
        path: "assessment",
        lazy: async () => ({ Component: (await import("./pages/Assessment")).default }),
        entry: "src/pages/Assessment.tsx",
      },
      {
        path: "assessment/example",
        lazy: async () => ({ Component: (await import("./pages/AssessmentExample")).default }),
        entry: "src/pages/AssessmentExample.tsx",
      },
      {
        path: "partners",
        lazy: async () => ({ Component: (await import("./pages/Partners")).default }),
        entry: "src/pages/Partners.tsx",
      },
      {
        path: "faq",
        lazy: async () => ({ Component: (await import("./pages/FAQ")).default }),
        entry: "src/pages/FAQ.tsx",
      },
      {
        path: "contact",
        lazy: async () => ({ Component: (await import("./pages/Contact")).default }),
        entry: "src/pages/Contact.tsx",
      },
      {
        path: "referrals",
        lazy: async () => ({ Component: (await import("./pages/Referrals")).default }),
        entry: "src/pages/Referrals.tsx",
      },
      {
        path: "privacy",
        lazy: async () => ({ Component: (await import("./pages/Privacy")).default }),
        entry: "src/pages/Privacy.tsx",
      },
      {
        path: "terms",
        lazy: async () => ({ Component: (await import("./pages/Terms")).default }),
        entry: "src/pages/Terms.tsx",
      },
      {
        path: "security",
        lazy: async () => ({ Component: (await import("./pages/Security")).default }),
        entry: "src/pages/Security.tsx",
      },
      {
        path: "*",
        lazy: async () => ({ Component: (await import("./pages/NotFound")).default }),
        entry: "src/pages/NotFound.tsx",
      },
    ],
  },
];
