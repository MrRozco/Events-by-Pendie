import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { HandleTabs } from "@/components/home/HandleTabs";
import { Hero } from "@/components/home/Hero";
import { QuickStart } from "@/components/home/QuickStart";
import { DrawLine, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { Accent, CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink, Kicker } from "@/components/ui/Button";
import { ArrowRight, Check, Radio, Shield, Star, User, Wallet } from "@/components/ui/icons";
import { events, getEvent } from "@/lib/events";

const eventTypes = [
  { image: "/images/wedding.jpg", title: "Weddings", cta: "Plan a wedding", text: "Ceremonies, receptions, rehearsal dinners and the whole weekend around them.", items: ["Venue & vendor sourcing", "Guest logistics & RSVPs", "Full day-of coordination"] },
  { image: "/images/gala.jpg", title: "Corporate", cta: "Plan a corporate event", text: "Galas, summits, offsites and launches that reflect your brand and run on time.", items: ["Budget control & reporting", "Speakers, AV & staging", "Attendee travel & registration"] },
  { image: "/images/rooftop.jpg", title: "Celebrations", cta: "Plan a celebration", text: "Bachelor and bachelorette weekends, milestone birthdays and private parties.", items: ["Itineraries & reservations", "Group travel & stays", "Surprises, handled quietly"] },
];

const steps = [
  { title: "Consult", text: "A free call to understand your vision, guest list, date and budget." },
  { title: "Proposal & budget", text: "A clear plan with a line-by-line budget and timeline you approve." },
  { title: "Plan & book", text: "We source venues and vendors, negotiate, contract and schedule everything." },
  { title: "Event day", text: "Our team runs the show on site. You enjoy it like a guest." },
];

const promises: Array<{ icon: ComponentType<{ size?: number }>; title: string; text: string }> = [
  { icon: User, title: "One dedicated planner", text: "A single point of contact from first call to last dance." },
  { icon: Wallet, title: "Transparent budgets", text: "Line-by-line costs, approved by you before anything is booked." },
  { icon: Shield, title: "Vetted, insured vendors", text: "A trusted network, contracted and managed on your behalf." },
  { icon: Radio, title: "Day-of team on site", text: "We coordinate every arrival, cue and contingency." },
];

const reel = ["garden-wedding", "partners-gala", "skyline-weekend", "leadership-summit"];

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickStart />
      <ClientMarquee />

      {/* Event types */}
      <section className="section">
        <div className="container-ep flex flex-col gap-14">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[640px] flex-col gap-5">
              <Kicker>What we plan</Kicker>
              <h2 className="heading-2">Any occasion. <Accent>One</Accent> trusted team.</h2>
            </div>
            <p className="copy max-w-[400px]">From an intimate dinner for twelve to a summit for six hundred, the same meticulous process applies.</p>
          </Reveal>
          <Stagger className="grid gap-5 lg:grid-cols-3">
            {eventTypes.map((t) => (
              <StaggerItem key={t.title}>
                <Link href="/contact" className="group relative block h-[460px] overflow-hidden rounded-md lg:h-[560px]">
                  <Image src={t.image} alt={`${t.title} planned by Events by Pendie`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-105" />
                  <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,23,41,0.95)_0%,rgba(15,23,41,0.35)_55%,rgba(15,23,41,0.1)_100%)] transition-opacity duration-500 group-hover:opacity-95" />
                  <span className="absolute inset-x-0 bottom-0 flex flex-col gap-3.5 p-8">
                    <span className="font-serif text-[clamp(1.9rem,2.6vw,2.5rem)] text-ivory">{t.title}</span>
                    <span className="text-[15px] leading-relaxed text-haze">{t.text}</span>
                    {/* Always visible on touch screens; revealed on hover at desktop */}
                    <span className="flex flex-col gap-2 overflow-hidden transition-[max-height,opacity] duration-700 ease-out-soft lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-36 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-36 lg:group-focus-visible:opacity-100">
                      {t.items.map((i) => (
                        <span key={i} className="flex items-center gap-2.5 text-sm text-ivory"><Check className="text-gold-light" />{i}</span>
                      ))}
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-2.5 text-sm font-semibold text-gold-light">
                      {t.cta}<ArrowRight className="transition-transform duration-400 group-hover:translate-x-1.5" />
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What we handle */}
      <section className="section bg-sand">
        <div className="container-ep flex flex-col gap-14">
          <Reveal className="flex max-w-[760px] flex-col gap-5">
            <Kicker>What we handle</Kicker>
            <h2 className="heading-2">You approve the vision.<br />We do <Accent>all</Accent> the work.</h2>
          </Reveal>
          <Reveal><HandleTabs /></Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-navy text-ivory">
        <div className="container-ep flex flex-col gap-16">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-5">
              <Kicker light>How it works</Kicker>
              <h2 className="heading-2">Four steps to a<br /><Accent light>stress-free</Accent> event.</h2>
            </div>
            <ButtonLink href="/contact" variant="gold" arrow>Book a free consultation</ButtonLink>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="flex flex-col gap-4">
                <div className="relative h-px bg-ivory/16"><DrawLine className="absolute inset-0" delay={i * 0.12} /></div>
                <span className="font-serif text-5xl leading-none text-gold-light italic">0{i + 1}</span>
                <h3 className="heading-3 text-ivory">{s.title}</h3>
                <p className="text-[15px] leading-[1.75] text-mist">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent events reel */}
      <section className="section">
        <div className="container-ep flex flex-col gap-12">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-5">
              <Kicker>Recent events</Kicker>
              <h2 className="heading-2">Planned by us. <Accent>Remembered</Accent> by everyone.</h2>
            </div>
            <ButtonLink href="/events" variant="ghost" arrow>View all events</ButtonLink>
          </Reveal>
          <Reveal>
            <div className="-mx-5 grid snap-x snap-mandatory auto-cols-[78%] grid-flow-col gap-6 overflow-x-auto px-5 pb-3 sm:auto-cols-[44%] lg:mx-0 lg:auto-cols-fr lg:px-0">
              {reel.map((id) => {
                const e = getEvent(id)!;
                return (
                  <Link key={id} href={`/events?event=${id}`} className="group snap-start">
                    <span className="relative block aspect-[4/5] overflow-hidden rounded">
                      <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 1024px) 25vw, 78vw" className="object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-105" />
                    </span>
                    <span className="flex flex-col gap-1.5 pt-4.5">
                      <span className="text-xs font-semibold tracking-[0.16em] text-gold-ink uppercase">{e.category} · {e.stats[0].value} {e.stats[0].label.toLowerCase()}</span>
                      <span className="font-serif text-2xl">{e.title}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonial + promises */}
      <section className="section !pt-0">
        <div className="container-ep flex flex-col gap-12">
          <Reveal>
            <figure className="grid items-center gap-12 rounded-md border border-ink/7 bg-white p-8 sm:p-12 lg:grid-cols-2 lg:p-18">
              <blockquote className="font-serif text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.3] italic">
                “[Client testimonial: a real quote about how stress-free the planning felt and how the day went.]”
              </blockquote>
              <figcaption className="flex flex-col gap-4">
                <span className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} />)}</span>
                <strong className="text-[17px]">[Client name]</strong>
                <span className="text-[15px] text-slate">[Event type, venue]</span>
              </figcaption>
            </figure>
          </Reveal>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <StaggerItem key={p.title} className="flex flex-col gap-3.5 rounded-md border border-ink/7 bg-white p-7">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#f1eadf] text-gold-ink"><p.icon /></span>
                <h3 className="font-serif text-[22px]">{p.title}</h3>
                <p className="text-[15px] leading-[1.75] text-slate">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title={<>Let’s plan something <Accent light>unforgettable.</Accent></>}
        description="Tell us about your event and we’ll come back with ideas, a timeline and a clear budget. The first conversation is on us."
        image={events[1].image.src}
      />
    </>
  );
}
