
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
      { label: "Solar Panels", value: "solar_panels" },
      { label: "Security Systems", value: "security_systems" },
      { label: "Home Automation", value: "home_automation" },
      { label: "Ventilation", value: "ventilation" },
      { label: "Generators", value: "generators" },
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
      { label: "Marble", value: "marble" },
      { label: "Terrazzo", value: "terrazzo" },
      { label: "Epoxy", value: "epoxy" },
      { label: "Laminate", value: "laminate" },
      { label: "Bamboo", value: "bamboo" },
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
      { label: "Texture Finishing", value: "texture_finishing" },
      { label: "Anti-Fungal Treatment", value: "anti_fungal" },
      { label: "Staining", value: "staining" },
      { label: "Waterproofing Paint", value: "waterproof_paint" },
      { label: "Decorative Paint", value: "decorative_paint" },
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
      { label: "Shelving", value: "shelving" },
      { label: "Wardrobes", value: "wardrobes" },
      { label: "Wooden Flooring", value: "wooden_flooring" },
      { label: "Wooden Ceiling", value: "wooden_ceiling" },
      { label: "Built-in Furniture", value: "built_in_furniture" },
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
      { label: "Clay Brick", value: "clay_brick" },
      { label: "Granite Work", value: "granite" },
      { label: "Marble Work", value: "marble_work" },
      { label: "Paver Installation", value: "pavers" },
      { label: "Render Finishing", value: "render" },
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
      { label: "Asphalt Shingles", value: "asphalt_shingles" },
      { label: "Flashing", value: "flashing" },
      { label: "Skylights", value: "skylights" },
      { label: "Solar Roof Integration", value: "solar_roof" },
      { label: "Green Roofing", value: "green_roof" },
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
      { label: "Underpinning", value: "underpinning" },
      { label: "Footing", value: "footing" },
      { label: "Foundation Repair", value: "foundation_repair" },
      { label: "Gravel Beds", value: "gravel_beds" },
      { label: "Drainage Systems", value: "drainage_systems" },
    ]
  },
  {
    label: "Wall & Ceiling",
    value: "wall_ceiling",
    subcategories: [
      { label: "Drywall Installation", value: "drywall" },
      { label: "Ceiling Installation", value: "ceiling_install" },
      { label: "Wall Paneling", value: "wall_panel" },
      { label: "Acoustic Treatment", value: "acoustic" },
      { label: "Insulation", value: "wall_insulation" },
      { label: "Partition Walls", value: "partition_walls" },
      { label: "Suspended Ceiling", value: "suspended_ceiling" },
      { label: "Cornice Work", value: "cornice" },
      { label: "Decorative Molding", value: "decorative_molding" },
      { label: "Textured Finishing", value: "textured_finish" },
    ]
  },
  {
    label: "Glass & Aluminum",
    value: "glass_aluminum",
    subcategories: [
      { label: "Window Installation", value: "window_install" },
      { label: "Glass Doors", value: "glass_doors" },
      { label: "Curtain Walls", value: "curtain_walls" },
      { label: "Shower Screens", value: "shower_screens" },
      { label: "Mirrors", value: "mirrors" },
      { label: "Aluminum Fabrication", value: "aluminum_fab" },
      { label: "Skylights", value: "glass_skylights" },
      { label: "Glass Railing", value: "glass_railing" },
      { label: "Storefronts", value: "storefronts" },
      { label: "Glass Partitions", value: "glass_partitions" },
    ]
  },
  {
    label: "Landscaping",
    value: "landscaping",
    subcategories: [
      { label: "Garden Design", value: "garden_design" },
      { label: "Irrigation Systems", value: "irrigation" },
      { label: "Lawn Installation", value: "lawn" },
      { label: "Hardscaping", value: "hardscaping" },
      { label: "Plant Installation", value: "plants" },
      { label: "Outdoor Lighting", value: "outdoor_lighting" },
      { label: "Water Features", value: "water_features" },
      { label: "Retaining Walls", value: "landscape_walls" },
      { label: "Decking", value: "decking" },
      { label: "Fencing", value: "fencing" },
    ]
  },
  {
    label: "Finishing Materials",
    value: "finishing",
    subcategories: [
      { label: "Wallpaper", value: "wallpaper" },
      { label: "Interior Trim", value: "interior_trim" },
      { label: "Countertops", value: "countertops" },
      { label: "Backsplash", value: "backsplash" },
      { label: "Architectural Hardware", value: "arch_hardware" },
      { label: "Decorative Panels", value: "decorative_panels" },
      { label: "Window Treatments", value: "window_treatments" },
      { label: "Wall Cladding", value: "wall_cladding" },
      { label: "Veneer Finish", value: "veneer" },
      { label: "Specialty Coatings", value: "specialty_coatings" },
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
      { label: "Scaffolding", value: "scaffolding" },
      { label: "Site Preparation", value: "site_prep" },
      { label: "Construction Management", value: "construction_management" },
      { label: "Permits & Approvals", value: "permits" },
      { label: "Professional Services", value: "professional_services" },
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
  { label: "box", value: "box" },
  { label: "roll", value: "roll" },
  { label: "sheet", value: "sheet" },
  { label: "pack", value: "pack" },
  { label: "bundle", value: "bundle" },
  { label: "pallet", value: "pallet" },
  { label: "piece", value: "piece" },
  { label: "bag", value: "bag" },
  { label: "liter", value: "liter" },
];
