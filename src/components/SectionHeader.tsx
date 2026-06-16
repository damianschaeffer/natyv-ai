import NatyvLogo from "@/components/brand/NatyvLogo";

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
  // Default sized so the lockup width approximately matches the
  // MyAgent lockup width below it (NATYV AI image is 8.21:1; MyAgent
  // lockup is ~5.77:1 of its font-size; this clamp keeps the two
  // assets at equal horizontal weight at every viewport).
  height = "clamp(1.5rem, 3.87vw, 3rem)",
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
      <NatyvLogo
        decorative
        className=""
        style={{ height: "1em", width: "auto", display: "block" }}
      />

      {/* Blue divider — thickness ≈ letter-stroke weight in the words
          above and below. */}
      <span
        aria-hidden="true"
        style={{
          height: "0.13em",
          background: "hsl(var(--primary))",
          width: "100%",
          marginTop: "0.18em",
        }}
      />

      {/* Line 2 — [square] section-name [square], centered.
          justify-center + fixed gap means the squares hug the section
          name with consistent padding regardless of word length, so
          STUDIO / SERVICES / ADVISORY / PARTNERS all read as the same
          treatment instead of stretching to the lockup edges. */}
      <div
        style={{
          marginTop: "0.18em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5em",
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
            fontSize: "1em",
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
