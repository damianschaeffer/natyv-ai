import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

// SSR-safe scroll-in wrapper. Server renders children plainly; after hydration
// the wrapper swaps to a Framer Motion `whileInView` so the inline-style
// snapshot can never mismatch between server and client (React #418).
export const MotionSection = ({ children }: { children: ReactNode }) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (!hydrated) return <>{children}</>;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default MotionSection;
