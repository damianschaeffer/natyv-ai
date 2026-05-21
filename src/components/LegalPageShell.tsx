import type { ComponentType, ReactNode } from "react";
import { motion } from "framer-motion";
import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LegalPageShellProps = {
  title: string;
  accentTitle: string;
  eyebrow: string;
  description: string;
  canonicalPath: string;
  metaTitle: string;
  metaDescription: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
};

export const LegalPageShell = ({
  title,
  accentTitle,
  eyebrow,
  description,
  canonicalPath,
  metaTitle,
  metaDescription,
  icon: Icon,
  children,
}: LegalPageShellProps) => (
  <div className="min-h-screen bg-background">
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={`https://natyv.ai${canonicalPath}`} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={`https://natyv.ai${canonicalPath}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://natyv.ai/og-image.png" />
    </Head>

    <Navbar />

    <main className="pt-28 sm:pt-32 pb-20">
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 text-xs sm:text-sm text-primary border border-primary/30 rounded-full font-accent uppercase">
            <Icon className="h-4 w-4" />
            {eyebrow}
          </span>
          <h1 className="mt-8 font-roboto text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] text-foreground">
            {title}
            <span className="block text-primary">{accentTitle}</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mt-14 space-y-6">{children}</div>
      </section>
    </main>

    <Footer />
  </div>
);

export const LegalSection = ({
  title,
  children,
  accent = "hsl(var(--primary))",
}: {
  title: string;
  children: ReactNode;
  accent?: string;
}) => (
  <section
    className="bg-card/70 border border-border rounded-lg p-5 sm:p-7"
    style={{ borderTop: `3px solid ${accent}` }}
  >
    <h2 className="font-poppins text-xl sm:text-2xl font-bold text-foreground mb-4">
      {title}
    </h2>
    <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
      {children}
    </div>
  </section>
);

export const LegalList = ({ children }: { children: ReactNode }) => (
  <ul className="space-y-2 pl-5 list-disc marker:text-primary">{children}</ul>
);
