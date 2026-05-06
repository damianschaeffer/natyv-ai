// CallHandlingShowcase — verbatim port of CallHandlingSyncedPair from
// my-agent-ai/src/pages/MyLifeHero.tsx (lines 311-342). Pairs the
// CallHandlingVideo (left) with the IPhoneFrame + OperatorPhoneDemo (right)
// using a single videoTimeMs clock so the phone widget animates in lockstep
// with the video's call progression.
import { useState } from "react";
import { CallHandlingVideo } from "./CallHandlingVideo";
import { IPhoneFrame } from "./IPhoneFrame";
import OperatorPhoneDemo from "./OperatorPhoneDemo";

export const CallHandlingShowcase = () => {
  const [videoTimeMs, setVideoTimeMs] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-3 w-full max-w-6xl mx-auto rounded-3xl border border-primary/30 bg-primary/[0.08] p-3">
      {/* LEFT — Captioned cinematic clip. */}
      <div className="flex-shrink min-w-0 w-full lg:flex-1 lg:flex">
        <div className="relative rounded-3xl overflow-hidden bg-[#1a1a1a] border border-border shadow-2xl shadow-black/60 w-full aspect-video lg:aspect-auto lg:flex-1">
          <CallHandlingVideo onTimeUpdate={setVideoTimeMs} />
        </div>
      </div>

      {/* RIGHT — iPhone-framed operator demo. size=0.85 trims phone height for clean side-by-side alignment. */}
      <div className="flex-shrink-0 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[600px] bg-primary/[0.06] rounded-full blur-[100px] pointer-events-none" />
        <IPhoneFrame size={0.85}>
          <OperatorPhoneDemo videoTimeMs={videoTimeMs} />
        </IPhoneFrame>
      </div>
    </div>
  );
};

export default CallHandlingShowcase;
