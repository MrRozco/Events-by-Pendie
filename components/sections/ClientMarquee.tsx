function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex items-center gap-12">
          {/* Replace with client logos (next/image, grayscale, ~32px tall) */}
          <span className="font-serif text-2xl whitespace-nowrap text-dim italic">[Client logo]</span>
          <span className="size-1.5 shrink-0 rotate-45 border border-gold" />
        </span>
      ))}
    </div>
  );
}

export function ClientMarquee() {
  return (
    <section aria-label="Trusted by" className="overflow-hidden pt-18">
      <p className="mb-7 text-center text-xs font-semibold tracking-[0.22em] text-dim uppercase">
        Trusted by couples, families and companies
      </p>
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
