"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ButtonLink, Kicker } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Calendar, Check, Pause, Pin, Play, Sparkle } from "@/components/ui/icons";
import { budgetColors, eventCategories, events, type EventCase } from "@/lib/events";
import { cn, easeOut, easeSweep, pad } from "@/lib/utils";

type Filter = (typeof eventCategories)[number];
type DetailTab = "run" | "budget" | "handled";

const SLIDE_MS = 7000;
const detailTabs: Array<{ id: DetailTab; label: string }> = [
  { id: "run", label: "Run of show" },
  { id: "budget", label: "Budget" },
  { id: "handled", label: "What we handled" },
];

/**
 * The dynamic portfolio: an auto-playing showcase with progress thumbnails,
 * per-event stats, an animated run-of-show timeline and budget breakdown,
 * plus a filterable archive. Deep-linkable via ?event=<id>.
 */
export function EventShowcase() {
  const params = useSearchParams();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const initial = events.find((e) => e.id === params.get("event"))?.id ?? events[0].id;

  const [filter, setFilter] = useState<Filter>("All");
  const [currentId, setCurrentId] = useState(initial);
  const [tab, setTab] = useState<DetailTab>("run");
  const [playing, setPlaying] = useState(!reduceMotion);
  const [hovering, setHovering] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps to restart the progress bar
  const showcaseRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => events.filter((e) => filter === "All" || e.category === filter), [filter]);
  const list = visible.length ? visible : events;
  const current = events.find((e) => e.id === currentId) ?? events[0];
  const index = Math.max(0, list.indexOf(current));
  const running = playing && !hovering;

  /** Manual picks update the URL (shareable deep link); autoplay does not. */
  const select = useCallback(
    (id: string, { scroll = false, updateUrl = true } = {}) => {
      setCurrentId(id);
      setCycle((c) => c + 1);
      if (updateUrl) router.replace(`/events?event=${id}`, { scroll: false });
      if (scroll) showcaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [router],
  );
  const step = useCallback(
    (d: 1 | -1, auto = false) => select(list[(index + d + list.length) % list.length].id, { updateUrl: !auto }),
    [index, list, select],
  );

  // Auto-advance. The timer restarts whenever the slide, filter or play state changes.
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => step(1, true), SLIDE_MS);
    return () => clearTimeout(t);
  }, [running, step, cycle]);

  const changeFilter = (f: Filter) => {
    setFilter(f);
    const next = events.filter((e) => f === "All" || e.category === f);
    if (next.length && !next.includes(current)) select(next[0].id, { updateUrl: false });
    else setCycle((c) => c + 1);
  };
  const count = (f: Filter) => (f === "All" ? events.length : events.filter((e) => e.category === f).length);

  return (
    <>
      {/* Filters */}
      <div className="container-ep pb-14">
        <LayoutGroup id="filters">
          <div role="group" aria-label="Filter events" className="flex flex-wrap gap-2.5">
            {eventCategories.map((c) => {
              const on = c === filter;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => changeFilter(c)}
                  className={cn("relative inline-flex min-h-11 items-center gap-2 rounded-full border px-4.5 text-sm font-medium transition-colors", on ? "border-ink text-ivory" : "border-ink/16 bg-white text-ink hover:border-ink")}
                >
                  {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">{c}</span>
                  <span className={cn("relative text-xs font-semibold", on ? "text-gold-light" : "text-dim")}>{count(c)}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Showcase */}
      <section className="bg-navy py-18 text-ivory lg:pt-18 lg:pb-24">
        <div
          ref={showcaseRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => { setHovering(false); setCycle((c) => c + 1); }}
          className="container-ep grid scroll-mt-28 items-stretch gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12"
        >
          {/* Stage */}
          <div className="relative min-h-[460px] overflow-hidden rounded-md bg-[#0b1120] sm:min-h-[540px] lg:min-h-[620px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.1 }, scale: { duration: 6, ease: easeOut } }}
              >
                <Image src={current.image.src} alt={current.image.alt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,17,32,0.95)_0%,rgba(11,17,32,0.2)_45%,rgba(11,17,32,0.35)_100%)]" />

            <div className="absolute inset-x-5.5 top-5.5 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-ivory/12 px-3.5 py-2 text-xs font-semibold tracking-[0.14em] uppercase backdrop-blur-md">
                <Sparkle size={14} />{current.category}
              </span>
              <button
                type="button"
                onClick={() => { setPlaying((p) => !p); setCycle((c) => c + 1); }}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="flex size-11 items-center justify-center rounded-full border border-ivory/30 bg-[#0b1120]/40 backdrop-blur-md transition-colors hover:bg-ivory hover:text-navy"
              >
                {playing ? <Pause /> : <Play />}
              </button>
            </div>

            <div role="group" aria-label="Choose an event" className="absolute inset-x-5.5 bottom-5.5 grid grid-cols-3 gap-2 sm:auto-cols-fr sm:grid-flow-col sm:grid-cols-none sm:gap-2.5">
              {list.map((e, i) => {
                const on = e.id === current.id;
                return (
                  <button key={e.id} type="button" onClick={() => select(e.id)} aria-label={e.title} aria-current={on || undefined} className="group flex flex-col gap-2.5 pb-1 text-left">
                    <span className={cn("relative block h-11 overflow-hidden rounded transition-[opacity,transform] duration-400 sm:h-16", on ? "-translate-y-1 opacity-100" : "opacity-55 group-hover:opacity-90")}>
                      <Image src={e.image.src} alt="" fill sizes="160px" className="object-cover" />
                    </span>
                    <span className="relative h-0.5 overflow-hidden rounded-sm bg-ivory/18">
                      {on && running ? (
                        <motion.i key={`${e.id}-${cycle}`} className="absolute inset-0 origin-left bg-gold-light" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_MS / 1000, ease: "linear" }} />
                      ) : (
                        (i < index || on) && <i className="absolute inset-0 bg-gold-light" />
                      )}
                    </span>
                    <span className={cn("hidden truncate text-xs font-medium sm:block", on ? "text-ivory" : "text-mist")}>{e.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="flex flex-col gap-6.5"
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-serif text-[15px] text-gold-light italic">{pad(events.indexOf(current) + 1)} / {pad(events.length)}</span>
                <span className="flex gap-2">
                  <RoundButton label="Previous event" onClick={() => step(-1)}><ArrowLeft /></RoundButton>
                  <RoundButton label="Next event" onClick={() => step(1)}><ArrowRight /></RoundButton>
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] leading-[1.05]">{current.title}</h2>
                <span className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-mist">
                  <span className="inline-flex items-center gap-1.5"><Pin size={15} />{current.location}</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar size={15} />{current.date}</span>
                </span>
              </div>

              <dl className="grid grid-cols-2 border-t border-ivory/14">
                {current.stats.map((s, i) => (
                  <div key={s.label} className={cn("flex flex-col-reverse gap-1 border-b border-ivory/14 py-4.5", i % 2 === 1 && "border-l pl-5")}>
                    <dt className="text-[13px] text-mist">{s.label}</dt>
                    <dd className="font-serif text-[38px] leading-none"><CountUp value={Number(s.value)} /></dd>
                  </div>
                ))}
              </dl>

              <LayoutGroup id="detail-tabs">
                <div role="tablist" aria-label="Event details" className="flex gap-6.5 border-b border-ivory/14">
                  {detailTabs.map((t) => (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={tab === t.id}
                      onClick={() => setTab(t.id)}
                      className={cn("relative min-h-11.5 text-sm font-semibold transition-colors", tab === t.id ? "text-ivory" : "text-[#8e96a8] hover:text-ivory")}
                    >
                      {t.label}
                      {tab === t.id && <motion.span layoutId="detail-line" className="absolute inset-x-0 -bottom-px h-0.5 bg-gold-light" transition={{ duration: 0.45, ease: easeSweep }} />}
                    </button>
                  ))}
                </div>
              </LayoutGroup>

              <div role="tabpanel" className="min-h-[300px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: easeOut }}>
                    {tab === "run" && <RunOfShow event={current} />}
                    {tab === "budget" && <Budget event={current} />}
                    {tab === "handled" && <Handled event={current} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              <ButtonLink href="/contact" variant="gold" arrow className="self-start max-sm:w-full">Plan an event like this</ButtonLink>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Archive */}
      <section className="section">
        <div className="container-ep flex flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex flex-col gap-5">
              <Kicker>The archive</Kicker>
              <h2 className="heading-2">Every event, <em className="accent">every</em> detail.</h2>
            </div>
            <span className="text-sm font-semibold text-slate" aria-live="polite">Showing {visible.length} {visible.length === 1 ? "event" : "events"}</span>
          </div>
          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((e) => (
                <motion.li key={e.id} layout initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.6, ease: easeOut }}>
                  <button type="button" onClick={() => select(e.id, { scroll: true })} aria-label={`View ${e.title}`} className="group relative block h-[400px] w-full overflow-hidden rounded-md text-left lg:h-[460px]">
                    <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-105" />
                    <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,23,41,0.92)_0%,rgba(15,23,41,0.15)_60%)] transition-colors duration-500 group-hover:bg-navy/40" />
                    <span className="absolute top-4.5 left-4.5 rounded-full bg-ivory/14 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-ivory uppercase backdrop-blur-md">{e.category}</span>
                    <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6.5">
                      <span className="font-serif text-[clamp(1.5rem,2vw,1.9rem)] leading-tight text-ivory">{e.title}</span>
                      <span className="flex gap-2 text-[13px] text-haze">
                        <span>{e.stats[0].value} {e.stats[0].label.toLowerCase()}</span>·<span>{e.stats[2].value} weeks planned</span>
                      </span>
                      <span className="inline-flex items-center gap-2 overflow-hidden text-sm font-semibold text-gold-light transition-[max-height,opacity] duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-8 lg:group-hover:opacity-100">
                        View the event <ArrowRight />
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>
    </>
  );
}

function RoundButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex size-12 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory hover:text-navy">
      {children}
    </button>
  );
}

/** Animates a number up from zero on mount. */
function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return setN(value);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);
  return <>{n}</>;
}

function RunOfShow({ event }: { event: EventCase }) {
  return (
    <ol className="relative flex flex-col gap-4 pl-5.5 before:absolute before:top-1.5 before:bottom-1.5 before:left-1.25 before:w-px before:bg-ivory/18">
      {event.runOfShow.map((r, i) => (
        <motion.li key={r.time} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.5, ease: easeOut }} className="relative grid grid-cols-[78px_1fr] gap-3.5 sm:grid-cols-[96px_1fr]">
          <span className="absolute top-1.25 -left-5.25 size-2.25 rounded-full border-[1.5px] border-gold-light bg-navy" />
          <span className="pt-0.5 text-xs font-semibold text-gold-light">{r.time}</span>
          <span className="flex flex-col gap-0.5 text-[13px] text-mist"><strong className="text-[15px] font-semibold text-ivory">{r.title}</strong>{r.detail}</span>
        </motion.li>
      ))}
    </ol>
  );
}

function Budget({ event }: { event: EventCase }) {
  return (
    <div>
      <span className="text-[13px] text-mist">Share of total budget</span>
      <div className="mt-1.5 mb-5.5 flex h-4 gap-0.75 overflow-hidden rounded-full">
        {event.budget.map((b, i) => (
          <motion.span key={b.label} className="block h-full origin-left" style={{ width: `${b.percent}%`, background: budgetColors[i % budgetColors.length] }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: easeSweep, delay: i * 0.08 }} />
        ))}
      </div>
      <ul>
        {event.budget.map((b, i) => (
          <motion.li key={b.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }} className="flex items-center gap-3 border-t border-ivory/10 py-2.75 text-sm text-haze">
            <i className="size-2.5 shrink-0 rounded-sm" style={{ background: budgetColors[i % budgetColors.length] }} />
            {b.label}
            <b className="ml-auto font-semibold text-ivory">{b.percent}%</b>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Handled({ event }: { event: EventCase }) {
  return (
    <div className="flex flex-col gap-5.5">
      <p className="leading-[1.75] text-haze">{event.brief}</p>
      <ul className="flex flex-wrap gap-2">
        {event.handled.map((h, i) => (
          <motion.li key={h} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="inline-flex items-center gap-2 rounded-full border border-ivory/18 px-3.5 py-2 text-[13px] text-haze">
            <Check className="text-gold-light" />{h}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function EventShowcaseFallback() {
  return <div className="h-[900px] bg-navy" aria-hidden />;
}

