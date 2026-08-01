import { CalendarDays, Play, Sparkles } from "lucide-react";

const MYAGENT_DEMO_URL = "https://get-myagent.com/ava?ref=natyv-ai-header";
const MYAGENT_TRIAL_URL = "https://get-myagent.com/activate?source=natyv-ai-header";
const CONSULTATION_URL =
  "https://cal.com/damian-schaeffer/consultation?layout=column_view&theme=dark&hideEventTypeDetails=true&useSlotsViewOnSmallScreen=false&ui.autoscroll=false";

const solidButtonClass =
  "bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90";
const outlineButtonClass =
  "rounded-full border-primary/75 bg-background/80 shadow-[0_0_0_2px_hsl(var(--primary)/0.18),0_10px_28px_-16px_hsl(var(--primary))] ring-1 ring-primary/25 backdrop-blur-md transition-all hover:border-primary hover:bg-background/90 hover:ring-primary/40";
const headerButtonClass =
  "inline-flex h-7 shrink-0 items-center justify-center gap-1 rounded-full px-2 font-poppins font-semibold text-[10px] sm:h-9 sm:px-3 sm:text-xs md:px-4 md:text-sm [&_svg]:size-3 sm:[&_svg]:size-3.5";

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

type HeaderConversionCTAsProps = {
  mobile?: boolean;
};

/**
 * Natyv's top-right conversion group mirrors the canonical MyAgent header:
 * Demo, Book Free Call, then Start Free Trial.
 */
export function HeaderConversionCTAs({ mobile = false }: HeaderConversionCTAsProps) {
  if (mobile) {
    return (
      <div className="flex w-full max-w-xs flex-col gap-3">
        <a
          href={MYAGENT_DEMO_URL}
          {...externalLinkProps}
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 font-poppins text-sm font-semibold ${solidButtonClass}`}
        >
          <Play className="size-4 fill-current" aria-hidden="true" />
          Demo
        </a>
        <a
          href={CONSULTATION_URL}
          {...externalLinkProps}
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border px-5 font-poppins text-sm font-semibold ${outlineButtonClass}`}
        >
          <CalendarDays className="size-4 text-primary" aria-hidden="true" />
          Book Free Call
        </a>
        <a
          href={MYAGENT_TRIAL_URL}
          {...externalLinkProps}
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 font-poppins text-sm font-semibold ${solidButtonClass}`}
        >
          <Sparkles className="size-4" aria-hidden="true" />
          Start Free Trial
        </a>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
      <a
        href={MYAGENT_DEMO_URL}
        {...externalLinkProps}
        className={`${headerButtonClass} hidden xl:inline-flex ${solidButtonClass}`}
        aria-label="Demo"
      >
        <Play className="fill-current" aria-hidden="true" />
        Demo
      </a>
      <a
        href={CONSULTATION_URL}
        {...externalLinkProps}
        className={`${headerButtonClass} ${outlineButtonClass}`}
        aria-label="Book Free Call"
      >
        <CalendarDays className="shrink-0 text-primary" aria-hidden="true" />
        <span className="hidden xl:inline">Book Free Call</span>
        <span className="xl:hidden">Book</span>
      </a>
      <a
        href={MYAGENT_TRIAL_URL}
        {...externalLinkProps}
        className={`${headerButtonClass} whitespace-nowrap ${solidButtonClass}`}
        aria-label="Start Free Trial"
      >
        <Sparkles className="hidden shrink-0 min-[380px]:inline" aria-hidden="true" />
        <span className="max-[379px]:hidden lg:hidden">Free Trial</span>
        <span className="hidden max-[379px]:inline lg:hidden">Trial</span>
        <span className="hidden lg:inline">Start Free Trial</span>
      </a>
    </div>
  );
}

export default HeaderConversionCTAs;
