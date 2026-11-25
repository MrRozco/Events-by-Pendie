import type { Metadata } from "next";
import { LineReveal, Reveal, RiseIn, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Accent, CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink, Kicker } from "@/components/ui/Button";
import { Check, User } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Pendie and the team behind every flawless event: precise, transparent and calm under pressure.",
};

const values = [
  { title: "Precision", text: "Every timeline, contract and cue is checked twice. Nothing is left to chance." },
  { title: "Transparency", text: "You see every cost and every decision. No surprises, no hidden fees." },
  { title: "Calm", text: "We absorb the stress, solve problems quietly and keep the day flowing." },
  { title: "Discretion", text: "Private celebrations and corporate events handled with complete confidentiality." },
];

const team = [
  { name: "Pendie", role: "Founder & Lead Planner" },
  { name: "[Team member]", role: "[Role, e.g. Senior Coordinator]" },
  { name: "[Team member]", role: "[Role, e.g. Corporate Events Lead]" },
];

const promise = [
  "A dedicated planner and one point of contact",
  "A detailed budget, approved before anything is booked",
  "Vetted, insured vendors, negotiated on your behalf",
  "A shared timeline and live run of show",
  "An on-site team from setup to last guest",
  "Post-event wrap-up, payments and returns handled",
];

const numbers = [
  { value: "[X]+", label: "Events delivered" },
  { value: "[X]", label: "Years of experience" },
  { value: "[X]+", label: "Trusted vendors" },
  { value: "[X.X]", label: "Average client rating" },
];

function PhotoPlaceholder({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <div className={dark ? "relative size-full bg-[linear-gradient(160deg,#1a2440,#0f1729)]" : "relative size-full bg-[linear-gradient(160deg,#e7dfd3,#d6cbbb)]"}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" aria-hidden className="absolute inset-0 size-full">
        <circle cx="200" cy="200" r="68" fill={dark ? "#24304f" : "#c9bca8"} />
        <path d="M78 500c0-90 55-160 122-160s122 70 122 160z" fill={dark ? "#24304f" : "#c9bca8"} />
      </svg>
      <span className={`absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap ${dark ? "bg-ivory/12 text-haze" : "bg-white/85 text-slate"}`}>
        {label}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="pt-[clamp(4rem,8vw,7.5rem)] pb-[clamp(5rem,10vw,8.5rem)]">
        <div className="container-ep grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="flex flex-col items-start gap-7">
            <RiseIn delay={0.05}><Kicker>About us</Kicker></RiseIn>
            <LineReveal className="heading-1 !text-[clamp(2.9rem,6vw,5.5rem)]" lines={["The planner behind", <>every <Accent>flawless</Accent> day.</>]} />
            <RiseIn delay={0.5}>
              <p className="lead max-w-[540px]">
                Events by Pendie was founded on a simple belief: the people hosting an event deserve to enjoy it too.
                We take on the planning, the budget, the logistics and the pressure, so you get the moment.
              </p>
            </RiseIn>
            <RiseIn delay={0.65} className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
              <ButtonLink href="/contact" arrow>Work with us</ButtonLink>
              <ButtonLink href="/events" variant="ghost">See our events</ButtonLink>
            </RiseIn>
          </div>
          <RiseIn delay={0.3} className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            {/* Replace with <Image src="/images/pendie.jpg" alt="Portrait of Pendie" fill className="object-cover" /> */}
            <div className="aspect-[4/5] overflow-hidden rounded-md"><PhotoPlaceholder label="[Portrait of Pendie]" dark /></div>
            <div className="absolute bottom-14 -left-2 flex animate-drift items-center gap-3.5 rounded-md bg-white px-5.5 py-4.5 shadow-[0_30px_60px_-30px_rgba(15,23,41,0.5)] sm:-left-9">
              <span className="flex size-11 items-center justify-center rounded-full bg-ink text-gold-light"><User size={20} /></span>
              <span className="flex flex-col">
                <strong className="text-[15px]">One point of contact</strong>
                <span className="text-[13px] text-slate">From first call to last dance</span>
              </span>
            </div>
          </RiseIn>
        </div>
      </section>

      {/* Mission + numbers */}
      <section className="section bg-navy text-ivory">
        <div className="container-ep flex flex-col gap-18">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal><Kicker light>Our mission</Kicker></Reveal>
            <Reveal delay={0.1}>
              <p className="font-serif text-[clamp(1.75rem,3.2vw,2.9rem)] leading-[1.25]">
                To make every event feel <Accent light>effortless</Accent> for the people who host it: beautifully
                designed, precisely managed and delivered exactly on budget.
              </p>
            </Reveal>
          </div>
          <Stagger className="grid grid-cols-2 gap-y-7 lg:grid-cols-4">
            {numbers.map((n, i) => (
              <StaggerItem key={n.label} className={`flex flex-col gap-2 pt-7 pr-7 ${i % 2 === 1 ? "border-l border-ivory/14 pl-7" : ""} ${i === 2 ? "lg:border-l lg:pl-7" : ""}`}>
                <span className="font-serif text-[56px] leading-none">{n.value}</span>
                <span className="text-sm text-mist">{n.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-ep flex flex-col gap-14">
          <Reveal className="flex max-w-[700px] flex-col gap-5">
            <Kicker>What we stand for</Kicker>
            <h2 className="heading-2">The standards behind <Accent>every</Accent> event.</h2>
          </Reveal>
          <Stagger className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <StaggerItem key={v.title} className="flex flex-col gap-3.5 border-t border-ink/14 pt-7">
                <span className="font-serif text-[15px] text-gold-ink italic">0{i + 1}</span>
                <h3 className="heading-3">{v.title}</h3>
                <p className="text-[15px] leading-[1.75] text-slate">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-sand">
        <div className="container-ep flex flex-col gap-14">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-5">
              <Kicker>The team</Kicker>
              <h2 className="heading-2">Planners who <Accent>sweat</Accent> the details.</h2>
            </div>
            <p className="copy max-w-[400px]">[Short paragraph about the team: background, specialties, and the network of partners you work with.]</p>
          </Reveal>
          <Stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((t, i) => (
              <StaggerItem key={i} className="flex flex-col gap-4">
                <div className="aspect-[4/5] overflow-hidden rounded-md"><PhotoPlaceholder label="[Photo]" /></div>
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-2xl">{t.name}</span>
                  <span className="text-sm text-slate">{t.role}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Promise */}
      <section className="section">
        <div className="container-ep grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-18">
          <Reveal className="flex flex-col items-start gap-6">
            <Kicker>Our promise</Kicker>
            <h2 className="heading-2">What you get with <Accent>every</Accent> booking.</h2>
            <p className="copy">Whether it’s a weekend away for sixteen or a gala for four hundred, the service is the same: complete, accountable and personal.</p>
            <ButtonLink href="/contact" arrow>Start planning</ButtonLink>
          </Reveal>
          <Stagger className="grid gap-x-8 sm:grid-cols-2">
            {promise.map((p) => (
              <StaggerItem key={p} className="flex items-start gap-3.5 border-t border-ink/10 py-5 text-base leading-normal">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-gold-light"><Check /></span>
                {p}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title={<>Your event, in <Accent light>expert</Accent> hands.</>}
        description="Book a free consultation. We’ll listen, ask the right questions and show you exactly how we’d bring it to life."
        image="/images/dinner.jpg"
      />
    </>
  );
}
