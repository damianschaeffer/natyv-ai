/**
 * MyAgent brand assets.
 *
 * SEALED — these are the canonical visual primitives for the MyAgent
 * sub-brand. Do not invent parallel versions, do not adjust proportions,
 * do not swap fonts or colors. Anywhere on natyv.ai (or in social /
 * marketing artifacts) that needs the MyAgent identity, import from
 * this file and use one of these exports.
 *
 * Exports:
 *   • MyAgentLogo    — icon + wordmark only (no tagline). Use when the
 *                      surrounding context already implies the product
 *                      (header chips, inline mentions, the StickyDualCTA
 *                      chip, etc.).
 *   • MyAgentLockup  — full brand lockup: logo + eyebrow rules + tagline
 *                      "Your Personal AI Agent". Use as the canonical
 *                      "MyAgent" anchor on a page or in social/marketing
 *                      content where the product needs to introduce
 *                      itself.
 *
 * Geometry is locked at every size:
 *   • Star container width = wordmark height = lockup height (1:1:1)
 *   • Star → wordmark gap = 0.25 × height
 *   • Border-radius on star = 0.227 × height
 *   • Eyebrow rules under the lockup = star container width on each side
 *   • Text → eyebrow gap = same 0.25 × height (mirrored on both sides)
 *   • Text auto-fits via SVG `textLength` so it always fills the
 *     remaining column at any height.
 *
 * Both components accept a single `height` prop in pixels and scale
 * everything else off it.
 */

const NORTH_STAR_PATH =
  "M100 34 Q108 88 166 100 Q108 112 100 166 Q92 112 34 100 Q92 88 100 34Z";

const TAGLINE = "Your Personal AI Agent";

/**
 * MyAgent logo — blue rounded-square icon with the white North Star
 * mark + the "MyAgent" wordmark in Poppins 700 ("My" in primary blue,
 * "Agent" in white). Default height 56px.
 */
export const MyAgentLogo = ({ height = 56 }: { height?: number }) => {
  const iconSize = Math.round(height * 0.8);
  const borderRadius = Math.round(height * 0.227);
  return (
    <span
      role="img"
      aria-label="MyAgent"
      style={{
        display: "inline-flex",
        alignItems: "center",
        height,
        gap: `${Math.round(height * 0.25)}px`,
      }}
    >
      <span
        style={{
          width: height,
          height,
          borderRadius,
          background: "hsl(var(--primary))",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width={iconSize} height={iconSize} viewBox="24 24 152 152">
          <path d={NORTH_STAR_PATH} fill="#ffffff" />
        </svg>
      </span>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: height,
          lineHeight: 1,
          whiteSpace: "nowrap",
          letterSpacing: "-0.02em",
        }}
      >
        <span style={{ color: "hsl(var(--primary))" }}>My</span>
        <span style={{ color: "#ffffff" }}>Agent</span>
      </span>
    </span>
  );
};

/**
 * MyAgent full brand lockup — logo + eyebrow rules + the canonical
 * tagline "Your Personal AI Agent".
 *
 * Layout (geometry holds at every height):
 *
 *   [STAR]  [My][Agent]
 *   ┌─────┐ ┌────────────────────────┐ ┌─────┐
 *   │ ─── │ │  Your Personal AI Agent │ │ ─── │
 *   └─────┘ └────────────────────────┘ └─────┘
 *      H      H/4       fill          H/4    H
 */
export const MyAgentLockup = ({ height = 56 }: { height?: number }) => {
  const starSize = height; // star container width
  const gap = Math.round(height * 0.25); // matches logo's internal gap
  const taglineMarginTop = Math.round(height * 0.21);
  // Tagline font-size is locked to a fixed ratio of the logo height so
  // the lockup's proportions stay constant at any scale. 0.27 was tuned
  // so the natural width of "Your Personal AI Agent" in Inter regular
  // approximately fills the available column without stretching.
  const taglineFontSize = Math.max(10, Math.round(height * 0.27));

  return (
    <span
      role="img"
      aria-label="MyAgent — Your Personal AI Agent"
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "stretch" }}
    >
      <MyAgentLogo height={height} />
      <span
        style={{
          marginTop: `${taglineMarginTop}px`,
          display: "grid",
          // 5 columns: line · gap · text · gap · line — symmetric padding
          gridTemplateColumns: `${starSize}px ${gap}px minmax(0, 1fr) ${gap}px ${starSize}px`,
          alignItems: "center",
          width: "100%",
        }}
      >
        <span
          style={{ height: 3, width: "100%", background: "hsl(var(--primary) / 0.4)" }}
          aria-hidden="true"
        />
        <span aria-hidden="true" />
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: `${taglineFontSize}px`,
            fontWeight: 400,
            color: "hsl(var(--muted-foreground))",
            letterSpacing: "0.005em",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            // Text starts at the LEFT edge of its grid column, which is
            // exactly the right edge of the star→wordmark gap = the
            // x-position of the "M" in MyAgent above. Centering would
            // float the text mid-column when its natural width is less
            // than the column.
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "clip",
          }}
        >
          {TAGLINE}
        </span>
        <span aria-hidden="true" />
        <span
          style={{ height: 3, width: "100%", background: "hsl(var(--primary) / 0.4)" }}
          aria-hidden="true"
        />
      </span>
    </span>
  );
};

export const MYAGENT_TAGLINE = TAGLINE;
export const MYAGENT_NORTH_STAR_PATH = NORTH_STAR_PATH;
