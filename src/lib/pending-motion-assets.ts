export type PendingMotionAsset = {
  cardNames: string[];
  uploadedFile: string;
  storageObject: string;
  status: 'pending_upload';
};

/**
 * Uploaded card animations waiting for permanent ingestion into the public
 * Supabase `brand-graphics/motion` bucket. Do not point live cards at temporary
 * Adobe, Canva, Drive, or chat attachment URLs.
 */
export const pendingMotionAssets: PendingMotionAsset[] = [
  { cardNames: ['Rose on Piedmont'], uploadedFile: 'ROSE ON PIEDMONT.mp4', storageObject: 'motion/rose-on-piedmont-new.mp4', status: 'pending_upload' },
  { cardNames: ['GROWN-ISH', 'Grown-Ish'], uploadedFile: 'GROWNISH ANI.mp4', storageObject: 'motion/grownish-new.mp4', status: 'pending_upload' },
  { cardNames: ['Courses', 'Consultations', 'Dr. Dorsey Consultations'], uploadedFile: 'DORSEY CONSULT ANI.mp4', storageObject: 'motion/dorsey-consult-ani.mp4', status: 'pending_upload' },
  { cardNames: ['The Kollective', 'The Kollective ENT.', 'Dorsey / Kollective'], uploadedFile: 'KOLLECTIVE LOGOS ANI.mp4', storageObject: 'motion/kollective-logos-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Casper Group', 'The Casper Group'], uploadedFile: 'CASPER GROUP ANI.mp4', storageObject: 'motion/casper-group-new.mp4', status: 'pending_upload' },
  { cardNames: ['Reset Therapy'], uploadedFile: 'RESET ANI.mp4', storageObject: 'motion/reset-therapy-ani.mp4', status: 'pending_upload' },
  { cardNames: ["Playmaker's Sports Association", 'Playmakers Sports Association', 'PSA'], uploadedFile: 'PSA ANI.mp4', storageObject: 'motion/psa-ani.mp4', status: 'pending_upload' },
  { cardNames: ['On Call'], uploadedFile: 'ON CALL ANI .mp4', storageObject: 'motion/on-call-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Mission 365'], uploadedFile: 'MISSION 365 ANI.mp4', storageObject: 'motion/mission-365-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Luxe on Demand', 'LUXE ON DEMAND'], uploadedFile: 'LUXE ON DEMAND ANI.mp4', storageObject: 'motion/luxe-on-demand-ani.mp4', status: 'pending_upload' },
  { cardNames: ["The Gentleman's Club", 'The Gentlemans Club'], uploadedFile: "GENTLEMAN'S CLUB ANI.mp4", storageObject: 'motion/gentlemans-club-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Little Farmers of the Future'], uploadedFile: 'FARMERS ANI2.mp4', storageObject: 'motion/little-farmers-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Umbrella Accounting'], uploadedFile: 'UMBRELLA ACCOUNTING.mp4', storageObject: 'motion/umbrella-accounting-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Umbrella Automation'], uploadedFile: 'UMBRELLA AUTOMATION.mp4', storageObject: 'motion/umbrella-automation-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Umbrella Clean Services', 'Umbrella Clean'], uploadedFile: 'UMBRELLA CLEAN.mp4', storageObject: 'motion/umbrella-clean-ani.mp4', status: 'pending_upload' },
  { cardNames: ["The People's Department", 'The Peoples Department'], uploadedFile: 'UMBRELLA PEOPLE.mp4', storageObject: 'motion/umbrella-people-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Umbrella Realty Group', 'Umbrella Realty'], uploadedFile: 'UMBRELLA REALTY.mp4', storageObject: 'motion/umbrella-realty-ani.mp4', status: 'pending_upload' },
  { cardNames: ['The Mind Studio', 'Umbrella Mind'], uploadedFile: 'UMBRELLA MIND.mp4', storageObject: 'motion/umbrella-mind-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Umbrella Injury Network', 'Umbrella Injury'], uploadedFile: 'UMBRELLA INJURY.mp4', storageObject: 'motion/umbrella-injury-ani.mp4', status: 'pending_upload' },
  { cardNames: ['Umbrella Auto Exchange', 'Umbrella Auto'], uploadedFile: 'UMBRELLA AUTO.mp4', storageObject: 'motion/umbrella-auto-ani.mp4', status: 'pending_upload' },
  { cardNames: ['The Inner Circle'], uploadedFile: 'INNER ANI.mp4', storageObject: 'motion/inner-circle-ani.mp4', status: 'pending_upload' },
];

export const pendingMotionByCardName = new Map(
  pendingMotionAssets.flatMap((asset) => asset.cardNames.map((name) => [name.toLowerCase(), asset] as const)),
);
