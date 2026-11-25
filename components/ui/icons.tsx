import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 22, strokeWidth = 1.5, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

const make = (paths: React.ReactNode, defaults?: Partial<IconProps>) =>
  function I(p: IconProps) {
    return <Icon {...defaults} {...p}>{paths}</Icon>;
  };

export const ArrowRight = make(<path d="M5 12h14M13 6l6 6-6 6" />, { size: 18, strokeWidth: 1.6 });
export const ArrowLeft = make(<path d="M19 12H5M11 6l-6 6 6 6" />, { size: 18, strokeWidth: 1.6 });
export const Check = make(<path d="M5 12.5l4.5 4.5L19 7.5" />, { size: 16, strokeWidth: 2 });
export const Menu = make(<path d="M4 8h16M4 16h16" />, { size: 20, strokeWidth: 1.6 });
export const Close = make(<path d="M6 6l12 12M18 6L6 18" />, { size: 20, strokeWidth: 1.6 });
export const Plus = make(<path d="M12 5v14M5 12h14" />, { size: 20 });
export const Rings = make(<><circle cx="9" cy="14" r="5.5" /><circle cx="15" cy="14" r="5.5" /><path d="M10 4h4l-2 3z" /></>);
export const Briefcase = make(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12h18" /></>);
export const Glass = make(<><path d="M7 3h10l-1 7a4 4 0 0 1-8 0z" /><path d="M12 14v7M8 21h8" /></>);
export const Cake = make(<><path d="M4 21V12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9M2 21h20M4 15c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 4 0" /><path d="M12 10V6" /></>);
export const Sparkle = make(<><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" /><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></>);
export const Calendar = make(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>);
export const Wallet = make(<><path d="M3 7a2 2 0 0 1 2-2h12v4" /><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 13.5h2" /></>);
export const ListCheck = make(<><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" /></>);
export const Radio = make(<><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5" /></>);
export const Shield = make(<><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>);
export const User = make(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>);
export const Star = make(<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />);
export const Pin = make(<><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>);
export const Mail = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>);
export const Phone = make(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />);
export const Clock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const Play = make(<path d="M8 5v14l11-7z" />, { size: 16, strokeWidth: 2 });
export const Pause = make(<path d="M8 5v14M16 5v14" />, { size: 16, strokeWidth: 2 });

/** The EP monogram: italic E and gold P overlapping inside a fine double ring. */
export function Monogram({ size = 46, ring = "currentColor", e = "currentColor", p = "#b8925a" }: { size?: number; ring?: string; e?: string; p?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" stroke={ring} strokeWidth="0.9" />
      <circle cx="24" cy="24" r="19.5" stroke={ring} strokeWidth="0.4" opacity="0.5" />
      <text x="12.5" y="31" fontFamily="var(--font-playfair), Georgia, serif" fontStyle="italic" fontSize="23" fill={e}>E</text>
      <text x="21.5" y="34" fontFamily="var(--font-playfair), Georgia, serif" fontStyle="italic" fontSize="23" fill={p}>P</text>
    </svg>
  );
}
