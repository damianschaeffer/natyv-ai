import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

/**
 * SectionHeader — section-entrance announcement.
 *
 * Visually echoes the navbar lockup so visitors instantly recognize
 * "I've arrived at the {section} part of the Natyv site." Uses the
 * actual NATYV AI logomark + the same blue pill divider that separates
 * navbar items + the section name in white, all caps, large.
 *
 * Use one of these at the top of every major homepage section
 * (Studio, Services, Advisory, Partners, etc.) so the rhythm of the
 * page reads as "Natyv AI · {section name}" — same identity, different
 * room.
 */
const SectionHeader = ({ section, className = "" }: { section: string; className?: string }) => {
  return (
    <div
      className={`flex items-center justify-center gap-[clamp(0.75rem,2vw,1.5rem)] ${className}`}
      role="heading"
      aria-level={2}
    >
      {/* NATYV AI logomark — same asset the navbar uses */}
      <img
        src={natyvLogoTopline}
        alt="Natyv AI"
        className="h-[clamp(1.5rem,3.2vw,2.25rem)] w-auto"
      />

      {/* Same blue pill divider used in the navbar between nav items,
          scaled up so it visually weighs against the larger section name. */}
      <div
        className="bg-primary flex-shrink-0"
        style={{
          width: "clamp(6px, 0.7vw, 10px)",
          height: "clamp(22px, 2.7vw, 36px)",
        }}
        aria-hidden="true"
      />

      {/* Section label — Poppins (font-accent), white, large.
          letter-spacing matches the navbar so the lockup reads as one
          system. */}
      <span
        className="font-accent uppercase text-foreground whitespace-nowrap"
        style={{
          fontSize: "clamp(1.25rem, 2.9vw, 2.5rem)",
          letterSpacing: "clamp(0.1em, 0.18vw, 0.22em)",
          fontWeight: 600,
        }}
      >
        {section}
      </span>
    </div>
  );
};

export default SectionHeader;
