"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks } from "@/lib/site";
import { cn, easeOut } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Close, Menu } from "@/components/ui/icons";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-60 border-b bg-ivory/86 backdrop-blur-xl backdrop-saturate-130 transition-[box-shadow,border-color] duration-300",
        scrolled ? "border-ink/8 shadow-[0_10px_30px_-24px_rgba(15,23,41,0.5)]" : "border-transparent",
      )}
    >
      <div className="container-ep flex h-[72px] items-center gap-8 lg:h-[84px]">
        <Logo className="mr-auto" />

        <nav aria-label="Main" className="hidden gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center px-3.5 text-[15px] font-medium transition-colors",
                  active ? "text-ink" : "text-[#3c4457] hover:text-ink",
                )}
              >
                {l.label}
                {active && (
                  <motion.span layoutId="nav-line" className="absolute inset-x-3.5 bottom-2 h-px bg-gold" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact" arrow className="!min-h-[46px] !px-5.5 !text-sm">Plan my event</ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-ink/18 text-ink lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              {open ? <Close /> : <Menu />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="overflow-hidden border-t border-ink/8 lg:hidden"
          >
            <div className="container-ep flex flex-col pt-2 pb-7">
              {navLinks.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 + i * 0.05 }}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn("flex min-h-[58px] items-center border-b border-ink/8 font-serif text-[26px]", isActive(l.href) ? "text-gold-ink" : "text-ink")}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <ButtonLink href="/contact" arrow className="mt-5 w-full">Plan my event</ButtonLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
