import { z } from "zod";

export const eventTypes = [
  "Wedding",
  "Corporate event",
  "Bachelor / bachelorette",
  "Birthday & milestone",
  "Shower & engagement",
  "Something else",
] as const;
export const budgetOptions = ["Under $10k", "$10k–$25k", "$25k–$50k", "$50k–$100k", "$100k+"] as const;
export const serviceOptions = [
  "Full planning",
  "Venue sourcing",
  "Vendor booking",
  "Budget management",
  "Day-of coordination",
  "Travel & stays",
] as const;
export const contactMethods = ["Phone call", "Email", "Text message"] as const;

/** Quick-start options on the home page; mapped into the form via ?type=&guests= */
export const quickTypes = ["Wedding", "Corporate", "Bachelor / ette", "Birthday", "Other"] as const;
export const quickGuests = ["Under 50", "50–150", "150–300", "300+"] as const;

export const quickTypeToEventType: Record<(typeof quickTypes)[number], (typeof eventTypes)[number]> = {
  Wedding: "Wedding",
  Corporate: "Corporate event",
  "Bachelor / ette": "Bachelor / bachelorette",
  Birthday: "Birthday & milestone",
  Other: "Something else",
};
export const quickGuestsToCount: Record<(typeof quickGuests)[number], number> = {
  "Under 50": 40,
  "50–150": 100,
  "150–300": 220,
  "300+": 400,
};

/** Shared by the client form (step checks) and the server action (source of truth). */
export const requestSchema = z.object({
  type: z.enum(eventTypes, { errorMap: () => ({ message: "Please choose the type of event." }) }),
  date: z.string().max(20).optional().or(z.literal("")),
  location: z.string().trim().max(160).optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1).max(5000),
  budget: z.enum(budgetOptions, { errorMap: () => ({ message: "Please pick a budget range." }) }),
  services: z.array(z.enum(serviceOptions)).min(1, "Please choose at least one service."),
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  method: z.enum(contactMethods).optional(),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  /** Honeypot: real visitors never see or fill this. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type RequestInput = z.infer<typeof requestSchema>;
export type RequestResult = { ok: true } | { ok: false; error: string };
