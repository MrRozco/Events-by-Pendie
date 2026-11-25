"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { quickGuests, quickTypes } from "@/lib/request";
import { easeOut } from "@/lib/utils";

type QType = (typeof quickTypes)[number];
type QGuests = (typeof quickGuests)[number];

const ctaFor = (t: QType | null) =>
  !t ? "Start planning" : t === "Other" ? "Plan my event" : t === "Bachelor / ette" ? "Plan my party" : `Plan my ${t.toLowerCase()}`;

/**
 * Overlapping quick-start bar under the hero. Passes the picks to /contact
 * as query params so the form opens pre-filled (lower friction = more leads).
 */
export function QuickStart() {
  const [type, setType] = useState<QType | null>(null);
  const [guests, setGuests] = useState<QGuests | null>(null);

  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (guests) params.set("guests", guests);
  const href = params.size ? `/contact?${params}` : "/contact";

  return (
    <div className="container-ep">
      <motion.div
        role="group"
        aria-label="Start planning"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.9 }}
        className="relative z-10 -mt-24 grid items-end gap-6 rounded-md bg-white p-5 shadow-[0_40px_80px_-40px_rgba(15,23,41,0.45)] sm:-mt-28 sm:p-8 lg:-mt-33 lg:grid-cols-[1.3fr_1fr_auto] lg:gap-8 lg:px-9"
      >
        <ChipGroup label="What are we celebrating?" options={quickTypes} value={type} onChange={setType} />
        <ChipGroup label="Guests" options={quickGuests} value={guests} onChange={setGuests} />
        <ButtonLink href={href} arrow className="w-full lg:w-auto">{ctaFor(type)}</ButtonLink>
      </motion.div>
    </div>
  );
}

function ChipGroup<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T | null; onChange: (v: T | null) => void }) {
  return (
    <div role="radiogroup" aria-label={label}>
      <span className="mb-3 block text-xs font-semibold tracking-[0.16em] text-slate uppercase">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => onChange(value === o ? null : o)} className="chip">
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
