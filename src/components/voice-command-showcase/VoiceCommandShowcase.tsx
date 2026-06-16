// <VoiceCommandShowcase> — composite: CinematicClip (left) + dashboard scene (right).
// Verbatim port of the my-agent-ai composite. Desktop: 60/40 side-by-side.
// Mobile (<768px): stacks clip-above-dashboard. Clip emits timelinePosition →
// dashboard animates in sync.
import { useState } from "react";
import { CinematicClip } from "./CinematicClip";
import { CalendarAddScene } from "./CalendarAddScene";
import { JobRescheduleScene } from "./JobRescheduleScene";
import { CallDashboardScene } from "./CallDashboardScene";
import { EmailDraftScene } from "./EmailDraftScene";
import { DocToPhoneScene } from "./DocToPhoneScene";

export type DashboardScene =
  | "calendar-add"
  | "job-reschedule"
  | "call-handling"
  | "email-draft"
  | "doc-to-phone";

export interface VoiceCommandShowcaseProps {
  videoSrc: string;
  dashboardScene: DashboardScene;
  captionsSrc?: string;
  autoPlay?: boolean;
  muted?: boolean;
  showSubtitles?: boolean;
  aspectRatio?: "16:9" | "9:16";
  onClipEnd?: () => void;
}

function hash32(str: string): string {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString(36);
}

export function VoiceCommandShowcase({
  videoSrc,
  dashboardScene,
  captionsSrc,
  autoPlay = true,
  muted = true,
  showSubtitles = true,
  aspectRatio = "16:9",
  onClipEnd,
}: VoiceCommandShowcaseProps) {
  const [timelinePosition, setTimelinePosition] = useState(0);
  // Per-instance ID so multiple showcases on the same page each get scoped
  // media queries. Derived deterministically from props (videoSrc + scene)
  // instead of useId() — useId can drift between SSR and client when the
  // parent tree's render order varies, producing React #425 hydration
  // text-content mismatches inside the inline <style> below.
  const dataId = `vcs-${dashboardScene}-${hash32(videoSrc)}`;

  return (
    <div
      data-clip-id={dataId}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
        gap: 12,
        width: "100%",
        alignItems: "stretch",
        padding: 12,
        borderRadius: 24,
        background: "hsl(var(--primary) / 0.08)",
        border: "1px solid hsl(var(--primary) / 0.30)",
      }}
    >
      {/* CSS injected via dangerouslySetInnerHTML, NOT as a text child.
          A quoted attribute selector ([data-clip-id="…"]) as a <style> text
          child makes React's SSR HTML-escape the " to &quot; while the client
          vDOM keeps the raw ", producing a React #425 text-content mismatch
          that cascades into #418/#423 hydration failures. dangerouslySetInnerHTML
          bypasses React text-escaping so server and client markup are identical. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 767px) {
          [data-clip-id="${dataId}"] {
            grid-template-columns: 1fr !important;
            grid-auto-rows: auto;
          }
        }
        @media (max-width: 639px) {
          [data-clip-id="${dataId}"] {
            padding: 0 !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
            border-bottom: none !important;
            background: transparent !important;
          }
        }
      `,
        }}
      />

      <div style={{ minWidth: 0, display: "flex" }}>
        <CinematicClip
          src={videoSrc}
          captionsSrc={captionsSrc}
          autoPlay={autoPlay}
          muted={muted}
          showSubtitles={showSubtitles}
          aspectRatio={aspectRatio}
          onProgress={setTimelinePosition}
          onEnded={onClipEnd}
        />
      </div>

      <div
        style={{
          minWidth: 0,
          display: "flex",
          minHeight: 320,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow:
            "rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px",
        }}
      >
        {dashboardScene === "calendar-add" && (
          <CalendarAddScene timelinePosition={timelinePosition} />
        )}
        {dashboardScene === "job-reschedule" && (
          <JobRescheduleScene timelinePosition={timelinePosition} />
        )}
        {dashboardScene === "call-handling" && (
          <CallDashboardScene timelinePosition={timelinePosition} />
        )}
        {dashboardScene === "email-draft" && (
          <EmailDraftScene timelinePosition={timelinePosition} />
        )}
        {dashboardScene === "doc-to-phone" && (
          <DocToPhoneScene timelinePosition={timelinePosition} />
        )}
      </div>
    </div>
  );
}
