export const eventCategories = ["All", "Weddings", "Corporate", "Celebrations"] as const;
export type EventCategory = Exclude<(typeof eventCategories)[number], "All">;

export interface RunOfShowItem {
  time: string;
  title: string;
  detail: string;
}

export interface BudgetLine {
  label: string;
  percent: number;
}

export interface EventCase {
  id: string;
  title: string;
  category: EventCategory;
  image: { src: string; alt: string };
  location: string;
  date: string;
  stats: Array<{ value: string; label: string }>;
  runOfShow: RunOfShowItem[];
  budget: BudgetLine[];
  brief: string;
  handled: string[];
}

/** Colours for budget segments: distinct in lightness, not just hue. */
export const budgetColors = ["#d4b07a", "#f7f4ef", "#7d8cb0", "#b9786a", "#b9ad98", "#4a5570"];

/**
 * SAMPLE CONTENT. These events, figures and timelines illustrate the format.
 * Replace with real past events (and real photography) before launch.
 * When the list grows, move it to a CMS (Sanity, Payload) and keep this shape.
 */
export const events: EventCase[] = [
  {
    id: "garden-wedding",
    title: "Golden Hour Garden Wedding",
    category: "Weddings",
    image: { src: "/images/wedding.jpg", alt: "An outdoor wedding reception at dusk with a long candlelit table, string lights and a floral arch" },
    location: "[Venue], [City]",
    date: "[Month Year]",
    stats: [
      { value: "180", label: "Guests" },
      { value: "14", label: "Vendors" },
      { value: "40", label: "Weeks planned" },
      { value: "2", label: "Days on site" },
    ],
    runOfShow: [
      { time: "2:00 PM", title: "Vendor load-in", detail: "Florals, lighting and rentals arrive" },
      { time: "4:30 PM", title: "Guest arrival", detail: "Welcome drinks on the lawn" },
      { time: "5:00 PM", title: "Ceremony", detail: "Beneath the floral arch" },
      { time: "6:15 PM", title: "Dinner", detail: "Long tables under string lights" },
      { time: "8:00 PM", title: "First dance", detail: "Band, then DJ" },
      { time: "11:00 PM", title: "Send-off", detail: "Sparkler exit to the shuttles" },
    ],
    budget: [
      { label: "Venue & catering", percent: 41 },
      { label: "Décor & florals", percent: 22 },
      { label: "Entertainment", percent: 12 },
      { label: "Photo & film", percent: 11 },
      { label: "Attire & beauty", percent: 8 },
      { label: "Transport", percent: 6 },
    ],
    brief:
      "An outdoor dusk wedding for 180 guests, designed around a single long banquet table, a floral arch and hundreds of warm string lights, with a full rain plan held in reserve.",
    handled: ["Venue search", "Vendor contracts", "RSVPs & seating", "Guest shuttles", "Rain plan", "Day-of coordination"],
  },
  {
    id: "partners-gala",
    title: "Annual Partners Gala",
    category: "Corporate",
    image: { src: "/images/gala.jpg", alt: "A ballroom gala with a stage, screens, uplighting and dressed round tables" },
    location: "[Hotel Ballroom], [City]",
    date: "[Month Year]",
    stats: [
      { value: "420", label: "Guests" },
      { value: "22", label: "Vendors" },
      { value: "24", label: "Weeks planned" },
      { value: "6", label: "Hour show" },
    ],
    runOfShow: [
      { time: "3:00 PM", title: "Technical rehearsal", detail: "Stage, screens and lighting" },
      { time: "6:00 PM", title: "Arrivals", detail: "Red carpet and photo wall" },
      { time: "7:00 PM", title: "Welcome & keynote", detail: "CEO address" },
      { time: "7:45 PM", title: "Dinner service", detail: "Three courses for 42 tables" },
      { time: "9:00 PM", title: "Awards", detail: "Partner recognition" },
      { time: "10:00 PM", title: "Live band", detail: "Dancing until midnight" },
    ],
    budget: [
      { label: "Venue & F&B", percent: 46 },
      { label: "Production & AV", percent: 24 },
      { label: "Décor", percent: 12 },
      { label: "Talent", percent: 10 },
      { label: "Guest experience", percent: 8 },
    ],
    brief:
      "A black-tie partner evening with a full stage production, scripted awards and seamless service for 420 guests, reported line by line against an approved corporate budget.",
    handled: ["Venue & catering", "Stage & AV", "Show scripts", "VIP & speaker care", "Registration", "Budget reporting"],
  },
  {
    id: "skyline-weekend",
    title: "Skyline Bachelor Weekend",
    category: "Celebrations",
    image: { src: "/images/rooftop.jpg", alt: "A rooftop lounge at night overlooking a city skyline, with a fire pit and bar" },
    location: "[City]",
    date: "[Month Year]",
    stats: [
      { value: "16", label: "Guests" },
      { value: "9", label: "Vendors" },
      { value: "8", label: "Weeks planned" },
      { value: "3", label: "Days" },
    ],
    runOfShow: [
      { time: "Fri 4 PM", title: "Check-in", detail: "Welcome bags in every room" },
      { time: "Fri 9 PM", title: "Rooftop lounge", detail: "Private terrace and bar" },
      { time: "Sat 11 AM", title: "Boat day", detail: "Chartered cruise with lunch" },
      { time: "Sat 8 PM", title: "Chef’s table", detail: "Tasting menu for the group" },
      { time: "Sun 11 AM", title: "Recovery brunch", detail: "Late check-out arranged" },
    ],
    budget: [
      { label: "Accommodation", percent: 35 },
      { label: "Experiences", percent: 25 },
      { label: "Dining", percent: 20 },
      { label: "Transport", percent: 12 },
      { label: "Extras", percent: 8 },
    ],
    brief:
      "Three days, sixteen friends and zero group-chat chaos: a fully booked itinerary with split payments, private transport and one very well-kept surprise for the groom.",
    handled: ["Group booking", "Split payments", "Itinerary", "Reservations", "Private transport", "The surprise"],
  },
  {
    id: "leadership-summit",
    title: "Leadership Summit",
    category: "Corporate",
    image: { src: "/images/summit.jpg", alt: "A conference stage with an LED wall, podium and audience" },
    location: "[Conference Centre], [City]",
    date: "[Month Year]",
    stats: [
      { value: "650", label: "Attendees" },
      { value: "18", label: "Vendors" },
      { value: "32", label: "Weeks planned" },
      { value: "2", label: "Days" },
    ],
    runOfShow: [
      { time: "Day 1 · 8:00", title: "Registration", detail: "Badges and breakfast" },
      { time: "Day 1 · 9:00", title: "Opening keynote", detail: "Main stage, live-streamed" },
      { time: "Day 1 · 11:00", title: "Breakouts", detail: "Six concurrent tracks" },
      { time: "Day 1 · 18:30", title: "Evening reception", detail: "Networking and dinner" },
      { time: "Day 2 · 9:00", title: "Panels", detail: "Leadership in practice" },
      { time: "Day 2 · 16:00", title: "Close", detail: "Wrap-up and departures" },
    ],
    budget: [
      { label: "Venue", percent: 30 },
      { label: "Production & streaming", percent: 28 },
      { label: "Catering", percent: 22 },
      { label: "Travel & lodging", percent: 12 },
      { label: "Materials", percent: 8 },
    ],
    brief:
      "A two-day leadership conference for 650 attendees across six tracks, with speaker management, room blocks, live streaming and a full post-event report.",
    handled: ["Venue & room blocks", "Speaker management", "Registration", "Stage & streaming", "Attendee travel", "Post-event report"],
  },
  {
    id: "candlelit-50th",
    title: "50th Birthday Candlelit Dinner",
    category: "Celebrations",
    image: { src: "/images/dinner.jpg", alt: "A candlelit private dinner with candelabras, florals and arched windows" },
    location: "[Private Venue], [City]",
    date: "[Month Year]",
    stats: [
      { value: "40", label: "Guests" },
      { value: "8", label: "Vendors" },
      { value: "10", label: "Weeks planned" },
      { value: "1", label: "Evening" },
    ],
    runOfShow: [
      { time: "6:30 PM", title: "Champagne reception", detail: "Under the arched windows" },
      { time: "7:15 PM", title: "Seated dinner", detail: "Four courses with pairings" },
      { time: "8:30 PM", title: "Toasts", detail: "Tribute film premiere" },
      { time: "9:00 PM", title: "Cake & dessert", detail: "Custom three-tier cake" },
      { time: "9:30 PM", title: "Jazz trio", detail: "Late-night lounge" },
    ],
    budget: [
      { label: "Venue & dining", percent: 45 },
      { label: "Décor & florals", percent: 20 },
      { label: "Entertainment", percent: 15 },
      { label: "Film & photo", percent: 12 },
      { label: "Favors", percent: 8 },
    ],
    brief:
      "An intimate milestone dinner for forty, styled with candelabras and deep florals, featuring a tribute film assembled from family archives and a surprise jazz trio.",
    handled: ["Private venue", "Menu & wine", "Tribute film", "Florals & candles", "Invitations"],
  },
  {
    id: "garden-shower",
    title: "Bridal Shower Garden Brunch",
    category: "Weddings",
    image: { src: "/images/garden.jpg", alt: "A sailcloth tent in a garden with a long brunch table and florals" },
    location: "[Garden Estate], [City]",
    date: "[Month Year]",
    stats: [
      { value: "60", label: "Guests" },
      { value: "7", label: "Vendors" },
      { value: "6", label: "Weeks planned" },
      { value: "4", label: "Hours" },
    ],
    runOfShow: [
      { time: "11:00 AM", title: "Welcome", detail: "Mimosa bar in the garden" },
      { time: "11:30 AM", title: "Brunch", detail: "Family-style under the tent" },
      { time: "12:30 PM", title: "Gifts & games", detail: "Hosted by the bridal party" },
      { time: "1:30 PM", title: "Floral workshop", detail: "Guests build mini bouquets" },
      { time: "2:30 PM", title: "Farewell", detail: "Personalised favors" },
    ],
    budget: [
      { label: "Venue & tent", percent: 32 },
      { label: "Catering", percent: 30 },
      { label: "Florals", percent: 18 },
      { label: "Rentals", percent: 12 },
      { label: "Favors", percent: 8 },
    ],
    brief:
      "A light-filled garden brunch under a sailcloth tent for sixty guests, with a hands-on floral workshop and every rental, menu and favor coordinated end to end.",
    handled: ["Venue & tent", "Catering", "Florals", "Rentals", "Workshop host", "Favors"],
  },
];

export const getEvent = (id: string) => events.find((e) => e.id === id);
