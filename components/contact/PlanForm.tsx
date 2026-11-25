"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useTransition, type ComponentType, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitEventRequest } from "@/app/contact/actions";
import {
  budgetOptions,
  contactMethods,
  eventTypes,
  quickGuestsToCount,
  quickTypeToEventType,
  serviceOptions,
  type RequestInput,
} from "@/lib/request";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Briefcase, Cake, Calendar, Check, Glass, Rings, Sparkle } from "@/components/ui/icons";
import { cn, easeOut, easeSweep } from "@/lib/utils";

type EventType = (typeof eventTypes)[number];

const typeIcons: Record<EventType, ComponentType<{ size?: number }>> = {
  Wedding: Rings,
  "Corporate event": Briefcase,
  "Bachelor / bachelorette": Glass,
  "Birthday & milestone": Cake,
  "Shower & engagement": Sparkle,
  "Something else": Calendar,
};
const typeWord: Record<EventType, string> = {
  Wedding: "wedding",
  "Corporate event": "corporate event",
  "Bachelor / bachelorette": "celebration weekend",
  "Birthday & milestone": "celebration",
  "Shower & engagement": "party",
  "Something else": "event",
};
const methodWord: Record<string, string> = { "Phone call": "phone", Email: "email", "Text message": "text" };

type Form = {
  type: EventType | "";
  date: string;
  location: string;
  guests: number;
  budget: string;
  services: string[];
  name: string;
  email: string;
  phone: string;
  method: string;
  message: string;
  company: string;
};

const blank: Form = {
  type: "", date: "", location: "", guests: 120, budget: "", services: [],
  name: "", email: "", phone: "", method: "", message: "", company: "",
};

const steps = ["1 · Your event", "2 · The details", "3 · Your contact"];
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const field =
  "w-full min-h-[54px] rounded border border-ink/18 bg-ivory px-4 py-3.5 text-base text-ink placeholder:text-dim " +
  "transition-[border-color,box-shadow,background-color] focus:border-ink focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,146,90,0.18)] focus:outline-none";

/** Three-step event request funnel. Pre-fills from ?type=&guests= (home quick-start). */
export function PlanForm() {
  const params = useSearchParams();
  const qType = params.get("type") as keyof typeof quickTypeToEventType | null;
  const qGuests = params.get("guests") as keyof typeof quickGuestsToCount | null;

  const [form, setForm] = useState<Form>(() => ({
    ...blank,
    type: (qType && quickTypeToEventType[qType]) || "",
    guests: (qGuests && quickGuestsToCount[qGuests]) || blank.guests,
  }));
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const root = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setError("");
  };
  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    setError("");
    if (root.current && root.current.getBoundingClientRect().top < 0) root.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const toggleService = (s: string) => set("services", form.services.includes(s) ? form.services.filter((x) => x !== s) : [...form.services, s]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please add your name.");
    if (!emailRe.test(form.email.trim())) return setError("Please enter a valid email address.");
    startTransition(async () => {
      const res = await submitEventRequest({ ...form, method: form.method || undefined } as unknown as RequestInput);
      if (res.ok) go(4);
      else setError(res.error);
    });
  };

  const word = form.type ? typeWord[form.type] : "event";
  const guestsLabel = form.guests >= 800 ? "800+" : String(form.guests);
  const fill = (n: number) => (step > n ? 1 : step === n ? 0.5 : 0);

  const pane = {
    initial: (d: number) => ({ opacity: 0, x: d * 40 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease: easeOut } },
    exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.25 } }),
  };

  return (
    <div ref={root} className="scroll-mt-28 rounded-md border border-ink/7 bg-white p-6 shadow-[0_50px_100px_-60px_rgba(15,23,41,0.45)] sm:p-10 lg:p-13">
      {step < 4 && (
        <ol aria-label="Progress" className="mb-10 grid grid-cols-3 gap-2.5">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-col gap-2.5" aria-current={step === i + 1 ? "step" : undefined}>
              <div className="relative h-0.75 overflow-hidden rounded-full bg-[#eee8df]">
                <motion.div className="absolute inset-0 origin-left bg-ink" initial={false} animate={{ scaleX: fill(i + 1) }} transition={{ duration: 0.8, ease: easeSweep }} />
              </div>
              <span className={cn("text-[11px] font-semibold tracking-[0.06em] sm:text-xs", step >= i + 1 ? "text-ink" : "text-dim")}>{s}</span>
            </li>
          ))}
        </ol>
      )}

      <form onSubmit={submit} noValidate>
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Company<input tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => set("company", e.target.value)} /></label>
        </div>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          {step === 1 && (
            <motion.fieldset key="1" custom={dir} variants={pane} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8">
              <Heading hint="Choose the closest match.">What are we <em className="accent">planning?</em></Heading>
              <div role="radiogroup" aria-label="Event type" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {eventTypes.map((t) => {
                  const Icon = typeIcons[t];
                  const on = form.type === t;
                  return (
                    <motion.button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => set("type", t)}
                      whileTap={{ scale: 0.97 }}
                      className={cn(
                        "flex min-h-26 flex-col justify-between gap-4 rounded-md border p-4 text-left text-sm font-semibold transition-colors duration-300 sm:min-h-30 sm:p-5 sm:text-[15px]",
                        on ? "border-ink bg-ink text-ivory" : "border-ink/12 bg-ivory text-ink hover:border-ink",
                      )}
                    >
                      <span className={cn("flex size-11 items-center justify-center rounded-full transition-colors", on ? "bg-gold-light text-ink" : "bg-linen text-gold-ink")}>
                        <Icon />
                      </span>
                      {t}
                    </motion.button>
                  );
                })}
              </div>
              <ErrorText message={error} />
              <div className="flex justify-end">
                <Button arrow className="w-full sm:w-auto" onClick={() => (form.type ? go(2) : setError("Please choose the type of event."))}>Continue</Button>
              </div>
            </motion.fieldset>
          )}

          {step === 2 && (
            <motion.fieldset key="2" custom={dir} variants={pane} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8">
              <Heading>Tell us about your <em className="accent">{word}.</em></Heading>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="date" label="Event date (or best guess)"><input id="date" type="date" className={field} value={form.date} onChange={(e) => set("date", e.target.value)} /></Field>
                <Field id="location" label="Location"><input id="location" type="text" placeholder="City or venue" className={field} value={form.location} onChange={(e) => set("location", e.target.value)} /></Field>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="guests" className="text-xs font-semibold tracking-[0.16em] text-slate uppercase">Guest count</label>
                  <motion.span key={guestsLabel} initial={{ opacity: 0.4, y: -4 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-3xl">{guestsLabel}</motion.span>
                </div>
                <input id="guests" type="range" min={10} max={800} step={10} value={form.guests} onChange={(e) => set("guests", Number(e.target.value))} className="h-7 w-full accent-ink" />
              </div>
              <ChipGroup label="Budget" options={budgetOptions} isOn={(o) => form.budget === o} onPick={(o) => set("budget", o)} radio />
              <ChipGroup label="What do you need?" hint="(select all)" options={serviceOptions} isOn={(o) => form.services.includes(o)} onPick={toggleService} />
              <ErrorText message={error} />
              <Actions onBack={() => go(1)}>
                <Button arrow onClick={() => (form.budget && form.services.length ? go(3) : setError("Please pick a budget range and at least one service."))}>Continue</Button>
              </Actions>
            </motion.fieldset>
          )}

          {step === 3 && (
            <motion.fieldset key="3" custom={dir} variants={pane} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8">
              <Heading hint="We only use your details to follow up on this event.">Where should we <em className="accent">reach you?</em></Heading>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Full name *"><input id="name" type="text" autoComplete="name" required placeholder="Your name" className={field} value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
                <Field id="phone" label="Phone"><input id="phone" type="tel" autoComplete="tel" placeholder="(555) 555-0123" className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
                <Field id="email" label="Email *" className="sm:col-span-2"><input id="email" type="email" autoComplete="email" required placeholder="you@email.com" className={field} value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
              </div>
              <ChipGroup label="Best way to reach you" options={contactMethods} isOn={(o) => form.method === o} onPick={(o) => set("method", o)} radio />
              <Field id="message" label="Anything else we should know?">
                <textarea id="message" rows={4} placeholder="Your vision, must-haves, inspiration links…" className={cn(field, "min-h-[120px] resize-y")} value={form.message} onChange={(e) => set("message", e.target.value)} />
              </Field>
              <ErrorText message={error} />
              <Actions onBack={() => go(2)} disabled={pending}>
                <Button type="submit" arrow={!pending} disabled={pending} aria-busy={pending}>{pending ? "Sending…" : "Send my request"}</Button>
              </Actions>
            </motion.fieldset>
          )}

          {step === 4 && (
            <motion.div key="4" custom={1} variants={pane} initial="initial" animate="animate" role="status" className="flex flex-col gap-7">
              <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="flex size-18 items-center justify-center rounded-full bg-ink text-gold-light">
                <Check size={32} />
              </motion.span>
              <h2 className="heading-2 !text-[clamp(2.25rem,3.6vw,3.25rem)]">You’re in good hands, <em className="accent">{form.name.trim().split(/\s+/)[0] || "friend"}.</em></h2>
              <p className="copy">We’ve received your request for a {word} with about {guestsLabel} guests. Here’s what happens next:</p>
              <ol>
                {[
                  [`We reach out within ${site.replyTime}`, `By ${methodWord[form.method] ?? "email"}, to book your free consultation.`],
                  ["You receive a proposal", "A plan, timeline and line-by-line budget for your approval."],
                  ["We get to work", "Venues, vendors, schedules: all handled, all visible to you."],
                ].map(([t, d], i) => (
                  <motion.li key={t} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.12 }} className="grid grid-cols-[44px_1fr] gap-4 border-t border-ink/8 py-4.5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-ink font-serif text-lg text-gold-light italic">{i + 1}</span>
                    <span><strong className="block text-base">{t}</strong><span className="text-[15px] text-slate">{d}</span></span>
                  </motion.li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-3">
                <Link href="/events" className="btn btn-navy group">See our events <ArrowRight /></Link>
                <Button variant="ghost" onClick={() => { setForm(blank); go(1); }}>Start over</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

function Heading({ hint, children }: { hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <legend className="font-serif text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight">{children}</legend>
      {hint && <p className="text-[15px] text-slate">{hint}</p>}
    </div>
  );
}

function Field({ id, label, className, children }: { id: string; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[13px] font-semibold text-ink">{label}</label>
      {children}
    </div>
  );
}

function ChipGroup({ label, hint, options, isOn, onPick, radio }: { label: string; hint?: string; options: readonly string[]; isOn: (o: string) => boolean; onPick: (o: string) => void; radio?: boolean }) {
  return (
    <div role={radio ? "radiogroup" : "group"} aria-label={label} className="flex flex-col gap-3">
      <span className="text-xs font-semibold tracking-[0.16em] text-slate uppercase">
        {label} {hint && <span className="font-medium tracking-normal normal-case">{hint}</span>}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            {...(radio ? { role: "radio", "aria-checked": isOn(o) } : { "aria-pressed": isOn(o) })}
            onClick={() => onPick(o)}
            className="chip !bg-ivory aria-checked:!bg-ink aria-pressed:!bg-ink"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Actions({ onBack, disabled, children }: { onBack: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
      <button type="button" onClick={onBack} disabled={disabled} className="inline-flex min-h-11 items-center justify-center gap-2 text-[15px] font-semibold text-slate hover:text-ink disabled:opacity-50">
        <ArrowLeft /> Back
      </button>
      {children}
    </div>
  );
}

function ErrorText({ message }: { message: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-semibold text-danger">
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
