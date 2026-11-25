import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, Kicker } from "@/components/ui/Button";
import { site } from "@/lib/site";

interface CtaBandProps {
  title: ReactNode;
  description: string;
  cta?: string;
  image?: string;
}

/** Navy closing call to action used at the foot of each page. */
export function CtaBand({ title, description, cta = "Plan my event", image }: CtaBandProps) {
  return (
    <section className="section !pt-0">
      <div className="container-ep">
        <Reveal className="relative grid items-end gap-10 overflow-hidden rounded-md bg-navy px-6 py-12 text-ivory sm:px-14 sm:py-18 lg:grid-cols-2 lg:px-22 lg:py-26">
          {image && (
            <>
              <Image src={image} alt="" aria-hidden fill sizes="(min-width: 1280px) 1184px, 100vw" className="object-cover opacity-30" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,#0f1729_20%,rgba(15,23,41,0.7)_100%)]" />
            </>
          )}
          <div className="relative flex flex-col gap-6">
            <Kicker light>Your next step</Kicker>
            <h2 className="heading-2">{title}</h2>
          </div>
          <div className="relative flex flex-col items-start gap-7">
            <p className="lead !text-mist">{description}</p>
            <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
              <ButtonLink href="/contact" variant="gold" arrow>{cta}</ButtonLink>
              <a href={site.phoneHref} className="btn btn-ghost-light">Call {site.phone}</a>
            </div>
            <span className="text-[13px] text-mist">Free consultation · No obligation · Reply within {site.replyTime}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export const Accent = ({ children, light }: { children: ReactNode; light?: boolean }) => (
  <em className={light ? "accent-light" : "accent"}>{children}</em>
);
