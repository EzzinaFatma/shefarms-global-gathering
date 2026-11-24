export interface FarmTask {
  id: string;
  title: string;
  category: "planting" | "irrigation" | "harvesting" | "maintenance";
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
  assignee: string;
  dueDate: string;
  field: string;
  notes: string;
}

export interface CalendarActivity {
  id: string;
  title: string;
  type: "planting" | "irrigation" | "harvest" | "fertilization";
  date: string; // YYYY-MM-DD
  team: string;
  plot: string;
}

export interface SoilReading {
  id: string;
  date: string;
  plot: string;
  source: "manual" | "sensor";
  ph: number;
  humidity: number;
  temperature: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: "revenue" | "expense";
  amountTnd: number;
}

export interface MobilityJourney {
  id: string;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  vehicle: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  seatsTotal: number;
  seatsAvailable: number;
  priceTnd: number;
  status: "upcoming" | "completed";
}

export interface MobilityRequest {
  id: string;
  journeyId: string;
  farmerName: string;
  farmerPhone: string;
  seatsRequested: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export const INITIAL_TASKS: FarmTask[] = [
  {
    id: "t-1",
    title: "Drip irrigation pressure check — Olive Grove North",
    category: "irrigation",
    priority: "high",
    status: "in-progress",
    assignee: "Amina Ben Salem",
    dueDate: "2026-11-26",
    field: "Plot A — Béja",
    notes: "Inspect lateral valves before morning irrigation cycle.",
  },
  {
    id: "t-2",
    title: "Winter durum wheat sowing preparation",
    category: "planting",
    priority: "high",
    status: "pending",
    assignee: "Sonia Trabelsi",
    dueDate: "2026-11-28",
    field: "Plot B — Siliana",
    notes: "Verify seedbed moisture after recent rainfall.",
  },
  {
    id: "t-3",
    title: "Early Chetoui olive harvest sorting",
    category: "harvesting",
    priority: "medium",
    status: "completed",
    assignee: "Mbarka Khelifi",
    dueDate: "2026-11-22",
    field: "Plot A — Béja",
    notes: "Cold-press batch delivered to local cooperative mill.",
  },
  {
    id: "t-4",
    title: "Calibrate soil moisture probe S-03",
    category: "maintenance",
    priority: "low",
    status: "pending",
    assignee: "Ines Mansouri",
    dueDate: "2026-11-30",
    field: "Greenhouse 1 — Nabeul",
    notes: "Battery at 24%, replace solar cell connector.",
  },
];

export const INITIAL_CALENDAR: CalendarActivity[] = [
  { id: "c-1", title: "Olive Grove Drip Irrigation", type: "irrigation", date: "2026-11-25", team: "Amina & Salma", plot: "Plot A" },
  { id: "c-2", title: "Organic Compost Spreading", type: "fertilization", date: "2026-11-26", team: "Cooperative Group 2", plot: "Plot B" },
  { id: "c-3", title: "Durum Wheat Seeding", type: "planting", date: "2026-11-28", team: "Sonia & Nadia", plot: "Plot B" },
  { id: "c-4", title: "Citrus Early Harvest", type: "harvest", date: "2026-11-29", team: "Nabeul Women Collective", plot: "Plot C" },
];

export const INITIAL_SOIL_READINGS: SoilReading[] = [
  { id: "s-1", date: "2026-09-15", plot: "Plot A — Olive Grove", source: "sensor", ph: 7.4, humidity: 42, temperature: 27, nitrogen: 34, phosphorus: 22, potassium: 145, organicMatter: 2.1 },
  { id: "s-2", date: "2026-10-01", plot: "Plot A — Olive Grove", source: "manual", ph: 7.2, humidity: 48, temperature: 24, nitrogen: 39, phosphorus: 25, potassium: 158, organicMatter: 2.4 },
  { id: "s-3", date: "2026-10-20", plot: "Plot B — Wheat Field", source: "sensor", ph: 6.9, humidity: 56, temperature: 21, nitrogen: 44, phosphorus: 28, potassium: 170, organicMatter: 2.8 },
  { id: "s-4", date: "2026-11-15", plot: "Plot A — Olive Grove", source: "sensor", ph: 6.8, humidity: 61, temperature: 19, nitrogen: 47, phosphorus: 31, potassium: 182, organicMatter: 3.1 },
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  { id: "f-1", date: "2026-11-20", description: "Extra-virgin olive oil cooperative sale (320 L)", category: "Crop Sales", type: "revenue", amountTnd: 7680 },
  { id: "f-2", date: "2026-11-18", description: "Organic compost & natural mulch", category: "Inputs & Seeds", type: "expense", amountTnd: 1150 },
  { id: "f-3", date: "2026-11-14", description: "Cap Bon greenhouse tomatoes wholesale", category: "Crop Sales", type: "revenue", amountTnd: 3420 },
  { id: "f-4", date: "2026-11-10", description: "Drip irrigation tubing & pressure filters", category: "Equipment", type: "expense", amountTnd: 940 },
  { id: "f-5", date: "2026-11-05", description: "Shared rural transport subsidy", category: "Logistics", type: "expense", amountTnd: 380 },
];

export const INITIAL_JOURNEYS: MobilityJourney[] = [
  {
    id: "j-1",
    driverName: "Miled Ben Amor",
    driverPhone: "+216 22 418 905",
    driverRating: 4.9,
    vehicle: "Isuzu D-Max Covered Cabin (6 seats)",
    departure: "Béja Center — Cooperative Square",
    destination: "Testour Olive Fields (Zone North)",
    date: "2026-11-26",
    time: "06:15",
    seatsTotal: 6,
    seatsAvailable: 3,
    priceTnd: 4,
    status: "upcoming",
  },
  {
    id: "j-2",
    driverName: "Hedi Gharbi",
    driverPhone: "+216 55 803 214",
    driverRating: 4.8,
    vehicle: "Peugeot Partner Minibus (7 seats)",
    departure: "Nabeul Station",
    destination: "Korba Citrus & Vegetable Farms",
    date: "2026-11-26",
    time: "06:45",
    seatsTotal: 7,
    seatsAvailable: 4,
    priceTnd: 3.5,
    status: "upcoming",
  },
  {
    id: "j-3",
    driverName: "Nabil Jaziri",
    driverPhone: "+216 98 312 440",
    driverRating: 4.7,
    vehicle: "Toyota Hilux Crew Van (5 seats)",
    departure: "Siliana Market",
    destination: "Bargou Highland Orchards",
    date: "2026-11-27",
    time: "07:00",
    seatsTotal: 5,
    seatsAvailable: 2,
    priceTnd: 5,
    status: "upcoming",
  },
];

export const INITIAL_REQUESTS: MobilityRequest[] = [
  {
    id: "r-1",
    journeyId: "j-1",
    farmerName: "Mbarka Khelifi",
    farmerPhone: "+216 24 710 331",
    seatsRequested: 1,
    status: "confirmed",
    createdAt: "2026-11-24 18:20",
  },
  {
    id: "r-2",
    journeyId: "j-2",
    farmerName: "Mahbouba Ayari",
    farmerPhone: "+216 29 551 092",
    seatsRequested: 2,
    status: "pending",
    createdAt: "2026-11-24 19:05",
  },
];

export function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage quota errors
  }
}