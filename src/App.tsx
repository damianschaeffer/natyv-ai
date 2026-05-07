import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Index from "./pages/Index";
import Advisory from "./pages/Advisory";
import About from "./pages/About";
import Services from "./pages/Services";
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
      { path: "*", Component: NotFound, entry: "src/pages/NotFound.tsx" },
    ],
  },
];
