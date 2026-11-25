"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check, ListCheck, Calendar, Wallet, Radio } from "@/components/ui/icons";
import { cn, easeOut, easeSweep } from "@/lib/utils";

type TabId = "plan" | "schedule" | "budget" | "execute";

const tabs: Array<{ id: TabId; icon: ComponentType<{ size?: number }>; title: string; text: string }> = [
  { id: "plan", icon: ListCheck, title: "Plan", text: "Vision, venues and every vendor, sourced and contracted." },
  { id: "schedule", icon: Calendar, title: "Schedule", text: "A minute-by-minute run of show everyone works from." },
  { id: "budget", icon: Wallet, title: "Budget", text: "Line-by-line costs, tracked and reported in real time." },
  { id: "execute", icon: Radio, title: "Execute", text: "Our team on site, running every cue and contingency." },
];

const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.5, ease: easeOut } }),
};

/** "What we handle": tabs driving an illustrative client-portal screen. */
export function HandleTabs() {
  const [active, setActive] = useState<TabId>("plan");

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      <LayoutGroup id="handle">
        <div role="tablist" aria-label="Services" className="flex flex-col gap-2.5">
          {tabs.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls="handle-panel"
                onClick={() => setActive(t.id)}
                className={cn("relative flex items-start gap-4.5 rounded-md p-4 text-left transition-colors sm:p-5.5", on ? "text-ink" : "text-slate hover:bg-white/60")}
              >
                {on && (
                  <motion.span
                    layoutId="handle-bg"
                    className="absolute inset-0 rounded-md border border-ink/8 bg-white shadow-[0_20px_40px_-28px_rgba(15,23,41,0.35)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={cn("relative flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-400", on ? "bg-ink text-gold-light" : "bg-linen text-gold-ink")}>
                  <t.icon size={20} />
                </span>
                <span className="relative flex flex-col gap-1">
                  <span className="text-[17px] font-semibold">{t.title}</span>
                  <span className="hidden text-sm leading-normal text-slate sm:block">{t.text}</span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <div className="relative overflow-hidden rounded-lg border border-ink/8 bg-white shadow-[0_60px_100px_-60px_rgba(15,23,41,0.55)]">
        <div className="flex items-center gap-2 border-b border-ink/7 px-4.5 py-3.5 text-xs text-slate">
          <i className="size-2.5 rounded-full bg-[#e3ded5]" /><i className="size-2.5 rounded-full bg-[#e3ded5]" /><i className="size-2.5 rounded-full bg-[#e3ded5]" />
          <span className="ml-2.5">Your event portal</span>
          <span className="ml-auto text-[11px] font-semibold tracking-[0.14em] text-dim uppercase">Example</span>
        </div>
        <div id="handle-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="min-h-[400px] p-5.5 sm:min-h-[440px] sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: easeOut }} className="flex flex-col gap-5.5">
              {active === "plan" && <PlanPanel />}
              {active === "schedule" && <SchedulePanel />}
              {active === "budget" && <BudgetPanel />}
              {active === "execute" && <ExecutePanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PanelHead({ title, pill, live }: { title: string; pill: string; live?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-serif text-[22px]">{title}</span>
      <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold", live ? "bg-[#e6eef8] text-[#2a4a7a]" : "bg-[#f1eadf] text-gold-ink")}>
        {live && <i className="size-1.75 animate-pulse-dot rounded-full bg-[#2a6bd1]" />}
        {pill}
      </span>
    </div>
  );
}

function Row({ i, children, className }: { i: number; children: ReactNode; className?: string }) {
  return (
    <motion.li custom={i} variants={listItem} initial="hidden" animate="show" className={cn("flex items-center gap-3.5 border-t border-ink/7 py-3.5 text-[15px]", className)}>
      {children}
    </motion.li>
  );
}

const Meta = ({ children }: { children: ReactNode }) => <span className="ml-auto text-[13px] whitespace-nowrap text-dim">{children}</span>;

function PlanPanel() {
  const items = [
    ["Venue contracted", "Week 2", true],
    ["Catering tasting & menu signed", "Week 5", true],
    ["Photographer & band booked", "Week 6", true],
    ["Floral design approval", "Due Fri", false],
    ["Guest shuttle schedule", "Due next wk", false],
  ] as const;
  return (
    <>
      <PanelHead title="Planning checklist" pill="12 of 18 complete" />
      <div className="h-1.5 overflow-hidden rounded-full bg-[#eee8df]">
        <motion.div className="h-full origin-left rounded-full bg-ink" initial={{ scaleX: 0 }} animate={{ scaleX: 0.67 }} transition={{ duration: 1.2, ease: easeSweep, delay: 0.15 }} />
      </div>
      <ul>
        {items.map(([label, meta, done], i) => (
          <Row key={label} i={i} className={done ? "text-slate" : undefined}>
            <span className={cn("flex size-5.5 shrink-0 items-center justify-center rounded border-[1.5px]", done ? "border-ink bg-ink text-ivory" : "border-ink/25")}>
              {done && <Check size={14} />}
            </span>
            {label}
            <Meta>{meta}</Meta>
          </Row>
        ))}
      </ul>
    </>
  );
}

function SchedulePanel() {
  const items = [
    ["2:00 PM", "Vendor load-in", "Florals, lighting, rentals"],
    ["4:30 PM", "Guest arrival", "Welcome drinks on the terrace"],
    ["5:00 PM", "Ceremony", "Quartet cue · officiant mic check"],
    ["6:15 PM", "Dinner service", "Three courses, toasts at 7:30"],
    ["8:00 PM", "First dance & party", "Band, then DJ until 11"],
  ];
  return (
    <>
      <PanelHead title="Run of show" pill="Saturday" />
      <ol className="relative flex flex-col gap-4.5 pl-5.5 before:absolute before:top-1.5 before:bottom-1.5 before:left-1.25 before:w-px before:bg-ink/15">
        {items.map(([t, title, d], i) => (
          <motion.li key={t} custom={i} variants={listItem} initial="hidden" animate="show" className="relative grid grid-cols-[72px_1fr] gap-4 sm:grid-cols-[84px_1fr]">
            <span className={cn("absolute top-1.5 -left-5.25 size-2.25 rounded-full border-[1.5px] border-gold", i === 2 ? "bg-gold shadow-[0_0_0_6px_rgba(184,146,90,0.18)]" : "bg-white")} />
            <span className="pt-0.5 text-[13px] font-semibold text-gold-ink">{t}</span>
            <span className="flex flex-col gap-0.5 text-sm text-slate"><strong className="text-[15px] font-semibold text-ink">{title}</strong>{d}</span>
          </motion.li>
        ))}
      </ol>
    </>
  );
}

function BudgetPanel() {
  const lines = [
    ["Venue & catering", 38, "#121a2b"],
    ["Décor & florals", 24, "#b8925a"],
    ["Entertainment", 14, "#5b6b8c"],
    ["Photo & video", 10, "#d9cdb8"],
    ["Transport", 6, "#9c6b5e"],
  ] as const;
  return (
    <>
      <PanelHead title="Budget overview" pill="On track" />
      <div className="flex items-baseline gap-2.5">
        <span className="font-serif text-[44px] leading-none">92%</span>
        <span className="text-sm text-slate">of approved budget allocated</span>
      </div>
      <div className="flex h-3.5 gap-0.75 overflow-hidden rounded-full">
        {lines.map(([label, pct, color], i) => (
          <motion.span key={label} className="block h-full origin-left" style={{ width: `${pct}%`, background: color }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: easeSweep, delay: 0.1 * i }} />
        ))}
      </div>
      <ul className="grid gap-x-7 gap-y-3 sm:grid-cols-2">
        {lines.map(([label, pct, color]) => (
          <li key={label} className="flex items-center gap-2.5 text-sm text-slate">
            <i className="size-2.5 shrink-0 rounded-sm" style={{ background: color }} />
            {label}
            <b className="ml-auto font-semibold text-ink">{pct}%</b>
          </li>
        ))}
      </ul>
    </>
  );
}

function ExecutePanel() {
  const items = [
    ["Florals installed", "1:45 PM", "ok"],
    ["Band soundcheck complete", "3:20 PM", "ok"],
    ["Shuttle 2 en route · 8 min", "4:12 PM", "go"],
    ["Ceremony chairs set · 180", "4:15 PM", "ok"],
    ["Cake delivery", "ETA 5:30 PM", "wait"],
  ] as const;
  const dot = { ok: "bg-[#2f7d5b]", go: "bg-[#2a6bd1] shadow-[0_0_0_5px_rgba(42,107,209,0.15)]", wait: "bg-gold" };
  return (
    <>
      <PanelHead title="Day-of command" pill="Live" live />
      <ul>
        {items.map(([label, meta, s], i) => (
          <Row key={label} i={i}>
            <span className={cn("size-2.5 shrink-0 rounded-full", dot[s])} />
            {label}
            <Meta>{meta}</Meta>
          </Row>
        ))}
      </ul>
    </>
  );
}
