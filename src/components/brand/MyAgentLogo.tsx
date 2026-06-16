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
 * Architecture: every dimension is expressed in `em` units relative to
 * the wrapper's font-size. Setting `font-size` (via the `height` prop)
 * scales the entire asset as one cohesive unit — no element can drift
 * independently. The `height` prop accepts:
 *   • a number → interpreted as pixels (e.g., 56 → 56px)
 *   • a CSS string → used verbatim, e.g., "clamp(36px, 6vw, 68px)" so
 *     the lockup scales fluidly with the viewport.
 */

import myAgentLockupBlack from "@/assets/brand/myagent/myagent-extended-lockup-black-approved-20260608.png";
import myAgentLockupWhite from "@/assets/brand/myagent/myagent-extended-lockup-white-approved-20260608.png";

const NORTH_STAR_PATH =
  "M100 34 Q108 88 166 100 Q108 112 100 166 Q92 112 34 100 Q92 88 100 34Z";

const TAGLINE = "Your Personal AI Agent";

const toFontSize = (height: number | string) =>
  typeof height === "number" ? `${height}px` : height;

/**
 * MyAgent logo — blue rounded-square icon with the white North Star
 * mark + the "MyAgent" wordmark in Poppins 700 ("My" in primary blue,
 * "Agent" in white). Default height 56px.
 */
export const MyAgentLogo = ({ height = 56 }: { height?: number | string }) => {
  return (
    <span
      role="img"
      aria-label="MyAgent"
      style={{
        // Setting font-size here makes 1em = the requested logo height
        // throughout the children. Every dimension below is em-relative
        // so the logo scales as one unit when this value changes.
        fontSize: toFontSize(height),
        display: "inline-flex",
        alignItems: "center",
        height: "1em",
        gap: "0.25em",
        lineHeight: 1,
      }}
    >
      <span
        style={{
          width: "1em",
          height: "1em",
          borderRadius: "0.227em",
          background: "hsl(var(--primary))",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="0.8em" height="0.8em" viewBox="24 24 152 152">
          <path d={NORTH_STAR_PATH} fill="#ffffff" />
        </svg>
      </span>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "1em",
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
 * All proportions are em-relative to the wrapper's font-size, so the
 * lockup scales uniformly. Pass `height="clamp(36px, 6vw, 68px)"` for
 * fluid scaling with viewport width.
 *
 * Geometry (constant at every scale):
 *   • star container width / height = 1em (= logo height)
 *   • star → wordmark gap = 0.25em
 *   • star border-radius = 0.227em
 *   • eyebrow rules thickness = 0.045em (scales with the rest)
 *   • tagline font-size = 0.297em (sized so its natural width fills
 *     the available column edge-to-edge)
 *   • tagline → eyebrow padding = 0.25em on both sides (mirrored)
 */
export const MyAgentLockup = ({ height = 56 }: { height?: number | string }) => {
  return (
    <span
      role="img"
      aria-label="MyAgent — Your Personal AI Agent"
      style={{
        fontSize: toFontSize(height),
        display: "inline-block",
        lineHeight: 1,
      }}
    >
      <img
        src={myAgentLockupWhite}
        alt=""
        aria-hidden="true"
        className="block dark:hidden"
        style={{ height: "1.35em", width: "auto", maxWidth: "min(82vw, 100%)" }}
      />
      <img
        src={myAgentLockupBlack}
        alt=""
        aria-hidden="true"
        className="hidden dark:block"
        style={{ height: "1.35em", width: "auto", maxWidth: "min(82vw, 100%)" }}
      />
    </span>
  );
};

export const MYAGENT_TAGLINE = TAGLINE;
export const MYAGENT_NORTH_STAR_PATH = NORTH_STAR_PATH;
