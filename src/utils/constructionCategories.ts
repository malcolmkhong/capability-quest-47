
// Construction categories with subcategories
export interface CategoryOption {
  label: string;
  value: string;
  subcategories: SubcategoryOption[];
}

export interface SubcategoryOption {
  label: string;
  value: string;
}

export const constructionCategories: CategoryOption[] = [
  {
    label: "M&E (Mechanical & Electrical)",
    value: "me",
    subcategories: [
      { label: "Electrical Wiring", value: "electrical_wiring" },
      { label: "Lighting", value: "lighting" },
      { label: "Air Conditioning", value: "air_conditioning" },
      { label: "Plumbing", value: "plumbing" },
      { label: "Fire Protection", value: "fire_protection" },
    ]
  },
  {
    label: "Flooring",
    value: "flooring",
    subcategories: [
      { label: "Tile Installation", value: "tile" },
      { label: "Timber Flooring", value: "timber" },
      { label: "Vinyl", value: "vinyl" },
      { label: "Concrete Finishing", value: "concrete" },
      { label: "Carpet", value: "carpet" },
    ]
  },
  {
    label: "Painting",
    value: "painting",
    subcategories: [
      { label: "Interior Walls", value: "interior_walls" },
      { label: "Exterior Walls", value: "exterior_walls" },
      { label: "Ceiling", value: "ceiling" },
      { label: "Doors & Windows", value: "doors_windows" },
      { label: "Protective Coating", value: "protective_coating" },
    ]
  },
  {
    label: "Carpentry",
    value: "carpentry",
    subcategories: [
      { label: "Custom Cabinetry", value: "cabinetry" },
      { label: "Door Installation", value: "doors" },
      { label: "Window Frames", value: "windows" },
      { label: "Wooden Partitions", value: "partitions" },
      { label: "Trim & Molding", value: "trim" },
    ]
  },
  {
    label: "Masonry",
    value: "masonry",
    subcategories: [
      { label: "Brick Laying", value: "brick" },
      { label: "Stone Work", value: "stone" },
      { label: "Concrete Blocks", value: "concrete_blocks" },
      { label: "Plastering", value: "plastering" },
      { label: "Tiling", value: "tiling" },
    ]
  },
  {
    label: "Roofing",
    value: "roofing",
    subcategories: [
      { label: "Tile Roofing", value: "tile_roofing" },
      { label: "Metal Roofing", value: "metal_roofing" },
      { label: "Waterproofing", value: "waterproofing" },
      { label: "Gutters", value: "gutters" },
      { label: "Insulation", value: "insulation" },
    ]
  },
  {
    label: "Foundation",
    value: "foundation",
    subcategories: [
      { label: "Excavation", value: "excavation" },
      { label: "Concrete Foundation", value: "concrete_foundation" },
      { label: "Piling", value: "piling" },
      { label: "Retaining Walls", value: "retaining_walls" },
      { label: "Waterproofing", value: "foundation_waterproofing" },
    ]
  },
  {
    label: "Other",
    value: "other",
    subcategories: [
      { label: "Landscaping", value: "landscaping" },
      { label: "Demolition", value: "demolition" },
      { label: "Cleaning", value: "cleaning" },
      { label: "Waste Removal", value: "waste_removal" },
      { label: "Miscellaneous", value: "misc" },
    ]
  }
];

// Construction-specific units
export const constructionUnits = [
  { label: "sq.ft", value: "sq.ft" },
  { label: "sq.m", value: "sq.m" },
  { label: "unit", value: "unit" },
  { label: "lot", value: "lot" },
  { label: "set", value: "set" },
  { label: "m", value: "m" },
  { label: "cm", value: "cm" },
  { label: "kg", value: "kg" },
  { label: "ton", value: "ton" },
  { label: "hours", value: "hours" },
  { label: "days", value: "days" },
];
