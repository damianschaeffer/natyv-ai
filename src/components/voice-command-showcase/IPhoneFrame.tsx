// IPhoneFrame — verbatim port of the inline iPhone frame component from
// my-agent-ai/src/pages/MyLifeHero.tsx (lines 60-107). `size` scales the whole
// frame proportionally (1.0 = 280×580 base).
import React from "react";

export const IPhoneFrame = ({
  videoSrc,
  poster,
  children,
  size = 1,
}: {
  videoSrc?: string;
  poster?: string;
  children?: React.ReactNode;
  size?: number;
}) => (
  <div
    className="relative mx-auto"
    style={{
      width: `min(${280 * size}px, 85vw)`,
      height: `min(${580 * size}px, calc(85vw * ${580 / 280}))`,
    }}
  >
    <div className="absolute inset-0 rounded-[44px] bg-[#1a1a1a] border-[3px] border-[#333] shadow-2xl shadow-black/60 overflow-hidden">
      {/* Dynamic Island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20" />
      {/* Status bar */}
      <div className="absolute top-4 left-8 text-[11px] text-foreground/70 font-medium z-20">9:41</div>
      <div className="absolute top-4 right-8 flex items-center gap-1 z-20">
        <div className="flex gap-[2px]">
          {[12, 10, 8, 6].map((h, i) => (
            <div
              key={i}
              className="w-[3px] rounded-sm bg-white/70"
              style={{ height: h }}
            />
          ))}
        </div>
        <div className="w-[18px] h-[9px] rounded-[2px] border border-white/70 ml-1 relative">
          <div
            className="absolute inset-[1px] rounded-[1px] bg-white/70"
            style={{ width: "70%" }}
          />
        </div>
      </div>
      {/* Screen content */}
      <div className="absolute inset-[3px] rounded-[41px] overflow-hidden bg-black">
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          children
        )}
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/30 rounded-full z-20" />
    </div>
  </div>
);

export default IPhoneFrame;
