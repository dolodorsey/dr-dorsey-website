export const NIGHTLIFE = {
  opium: {
    name: "Opium ATL",
    chart: "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/app/nightlife/opium-table-chart.png",
    depositLabel: "50% non-refundable deposit",
    packages: [
      { id: "opium-575", total: 575, bottles: 1, guests: 8 },
      { id: "opium-800", total: 800, bottles: 2, guests: 10 },
      { id: "opium-1250", total: 1250, bottles: 3, guests: 10 },
      { id: "opium-1500", total: 1500, bottles: 4, guests: 15 },
      { id: "opium-1600", total: 1600, bottles: 4, guests: 15 },
      { id: "opium-1800", total: 1800, bottles: 5, guests: 15 },
      { id: "opium-2500", total: 2500, bottles: 7, guests: 15 },
    ],
  },
  revel: {
    name: "Revel",
    chart: "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/app/nightlife/revel-table-chart.png",
    depositLabel: "$350 non-refundable deposit",
    packages: [
      { id: "revel-1000", total: 1000, bottles: 3, guests: 8 },
      { id: "revel-1250", total: 1250, bottles: 3, guests: 10 },
      { id: "revel-1500", total: 1500, bottles: 4, guests: 12 },
      { id: "revel-1800", total: 1800, bottles: 5, guests: 12 },
      { id: "revel-2100", total: 2100, bottles: 6, guests: 15 },
    ],
  },
} as const;

export type NightlifeVenue = keyof typeof NIGHTLIFE;

export function findNightlifePackage(venue: string, packageId: string) {
  const config = NIGHTLIFE[venue as NightlifeVenue];
  return config?.packages.find((item) => item.id === packageId);
}
