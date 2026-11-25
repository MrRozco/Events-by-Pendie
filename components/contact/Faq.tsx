"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@/components/ui/icons";
import { easeOut, easeSweep } from "@/lib/utils";

export function Faq({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="border-b border-ink/12">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-t border-ink/12">
            <h3>
              <button
                id={`${id}-b${i}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-22 w-full items-center justify-between gap-6 text-left"
              >
                <span className="font-serif text-[clamp(1.25rem,1.8vw,1.5rem)]">{item.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.5, ease: easeSweep }} className="shrink-0 text-gold-ink"><Plus /></motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-p${i}`}
                  role="region"
                  aria-labelledby={`${id}-b${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <p className="copy max-w-[760px] pb-6.5">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
