// Snapshot of a freshly created driveway, written by useBecomeHost before the
// Stripe redirect and read back by the Onboard Complete page.

export interface NewDrivewaySummary {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  price: string;
  walk: string;
  imageCount: number;
  createdAt: string;
}

const STORAGE_KEY = "parkli:newDriveway";

export function saveNewDriveway(summary: NewDrivewaySummary) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(summary));
}

export function loadNewDriveway(): NewDrivewaySummary | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as NewDrivewaySummary;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearNewDriveway() {
  localStorage.removeItem(STORAGE_KEY);
}
