"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LineReveal, RiseIn } from "@/components/motion/Reveal";
import { ButtonLink, Kicker } from "@/components/ui/Button";
import { Calendar, Shield, Star } from "@/components/ui/icons";
import { easeOut } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section ref={ref} className="relative flex min-h-[720px] items-center overflow-hidden text-ivory sm:min-h-[780px] lg:min-h-[860px]">
      <motion.div className="absolute inset-[-8%_0]" style={{ y }} initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 3, ease: easeOut }}>
        <Image
          src="/images/wedding.jpg"
          alt="An outdoor wedding reception at dusk with a long candlelit table, string lights and a floral arch"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_70%]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,41,0.92)_0%,rgba(15,23,41,0.6)_50%,rgba(15,23,41,0.25)_100%)]" />

      <div className="container-ep relative pt-18 pb-44 sm:pb-52 lg:pt-30 lg:pb-56">
        <div className="flex max-w-[780px] flex-col items-start gap-7.5">
          <RiseIn delay={0.1}><Kicker light>Full-service event planning</Kicker></RiseIn>
          <LineReveal className="heading-1" lines={["Every detail,", <><em className="accent-light">flawlessly</em> handled.</>]} />
          <RiseIn delay={0.5}>
            <p className="lead max-w-[560px] !text-haze">
              Weddings, corporate events and celebrations of every size. We plan, budget, book and run every moment, so
              you can simply arrive.
            </p>
          </RiseIn>
          <RiseIn delay={0.65} className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
            <ButtonLink href="/contact" variant="gold" arrow>Plan my event</ButtonLink>
            <ButtonLink href="/events" variant="ghost-light">See our events</ButtonLink>
          </RiseIn>
          <RiseIn delay={0.8} className="flex flex-wrap items-center gap-x-7 gap-y-3.5 text-[13px] text-haze sm:text-sm">
            <span className="inline-flex items-center gap-2.5"><Star size={18} className="text-gold-light" />[X.X] client rating</span>
            <span className="inline-flex items-center gap-2.5"><Calendar size={18} className="text-gold-light" />[X]+ events delivered</span>
            <span className="inline-flex items-center gap-2.5"><Shield size={18} className="text-gold-light" />Fully insured</span>
          </RiseIn>
        </div>
      </div>
    </section>
  );
}
