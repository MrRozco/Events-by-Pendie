import type { Metadata } from "next";
import Image from "next/image";
import { Suspense, type ComponentType } from "react";
import { Faq } from "@/components/contact/Faq";
import { PlanForm } from "@/components/contact/PlanForm";
import { LineReveal, Reveal, RiseIn } from "@/components/motion/Reveal";
import { Accent } from "@/components/sections/CtaBand";
import { Kicker } from "@/components/ui/Button";
import { Check, Clock, Mail, Monogram, Phone, Pin } from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan Your Event",
  description: "Tell us about your wedding, corporate event or celebration. Free consultation, transparent pricing and a reply within one day.",
};

const contacts: Array<{ icon: ComponentType<{ size?: number }>; label: string; value: string; href?: string }> = [
  { icon: Phone, label: "Call or text", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Email", value: site.email, href: site.emailHref },
  { icon: Pin, label: "Serving", value: `${site.serviceArea} & destination events` },
  { icon: Clock, label: "Response time", value: `Within ${site.replyTime}` },
];

const faqs = [
  { q: "How much does event planning cost?", a: "[Explain pricing: flat planning fee, percentage of budget, or packages, and what each includes.] Every proposal includes a full, line-by-line budget before anything is booked." },
  { q: "How far in advance should we book?", a: "For weddings and large corporate events, 6–12 months is ideal. Smaller celebrations and bachelor or bachelorette weekends can come together in a few weeks." },
  { q: "Do you only do full planning?", a: "No. We offer full planning, partial planning, venue and vendor sourcing, and day-of coordination. We’ll recommend what fits your event and budget." },
  { q: "Can you plan destination events?", a: "Yes. We plan destination weddings, group trips and offsites, including travel, accommodation and local vendors." },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-[clamp(3.5rem,7vw,6.5rem)] pb-12">
        <div className="container-ep mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
          <RiseIn delay={0.05}><Kicker>Free consultation</Kicker></RiseIn>
          <LineReveal className="heading-1 !text-[clamp(2.75rem,6vw,5.5rem)]" lines={["Let’s plan something", <Accent key="u">unforgettable.</Accent>]} />
          <RiseIn delay={0.5}>
            <p className="lead mx-auto max-w-[600px]">
              Answer a few quick questions. It takes about two minutes, and we’ll reply within {site.replyTime} with next
              steps and a time to talk.
            </p>
          </RiseIn>
        </div>
      </section>

      <section className="pt-6 pb-30">
        <div className="container-ep grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <RiseIn delay={0.5} className="relative overflow-hidden rounded-md bg-navy px-5.5 py-8 text-ivory sm:px-10 sm:py-11 lg:sticky lg:top-27">
            <Image src="/images/dinner.jpg" alt="" aria-hidden fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover opacity-30" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,41,0.7)_0%,#0f1729_70%)]" />
            <div className="relative flex flex-col gap-7">
              <div className="flex flex-col gap-4.5">
                <span className="text-ivory"><Monogram size={56} p="#d4b07a" /></span>
                <h2 className="font-serif text-[32px] leading-tight">Prefer to talk it through?</h2>
                <p className="text-[15px] leading-[1.75] text-mist">Call, email or book a time. You’ll speak with a planner, not a sales team.</p>
              </div>
              <ul>
                {contacts.map((c) => (
                  <li key={c.label} className="flex items-center gap-3.5 border-t border-ivory/14 py-4 text-[15px]">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-light/40 text-gold-light"><c.icon size={18} /></span>
                    <span>
                      <small className="mb-0.5 block text-xs text-mist">{c.label}</small>
                      {c.href ? <a href={c.href} className="hover:text-gold-light">{c.value}</a> : c.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2.5 text-sm text-haze">
                {["Free, no-obligation consultation", "Transparent pricing, upfront", "Fully insured, vetted vendors"].map((t) => (
                  <span key={t} className="flex items-center gap-2.5"><Check className="text-gold-light" />{t}</span>
                ))}
              </div>
            </div>
          </RiseIn>

          {/* Form first on mobile: the funnel matters more than the contact panel */}
          <RiseIn delay={0.65} className="max-lg:order-first">
            {/* useSearchParams (quick-start pre-fill) needs a Suspense boundary */}
            <Suspense fallback={<div className="h-[640px] rounded-md bg-white" aria-hidden />}>
              <PlanForm />
            </Suspense>
          </RiseIn>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="container-ep grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal className="flex flex-col gap-5">
            <Kicker>Good to know</Kicker>
            <h2 className="heading-2">Questions, <Accent>answered.</Accent></h2>
          </Reveal>
          <Reveal delay={0.1}><Faq items={faqs} /></Reveal>
        </div>
      </section>
    </>
  );
}
