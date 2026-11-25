"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn, easeOut, easeSweep } from "@/lib/utils";

const viewport = { once: true, margin: "0px 0px -80px 0px" } as const;

/** Fade + rise once in view. */
export function Reveal({ delay = 0, y = 32, children, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Plays on mount: for above-the-fold content. */
export function RiseIn({ delay = 0, children, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Masked line-by-line headline. Renders a real heading. */
export function LineReveal({
  lines,
  as: Tag = "h1",
  delay = 0.2,
  className,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2";
  delay?: number;
  className?: string;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: easeOut, delay: delay + i * 0.14 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** A hairline that draws itself in gold when scrolled into view. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={cn("relative h-px", className)}>
      <motion.div
        className="absolute inset-0 origin-left bg-gold-light"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 1.3, ease: easeSweep, delay }}
      />
    </div>
  );
}

const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const child: Variants = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } } };

export function Stagger({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={parent} initial="hidden" whileInView="show" viewport={viewport} {...props}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={child} {...props}>
      {children}
    </motion.div>
  );
}
