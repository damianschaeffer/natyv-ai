import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Index from "./pages/Index";
import Advisory from "./pages/Advisory";
import Assessment from "./pages/Assessment";
import About from "./pages/About";
import Services from "./pages/Services";
import Partners from "./pages/Partners";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Referrals from "./pages/Referrals";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/Layout.tsx",
    children: [
      { index: true, Component: Index, entry: "src/pages/Index.tsx" },
      { path: "services", Component: Services, entry: "src/pages/Services.tsx" },
      { path: "about", Component: About, entry: "src/pages/About.tsx" },
      { path: "advisory", Component: Advisory, entry: "src/pages/Advisory.tsx" },
      { path: "assessment", Component: Assessment, entry: "src/pages/Assessment.tsx" },
      { path: "partners", Component: Partners, entry: "src/pages/Partners.tsx" },
      { path: "faq", Component: FAQ, entry: "src/pages/FAQ.tsx" },
      { path: "contact", Component: Contact, entry: "src/pages/Contact.tsx" },
      { path: "referrals", Component: Referrals, entry: "src/pages/Referrals.tsx" },
      { path: "privacy", Component: Privacy, entry: "src/pages/Privacy.tsx" },
      { path: "terms", Component: Terms, entry: "src/pages/Terms.tsx" },
      { path: "security", Component: Security, entry: "src/pages/Security.tsx" },
      { path: "*", Component: NotFound, entry: "src/pages/NotFound.tsx" },
    ],
  },
];
