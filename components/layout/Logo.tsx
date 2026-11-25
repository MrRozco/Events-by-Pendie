import Link from "next/link";
import { cn } from "@/lib/utils";
import { Monogram } from "@/components/ui/icons";

/** EP monogram + "Events by Pendie" wordmark. */
export function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Events by Pendie, home"
      className={cn("flex items-center gap-3", dark ? "text-ivory" : "text-ink", className)}
    >
      <Monogram />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl italic sm:text-[23px]">Events</span>
        <span className={cn("mt-1.5 text-[10px] font-semibold tracking-[0.32em] uppercase", dark ? "text-gold-light" : "text-gold-ink")}>
          by Pendie
        </span>
      </span>
    </Link>
  );
}
