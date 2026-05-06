import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

/**
 * SectionHeader — section-entrance brand lockup.
 *
 * Self-contained two-line stack that announces "you've arrived at the
 * NATYV AI · {section} part of the site":
 *
 *   ┌─────────────────────┐
 *   │     NATYV AI        │  ← top: canonical NATYV AI wordmark
 *   ├─────────────────────┤  ← blue divider, thickness matches letter strokes
 *   │  ■    STUDIO     ■  │  ← bottom: ■ section name ■
 *   └─────────────────────┘
 *
 * The lockup width is set by the NATYV AI wordmark image's natural
 * aspect ratio at height = 1em. The section row below uses
 * justify-between so the small blue squares anchor the left/right
 * edges and the section name sits centered between them — same width
 * regardless of which section, so STUDIO / SERVICES / ADVISORY /
 * PARTNERS all read as a consistent set.
 *
 * Every dimension is em-relative to the wrapper's font-size, so the
 * lockup scales as one cohesive unit. Pass `height` as a CSS string
 * (e.g., "clamp(1.25rem, 3vw, 2rem)") for fluid scaling.
 */
const SectionHeader = ({
  section,
  height = "clamp(1.25rem, 2.6vw, 2rem)",
  className = "",
}: {
  section: string;
  height?: string | number;
  className?: string;
}) => {
  const fontSize = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`inline-flex flex-col items-stretch ${className}`}
      style={{
        fontSize,
        lineHeight: 1,
      }}
      role="heading"
      aria-level={2}
      aria-label={`Natyv AI · ${section}`}
    >
      {/* Line 1 — NATYV AI wordmark. Height = 1em, width auto-derived
          from the asset's aspect ratio. This sets the lockup width. */}
      <img
        src={natyvLogoTopline}
        alt=""
        aria-hidden="true"
        style={{ height: "1em", width: "auto", display: "block" }}
      />

      {/* Blue divider — thickness ≈ letter-stroke weight in the words
          above and below. 0.13em reads cleanly at every scale without
          overpowering the type. */}
      <span
        aria-hidden="true"
        style={{
          height: "0.13em",
          background: "hsl(var(--primary))",
          width: "100%",
          marginTop: "0.16em",
        }}
      />

      {/* Line 2 — ■ section name ■.
          justify-between anchors the squares to the lockup's left/right
          edges; the section name centers in whatever space remains. */}
      <div
        style={{
          marginTop: "0.32em",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "0.32em",
            height: "0.32em",
            background: "hsl(var(--primary))",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "0.85em",
            letterSpacing: "0.22em",
            // Trailing tracking adds visual width to the right of the
            // last glyph so the optical center matches the geometric
            // center between the two squares.
            paddingLeft: "0.22em",
            lineHeight: 1,
            textTransform: "uppercase",
            color: "hsl(var(--foreground))",
            whiteSpace: "nowrap",
          }}
        >
          {section}
        </span>
        <span
          aria-hidden="true"
          style={{
            width: "0.32em",
            height: "0.32em",
            background: "hsl(var(--primary))",
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
};

export default SectionHeader;
