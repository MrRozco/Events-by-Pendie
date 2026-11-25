import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./icons";

export type ButtonVariant = "navy" | "gold" | "ghost" | "ghost-light";

const variantClass: Record<ButtonVariant, string> = {
  navy: "btn-navy",
  gold: "btn-gold",
  ghost: "btn-ghost",
  "ghost-light": "btn-ghost-light",
};

const arrow = <ArrowRight className="transition-transform duration-400 ease-out-soft group-hover:translate-x-1" />;

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "navy", arrow: withArrow, className, children, ...props }: LinkProps) {
  return (
    <Link className={cn("btn group", variantClass[variant], className)} {...props}>
      {children}
      {withArrow && arrow}
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { variant?: ButtonVariant; arrow?: boolean };

export function Button({ variant = "navy", arrow: withArrow, className, children, type = "button", ...props }: BtnProps) {
  return (
    <button type={type} className={cn("btn group disabled:pointer-events-none disabled:opacity-50", variantClass[variant], className)} {...props}>
      {children}
      {withArrow && arrow}
    </button>
  );
}

export function Kicker({ light, className, children }: { light?: boolean; className?: string; children: ReactNode }) {
  return <span className={cn("kicker", light && "kicker-light", className)}>{children}</span>;
}
