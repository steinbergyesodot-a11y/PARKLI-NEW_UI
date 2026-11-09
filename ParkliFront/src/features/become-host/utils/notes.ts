export interface NoteOption {
  id: string;
  category: 'vehicle_size' | 'access_entry' | 'parking_rules' | 'event_logistics' | 'amenities';
  label: string; // Display title for checkboxes/toggles
  type: 'toggle' | 'custom_prompt'; // Toggle for standard features vs templates needing host input
  defaultNoteText: string; // Pre-written host note text inserted into listing
  promptPlaceholder?: string; // Guidance placeholder if custom entry is needed
}

export const PARKLI_DRIVEWAY_NOTE_OPTIONS: NoteOption[] = [
  // --- VEHICLE SIZE & CLEARANCE ---
  {
    id: "size-standard-only",
    category: "vehicle_size",
    label: "Standard/Compact Cars Only",
    type: "toggle",
    defaultNoteText: "Suitable for compact cars, sedans, and small crossover SUVs only. Oversized trucks or 3-row SUVs will overhang the sidewalk."
  },
  {
    id: "size-low-clearance",
    category: "vehicle_size",
    label: "Low Overhead Clearance",
    type: "toggle",
    defaultNoteText: "Low-hanging tree branches/carport overhead. Vehicles over 6.5 ft tall (roof racks, large vans) should not book this spot."
  },
  {
    id: "size-steep-driveway",
    category: "vehicle_size",
    label: "Steep Driveway Angle",
    type: "toggle",
    defaultNoteText: "The driveway entrance has a steep incline. Sports cars with low ground clearance should enter at an angle to avoid scraping."
  },

  // --- ACCESS & ENTRY ---
  {
    id: "access-open-entry",
    category: "access_entry",
    label: "Easy Open Entry (No Gate)",
    type: "toggle",
    defaultNoteText: "Open driveway access directly from the main road. No gate code or check-in required—just pull right into the designated spot."
  },
  {
    id: "access-gate-code",
    category: "access_entry",
    label: "Gated Access (Code Provided)",
    type: "custom_prompt",
    defaultNoteText: "Security gate access required. Use the keypad code provided in your booking confirmation upon arrival.",
    promptPlaceholder: "e.g., Keypad code is #4821. Gate opens inward automatically."
  },
  {
    id: "access-narrow-alley",
    category: "access_entry",
    label: "Alleyway / Rear Entry",
    type: "toggle",
    defaultNoteText: "Access to this spot is via the back alley behind the house, not the main street front entrance."
  },

  // --- PARKING RULES & POSITIONING ---
  {
    id: "rule-park-left",
    category: "parking_rules",
    label: "Park on Left Side Only",
    type: "toggle",
    defaultNoteText: "Please park strictly on the LEFT side of the driveway to leave room for the household vehicle on the right."
  },
  {
    id: "rule-tandem-parking",
    category: "parking_rules",
    label: "Tandem Parking (Head-In)",
    type: "toggle",
    defaultNoteText: "This is a tandem spot. Pull all the way forward toward the garage door so a second vehicle can park behind you if needed."
  },
  {
    id: "rule-do-not-block-garage",
    category: "parking_rules",
    label: "Do Not Block Garage Door",
    type: "toggle",
    defaultNoteText: "Keep at least 3 feet of clearance from the main garage door so residents can walk in and out."
  },

  // --- EVENT & STADIUM LOGISTICS ---
  {
    id: "event-road-closure",
    category: "event_logistics",
    label: "Game-Day Road Closures",
    type: "custom_prompt",
    defaultNoteText: "Local traffic police close surrounding streets near kickoff. Recommended arrival route details provided upon selection.",
    promptPlaceholder: "e.g., Main street closes 2 hours before the game. Arrive via 4th Ave instead."
  },
  {
    id: "event-stadium-shortcut",
    category: "event_logistics",
    label: "Pedestrian Stadium Shortcut",
    type: "custom_prompt",
    defaultNoteText: "There is a direct walking shortcut to the stadium near this property.",
    promptPlaceholder: "e.g., Take the paved alleyway at the end of the block to reach Gate 2 in 5 minutes."
  },
  {
    id: "event-postgame-stay",
    category: "event_logistics",
    label: "Flexible Post-Game Departure",
    type: "toggle",
    defaultNoteText: "Feel free to leave your car parked up to 1 hour after the game ends to avoid main exit traffic gridlock."
  },

  // --- AMENITIES & EXTRAS ---
  {
    id: "amenity-camera",
    category: "amenities",
    label: "24/7 Security Camera Coverage",
    type: "toggle",
    defaultNoteText: "Driveway is actively monitored by 24/7 security cameras for peace of mind."
  },
  {
    id: "amenity-ev-charging",
    category: "amenities",
    label: "EV Charger Access Available",
    type: "custom_prompt",
    defaultNoteText: "Level 2 EV charging outlet available at this spot.",
    promptPlaceholder: "e.g., NEMA 14-50 plug available. Please bring your own charging cable."
  }
];