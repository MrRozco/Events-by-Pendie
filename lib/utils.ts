export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const easeOut = [0.2, 0.8, 0.2, 1] as const;
export const easeSweep = [0.7, 0, 0.2, 1] as const;

export const pad = (n: number) => String(n).padStart(2, "0");
