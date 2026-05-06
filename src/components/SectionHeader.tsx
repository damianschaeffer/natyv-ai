import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

/**
 * SectionHeader — section-entrance announcement.
 *
 * Visually echoes the navbar lockup so visitors instantly recognize
 * "I've arrived at the {section} part of the Natyv site." Reads as a
 * full-width page break: NATYV AI logomark + small blue square +
 * section name in white, all caps, sized to match the logo height,
 * flanked by horizontal rules that run to the viewport edges.
 *
 * Use one of these at the top of every major homepage section
 * (Studio, Services, Advisory, Partners, etc.) so the rhythm of the
 * page reads as "Natyv AI · {section name}" — same identity, different
 * room.
 */
const SectionHeader = ({ section, className = "" }: { section: string; className?: string }) => {
  return (
    <div
      className={`flex items-center ${className}`}
      // Full-bleed: the wrapper escapes any padded parent so the flanking
      // rules can run all the way to the viewport edges. `100vw` +
      // `calc(-50vw + 50%)` is the standard "full-bleed inside a
      // contained parent" technique.
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
      }}
      role="heading"
      aria-level={2}
    >
      {/* Left rule — fills all space between viewport edge and lockup */}
      <span
        className="flex-1 h-px bg-primary/40"
        aria-hidden="true"
      />

      {/* Center lockup — logo + square divider + section name */}
      <div className="flex items-center gap-[clamp(0.75rem,2vw,1.5rem)] px-[clamp(1rem,3vw,2.5rem)]">
        <img
          src={natyvLogoTopline}
          alt="Natyv AI"
          className="h-[clamp(1.5rem,3.2vw,2.25rem)] w-auto"
        />

        {/* Small blue square divider — replaces the previous tall pill
            so it can't be misread as a capital "I". */}
        <span
          className="bg-primary flex-shrink-0"
          style={{
            width: "clamp(6px, 0.7vw, 10px)",
            height: "clamp(6px, 0.7vw, 10px)",
          }}
          aria-hidden="true"
        />

        {/* Section label — sized so its cap-height visually matches the
            NATYV AI logomark. font-size ≈ 1.4× logo height accounts for
            Poppins's ~70% cap-height ratio. */}
        <span
          className="font-accent uppercase text-foreground whitespace-nowrap"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            letterSpacing: "clamp(0.08em, 0.15vw, 0.18em)",
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          {section}
        </span>
      </div>

      {/* Right rule — mirror of the left rule */}
      <span
        className="flex-1 h-px bg-primary/40"
        aria-hidden="true"
      />
    </div>
  );
};

export default SectionHeader;
