import type { Metadata } from "next";
import { Suspense } from "react";
import { EventShowcase, EventShowcaseFallback } from "@/components/events/EventShowcase";
import { LineReveal, RiseIn } from "@/components/motion/Reveal";
import { Accent, CtaBand } from "@/components/sections/CtaBand";
import { Kicker } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Events",
  description: "Weddings, corporate galas, summits and celebrations planned by Events by Pendie: run of show, budget and everything we handled.",
};

export default function EventsPage() {
  return (
    <>
      <section className="pt-[clamp(4rem,8vw,7.5rem)] pb-8">
        <div className="container-ep flex flex-col gap-8">
          <RiseIn delay={0.05}><Kicker>Our events</Kicker></RiseIn>
          <div className="flex flex-wrap items-end justify-between gap-7">
            <LineReveal className="heading-1" lines={["Events we’ve", <Accent key="b">brought to life.</Accent>]} />
            <RiseIn delay={0.5}>
              <p className="lead max-w-[420px]">
                Step inside a few of the events we’ve planned. See the run of show, how the budget was spent and
                everything we handled.
              </p>
            </RiseIn>
          </div>
        </div>
      </section>

      {/* useSearchParams (deep links) needs a Suspense boundary for static rendering */}
      <Suspense fallback={<EventShowcaseFallback />}>
        <EventShowcase />
      </Suspense>

      <CtaBand
        title={<>Your event could be <Accent light>next.</Accent></>}
        description="Tell us what you’re planning. We’ll send back a timeline, a budget range and a few ideas you won’t have thought of."
      />
    </>
  );
}
