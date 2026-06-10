import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const NATYV_CONCIERGE_AGENT_ID = "532c323e-e5bd-4ce6-bc94-45875b26bf99";
const NATYV_CONCIERGE_AVATAR =
  "https://mpbiwfisywymkdjlwivg.supabase.co/storage/v1/object/public/space-avatars/e16fc1f0-01eb-4478-8d02-a3bb5979b4a9/51449da6-b998-4a6a-97d7-70185da8dd52.png?t=1775262603440";

const widgetUrl = `https://get-myagent.com/chat/${NATYV_CONCIERGE_AGENT_ID}?embed=true&source=natyv-ai`;

const NatyvConciergeWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div className="relative h-[calc(100vh-6rem)] max-h-[820px] w-[calc(100vw-2rem)] max-w-[1000px] overflow-hidden rounded-2xl border border-primary/35 bg-background/95 shadow-2xl shadow-black/70 backdrop-blur">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg transition hover:border-primary/60 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close Natyv AI Concierge"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <iframe
            src={widgetUrl}
            title="Natyv AI Concierge"
            className="h-full w-full border-0"
            allow="microphone; autoplay; clipboard-write"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-primary/45 bg-black/85 text-white shadow-2xl shadow-primary/25 transition hover:scale-105 hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Open Natyv AI Concierge"
        >
          <span className="absolute inset-[-8px] rounded-full bg-primary/35 opacity-60 blur-sm transition group-hover:opacity-80" />
          <span className="absolute inset-[-10px] rounded-full border border-primary/70 opacity-70 animate-ping" />
          <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-background">
            <img
              src={NATYV_CONCIERGE_AVATAR}
              alt=""
              className="h-full w-full object-cover"
              aria-hidden="true"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition group-hover:opacity-100">
              <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default NatyvConciergeWidget;
