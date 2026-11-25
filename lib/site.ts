/** Business details. Replace every [BRACKETED] value before launch. */
export const site = {
  name: "Events by Pendie",
  tagline: "Full-service event planning. We plan, budget, book and run every detail, so you can simply arrive.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://eventsbypendie.com",
  email: "[EMAIL ADDRESS]",
  emailHref: "mailto:hello@example.com",
  phone: "[PHONE NUMBER]",
  phoneHref: "tel:+10000000000",
  serviceArea: "[SERVICE AREA]",
  replyTime: "[24 hours]",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
] as const;
