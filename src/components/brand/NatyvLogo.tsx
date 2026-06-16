import natyvLogoToplineDark from "@/assets/natyv-logo-topline.png";
import natyvLogoToplineLight from "@/assets/natyv-logo-topline-light.png";
import type { CSSProperties } from "react";

type NatyvLogoProps = {
  className?: string;
  style?: CSSProperties;
  decorative?: boolean;
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
};

const NatyvLogo = ({
  className,
  style,
  decorative = false,
  loading,
  decoding = "async",
}: NatyvLogoProps) => {
  const accessibilityProps = decorative
    ? { alt: "", "aria-hidden": true as const }
    : { alt: "Natyv AI" };

  return (
    <>
      <img
        src={natyvLogoToplineLight}
        className={`block dark:hidden ${className ?? ""}`}
        style={style}
        loading={loading}
        decoding={decoding}
        {...accessibilityProps}
      />
      <img
        src={natyvLogoToplineDark}
        className={`hidden dark:block ${className ?? ""}`}
        style={style}
        loading={loading}
        decoding={decoding}
        {...accessibilityProps}
      />
    </>
  );
};

export default NatyvLogo;
