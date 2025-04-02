// Material database with pricing information

export interface Material {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  unit: string;
  unitPrice: number;
  description?: string;
}

// Sample material database
const materialDatabase: Material[] = [
  // Concrete Works
  { id: "m001", name: "Grade 20 Concrete", category: "concrete", subcategory: "readyMix", unit: "m³", unitPrice: 280.00, description: "Ready-mixed concrete for general applications" },
  { id: "m002", name: "Grade 30 Concrete", category: "concrete", subcategory: "readyMix", unit: "m³", unitPrice: 320.00, description: "Higher strength concrete for structural elements" },
  { id: "m003", name: "Grade 35 Concrete", category: "concrete", subcategory: "readyMix", unit: "m³", unitPrice: 350.00, description: "High strength concrete for critical structural elements" },
  { id: "m004", name: "Steel Reinforcement (10mm)", category: "concrete", subcategory: "reinforcement", unit: "ton", unitPrice: 3500.00, description: "10mm diameter steel bars for concrete reinforcement" },
  { id: "m005", name: "Steel Reinforcement (12mm)", category: "concrete", subcategory: "reinforcement", unit: "ton", unitPrice: 3400.00, description: "12mm diameter steel bars for concrete reinforcement" },
  { id: "m006", name: "Steel Reinforcement (16mm)", category: "concrete", subcategory: "reinforcement", unit: "ton", unitPrice: 3300.00, description: "16mm diameter steel bars for concrete reinforcement" },
  
  // Additional Concrete Works
  { id: "m051", name: "Grade 40 Concrete", category: "concrete", subcategory: "readyMix", unit: "m³", unitPrice: 380.00, description: "Very high strength concrete for specialized structural elements" },
  { id: "m052", name: "Concrete Admixture", category: "concrete", subcategory: "additives", unit: "liter", unitPrice: 25.00, description: "Chemical additive to enhance concrete properties" },
  { id: "m053", name: "Steel Reinforcement (20mm)", category: "concrete", subcategory: "reinforcement", unit: "ton", unitPrice: 3200.00, description: "20mm diameter steel bars for heavy concrete reinforcement" },
  { id: "m054", name: "Steel Reinforcement (25mm)", category: "concrete", subcategory: "reinforcement", unit: "ton", unitPrice: 3100.00, description: "25mm diameter steel bars for heavy concrete reinforcement" },
  { id: "m055", name: "Steel Mesh (6mm)", category: "concrete", subcategory: "reinforcement", unit: "m²", unitPrice: 22.00, description: "6mm steel mesh for concrete slab reinforcement" },
  { id: "m056", name: "Steel Mesh (8mm)", category: "concrete", subcategory: "reinforcement", unit: "m²", unitPrice: 28.00, description: "8mm steel mesh for concrete slab reinforcement" },
  { id: "m057", name: "Concrete Spacers", category: "concrete", subcategory: "accessories", unit: "bag", unitPrice: 15.00, description: "Plastic spacers to maintain steel bar positioning in concrete" },
  { id: "m058", name: "Waterproof Concrete", category: "concrete", subcategory: "specialMix", unit: "m³", unitPrice: 420.00, description: "Waterproof concrete mix for water tanks and pools" },
  
  // Brickwork
  { id: "m007", name: "Clay Bricks", category: "masonry", subcategory: "bricks", unit: "pcs", unitPrice: 0.85, description: "Standard clay bricks for walls and partitions" },
  { id: "m008", name: "Cement Blocks (4\")", category: "masonry", subcategory: "blocks", unit: "pcs", unitPrice: 2.50, description: "4-inch cement blocks for non-load bearing walls" },
  { id: "m009", name: "Cement Blocks (6\")", category: "masonry", subcategory: "blocks", unit: "pcs", unitPrice: 3.80, description: "6-inch cement blocks for load bearing walls" },
  
  // Additional Masonry Materials
  { id: "m059", name: "AAC Blocks", category: "masonry", subcategory: "blocks", unit: "pcs", unitPrice: 4.80, description: "Autoclaved aerated concrete blocks - lightweight and insulating" },
  { id: "m060", name: "Concrete Hollow Blocks (8\")", category: "masonry", subcategory: "blocks", unit: "pcs", unitPrice: 5.20, description: "8-inch hollow blocks for load bearing walls" },
  { id: "m061", name: "Fly Ash Bricks", category: "masonry", subcategory: "bricks", unit: "pcs", unitPrice: 0.95, description: "Eco-friendly bricks made with fly ash" },
  { id: "m062", name: "Fire Bricks", category: "masonry", subcategory: "bricks", unit: "pcs", unitPrice: 3.50, description: "Heat-resistant bricks for fireplaces and ovens" },
  { id: "m063", name: "Glass Blocks", category: "masonry", subcategory: "blocks", unit: "pcs", unitPrice: 12.50, description: "Decorative glass blocks for light-transmitting walls" },
  { id: "m064", name: "Cement Mortar (1:4)", category: "masonry", subcategory: "mortar", unit: "m³", unitPrice: 220.00, description: "1:4 cement-sand mortar mix for brickwork" },
  { id: "m065", name: "Cement Mortar (1:6)", category: "masonry", subcategory: "mortar", unit: "m³", unitPrice: 180.00, description: "1:6 cement-sand mortar mix for brickwork" },
  
  // Flooring
  { id: "m010", name: "Ceramic Tiles (Basic)", category: "flooring", subcategory: "ceramic", unit: "m²", unitPrice: 25.00, description: "Basic ceramic tiles for standard applications" },
  { id: "m011", name: "Ceramic Tiles (Premium)", category: "flooring", subcategory: "ceramic", unit: "m²", unitPrice: 45.00, description: "Premium grade ceramic tiles with enhanced durability" },
  { id: "m012", name: "Porcelain Tiles", category: "flooring", subcategory: "porcelain", unit: "m²", unitPrice: 65.00, description: "High quality porcelain tiles for premium flooring" },
  { id: "m013", name: "Vinyl Flooring", category: "flooring", subcategory: "vinyl", unit: "m²", unitPrice: 35.00, description: "Durable vinyl flooring for high traffic areas" },
  { id: "m014", name: "Hardwood Flooring", category: "flooring", subcategory: "wood", unit: "m²", unitPrice: 120.00, description: "Premium hardwood flooring for luxury spaces" },
  
  // Additional Flooring Materials
  { id: "m066", name: "Marble Flooring", category: "flooring", subcategory: "stone", unit: "m²", unitPrice: 180.00, description: "Natural marble tiles for luxury flooring" },
  { id: "m067", name: "Granite Flooring", category: "flooring", subcategory: "stone", unit: "m²", unitPrice: 150.00, description: "Durable granite tiles for high-traffic areas" },
  { id: "m068", name: "Laminate Flooring", category: "flooring", subcategory: "laminate", unit: "m²", unitPrice: 55.00, description: "Synthetic laminate flooring with wood appearance" },
  { id: "m069", name: "Carpet Tiles", category: "flooring", subcategory: "carpet", unit: "m²", unitPrice: 45.00, description: "Modular carpet tiles for office spaces" },
  { id: "m070", name: "Epoxy Flooring", category: "flooring", subcategory: "epoxy", unit: "m²", unitPrice: 85.00, description: "Durable epoxy coating for industrial floors" },
  { id: "m071", name: "Terrazzo Flooring", category: "flooring", subcategory: "terrazzo", unit: "m²", unitPrice: 110.00, description: "Composite material flooring with decorative stone chips" },
  { id: "m072", name: "Bamboo Flooring", category: "flooring", subcategory: "wood", unit: "m²", unitPrice: 95.00, description: "Sustainable bamboo flooring alternative" },
  { id: "m073", name: "Rubber Flooring", category: "flooring", subcategory: "rubber", unit: "m²", unitPrice: 65.00, description: "Impact-absorbing rubber flooring for gyms" },
  
  // Painting
  { id: "m015", name: "Interior Paint (Basic)", category: "painting", subcategory: "interior", unit: "liter", unitPrice: 18.00, description: "Standard interior wall paint" },
  { id: "m016", name: "Interior Paint (Premium)", category: "painting", subcategory: "interior", unit: "liter", unitPrice: 35.00, description: "Premium interior paint with enhanced durability" },
  { id: "m017", name: "Exterior Paint (Basic)", category: "painting", subcategory: "exterior", unit: "liter", unitPrice: 25.00, description: "Standard weather-resistant exterior paint" },
  { id: "m018", name: "Exterior Paint (Premium)", category: "painting", subcategory: "exterior", unit: "liter", unitPrice: 45.00, description: "Premium exterior paint with enhanced weather resistance" },
  { id: "m019", name: "Primer", category: "painting", subcategory: "primers", unit: "liter", unitPrice: 15.00, description: "Surface preparation primer for painting applications" },
  
  // Additional Painting Materials
  { id: "m074", name: "Texture Paint", category: "painting", subcategory: "texture", unit: "liter", unitPrice: 38.00, description: "Decorative textured wall finish" },
  { id: "m075", name: "Anti-fungal Paint", category: "painting", subcategory: "specialty", unit: "liter", unitPrice: 40.00, description: "Mold and mildew resistant paint for bathrooms" },
  { id: "m076", name: "Heat-reflective Paint", category: "painting", subcategory: "specialty", unit: "liter", unitPrice: 55.00, description: "Insulating paint that reflects heat" },
  { id: "m077", name: "Concrete Paint", category: "painting", subcategory: "specialty", unit: "liter", unitPrice: 48.00, description: "Specialized paint for concrete surfaces" },
  { id: "m078", name: "Wood Stain", category: "painting", subcategory: "wood", unit: "liter", unitPrice: 30.00, description: "Colored stain for wooden surfaces" },
  { id: "m079", name: "Wood Varnish", category: "painting", subcategory: "wood", unit: "liter", unitPrice: 35.00, description: "Clear protective coating for wooden surfaces" },
  { id: "m080", name: "Acrylic Putty", category: "painting", subcategory: "preparation", unit: "kg", unitPrice: 8.50, description: "Wall putty for smooth finish before painting" },
  
  // Plumbing
  { id: "m020", name: "PVC Pipes (1/2\")", category: "plumbing", subcategory: "pipes", unit: "m", unitPrice: 3.50, description: "Half-inch PVC pipes for water supply" },
  { id: "m021", name: "PVC Pipes (3/4\")", category: "plumbing", subcategory: "pipes", unit: "m", unitPrice: 5.20, description: "Three-quarter-inch PVC pipes for water supply" },
  { id: "m022", name: "PVC Pipes (1\")", category: "plumbing", subcategory: "pipes", unit: "m", unitPrice: 7.80, description: "One-inch PVC pipes for water supply" },
  { id: "m023", name: "Basic Sink", category: "plumbing", subcategory: "fixtures", unit: "pcs", unitPrice: 120.00, description: "Standard stainless steel kitchen sink" },
  { id: "m024", name: "Premium Sink", category: "plumbing", subcategory: "fixtures", unit: "pcs", unitPrice: 350.00, description: "Premium stainless steel kitchen sink with accessories" },
  { id: "m025", name: "Basic Toilet Set", category: "plumbing", subcategory: "fixtures", unit: "set", unitPrice: 280.00, description: "Standard toilet bowl and tank set" },
  { id: "m026", name: "Premium Toilet Set", category: "plumbing", subcategory: "fixtures", unit: "set", unitPrice: 650.00, description: "Premium toilet set with water-saving features" },
  
  // Additional Plumbing Materials
  { id: "m081", name: "PVC Pipes (2\")", category: "plumbing", subcategory: "pipes", unit: "m", unitPrice: 12.50, description: "Two-inch PVC pipes for drainage" },
  { id: "m082", name: "PVC Pipes (4\")", category: "plumbing", subcategory: "pipes", unit: "m", unitPrice: 25.00, description: "Four-inch PVC pipes for main drainage" },
  { id: "m083", name: "CPVC Pipes (1/2\")", category: "plumbing", subcategory: "pipes", unit: "m", unitPrice: 6.80, description: "Half-inch CPVC pipes for hot water supply" },
  { id: "m084", name: "CPVC Pipes (3/4\")", category: "plumbing", subcategory: "pipes", unit: "m", unitPrice: 9.50, description: "Three-quarter-inch CPVC pipes for hot water supply" },
  { id: "m085", name: "PPR Pipes (20mm)", category: "plumbing", subcategory: "pipes", unit: "m", unitPrice: 7.20, description: "20mm PPR pipes for water supply" },
  { id: "m086", name: "PPR Pipes (25mm)", category: "plumbing", subcategory: "pipes", unit: "m", unitPrice: 10.80, description: "25mm PPR pipes for water supply" },
  { id: "m087", name: "Standard Shower Set", category: "plumbing", subcategory: "fixtures", unit: "set", unitPrice: 180.00, description: "Basic shower head and faucet set" },
  { id: "m088", name: "Premium Shower Set", category: "plumbing", subcategory: "fixtures", unit: "set", unitPrice: 450.00, description: "Premium rainfall shower system" },
  { id: "m089", name: "Standard Basin Tap", category: "plumbing", subcategory: "fixtures", unit: "pcs", unitPrice: 45.00, description: "Standard water tap for bathroom basin" },
  { id: "m090", name: "Premium Basin Tap", category: "plumbing", subcategory: "fixtures", unit: "pcs", unitPrice: 120.00, description: "Premium basin tap with sensor activation" },
  
  // Electrical
  { id: "m027", name: "Electrical Cables (1.5mm²)", category: "electrical", subcategory: "wiring", unit: "m", unitPrice: 2.80, description: "1.5mm² electrical cables for lighting circuits" },
  { id: "m028", name: "Electrical Cables (2.5mm²)", category: "electrical", subcategory: "wiring", unit: "m", unitPrice: 4.50, description: "2.5mm² electrical cables for power outlets" },
  { id: "m029", name: "Electrical Cables (4.0mm²)", category: "electrical", subcategory: "wiring", unit: "m", unitPrice: 7.20, description: "4.0mm² electrical cables for heavy appliances" },
  { id: "m030", name: "Standard Switch", category: "electrical", subcategory: "accessories", unit: "pcs", unitPrice: 8.50, description: "Basic wall switch for lighting control" },
  { id: "m031", name: "Premium Switch", category: "electrical", subcategory: "accessories", unit: "pcs", unitPrice: 25.00, description: "Premium wall switch with modern design" },
  { id: "m032", name: "Standard Socket Outlet", category: "electrical", subcategory: "accessories", unit: "pcs", unitPrice: 12.00, description: "Basic electrical socket for general use" },
  { id: "m033", name: "Premium Socket Outlet", category: "electrical", subcategory: "accessories", unit: "pcs", unitPrice: 35.00, description: "Premium electrical socket with USB charging ports" },
  
  // Additional Electrical Materials
  { id: "m091", name: "Electrical Cables (6.0mm²)", category: "electrical", subcategory: "wiring", unit: "m", unitPrice: 10.80, description: "6.0mm² electrical cables for high power applications" },
  { id: "m092", name: "Electrical Cables (10.0mm²)", category: "electrical", subcategory: "wiring", unit: "m", unitPrice: 18.50, description: "10.0mm² electrical cables for main power lines" },
  { id: "m093", name: "CAT 6 Network Cable", category: "electrical", subcategory: "networking", unit: "m", unitPrice: 3.20, description: "Category 6 cable for computer networking" },
  { id: "m094", name: "TV Coaxial Cable", category: "electrical", subcategory: "multimedia", unit: "m", unitPrice: 2.50, description: "Coaxial cable for television signal" },
  { id: "m095", name: "HDMI Cable (2m)", category: "electrical", subcategory: "multimedia", unit: "pcs", unitPrice: 15.00, description: "2-meter HDMI cable for audio/video connections" },
  { id: "m096", name: "Distribution Board (8 way)", category: "electrical", subcategory: "distribution", unit: "pcs", unitPrice: 85.00, description: "8-way electrical distribution board" },
  { id: "m097", name: "Distribution Board (12 way)", category: "electrical", subcategory: "distribution", unit: "pcs", unitPrice: 120.00, description: "12-way electrical distribution board" },
  { id: "m098", name: "MCB (6A)", category: "electrical", subcategory: "protection", unit: "pcs", unitPrice: 12.00, description: "6 Amp miniature circuit breaker" },
  { id: "m099", name: "MCB (16A)", category: "electrical", subcategory: "protection", unit: "pcs", unitPrice: 14.00, description: "16 Amp miniature circuit breaker" },
  { id: "m100", name: "MCB (32A)", category: "electrical", subcategory: "protection", unit: "pcs", unitPrice: 18.00, description: "32 Amp miniature circuit breaker" },
  { id: "m101", name: "RCCB (40A)", category: "electrical", subcategory: "protection", unit: "pcs", unitPrice: 45.00, description: "40 Amp residual current circuit breaker" },
  
  // Roofing
  { id: "m034", name: "Concrete Roof Tiles", category: "roofing", subcategory: "tiles", unit: "m²", unitPrice: 45.00, description: "Durable concrete roof tiles for residential buildings" },
  { id: "m035", name: "Clay Roof Tiles", category: "roofing", subcategory: "tiles", unit: "m²", unitPrice: 65.00, description: "Traditional clay roof tiles with excellent aesthetics" },
  { id: "m036", name: "Metal Roofing Sheets", category: "roofing", subcategory: "metal", unit: "m²", unitPrice: 38.00, description: "Lightweight metal sheets for quick installation" },
  { id: "m037", name: "Waterproofing Membrane", category: "roofing", subcategory: "waterproofing", unit: "m²", unitPrice: 25.00, description: "Waterproofing membrane for flat roofs" },
  
  // Additional Roofing Materials
  { id: "m102", name: "Asphalt Shingles", category: "roofing", subcategory: "shingles", unit: "m²", unitPrice: 35.00, description: "Asphalt shingles for sloped roofs" },
  { id: "m103", name: "UPVC Roofing Sheets", category: "roofing", subcategory: "plastic", unit: "m²", unitPrice: 42.00, description: "UPVC corrugated sheets for roofing" },
  { id: "m104", name: "Roof Insulation", category: "roofing", subcategory: "insulation", unit: "m²", unitPrice: 28.00, description: "Thermal insulation for roofs" },
  { id: "m105", name: "Ridge Tiles", category: "roofing", subcategory: "accessories", unit: "m", unitPrice: 22.00, description: "Tiles for roof ridge capping" },
  { id: "m106", name: "Roof Flashing", category: "roofing", subcategory: "accessories", unit: "m", unitPrice: 18.00, description: "Metal flashing for roof joints and edges" },
  { id: "m107", name: "Roof Sealant", category: "roofing", subcategory: "accessories", unit: "tube", unitPrice: 8.50, description: "Waterproof sealant for roof joints" },
  { id: "m108", name: "Roof Drainage System", category: "roofing", subcategory: "drainage", unit: "m", unitPrice: 25.00, description: "Complete gutter and downpipe system" },
  
  // Carpentry
  { id: "m038", name: "Wooden Door (Interior)", category: "carpentry", subcategory: "doors", unit: "pcs", unitPrice: 280.00, description: "Standard wooden interior door" },
  { id: "m039", name: "Wooden Door (Exterior)", category: "carpentry", subcategory: "doors", unit: "pcs", unitPrice: 450.00, description: "Heavy-duty wooden exterior door" },
  { id: "m040", name: "Wooden Window Frame", category: "carpentry", subcategory: "windows", unit: "pcs", unitPrice: 180.00, description: "Wooden window frame for standard openings" },
  { id: "m041", name: "Kitchen Cabinet (Basic)", category: "carpentry", subcategory: "cabinets", unit: "m", unitPrice: 350.00, description: "Basic kitchen cabinets with standard finishes" },
  { id: "m042", name: "Kitchen Cabinet (Premium)", category: "carpentry", subcategory: "cabinets", unit: "m", unitPrice: 750.00, description: "Premium kitchen cabinets with high-end finishes" },
  
  // Additional Carpentry Materials
  { id: "m109", name: "Sliding Door System", category: "carpentry", subcategory: "doors", unit: "set", unitPrice: 580.00, description: "Sliding door with track system" },
  { id: "m110", name: "Aluminum Window Frame", category: "carpentry", subcategory: "windows", unit: "m²", unitPrice: 220.00, description: "Aluminum frame for windows" },
  { id: "m111", name: "UPVC Window Frame", category: "carpentry", subcategory: "windows", unit: "m²", unitPrice: 280.00, description: "UPVC frame for windows with thermal break" },
  { id: "m112", name: "Plywood (12mm)", category: "carpentry", subcategory: "wood", unit: "sheet", unitPrice: 85.00, description: "12mm thickness plywood sheet (4'x8')" },
  { id: "m113", name: "MDF Board (18mm)", category: "carpentry", subcategory: "wood", unit: "sheet", unitPrice: 95.00, description: "18mm thickness MDF board (4'x8')" },
  { id: "m114", name: "Laminated Board", category: "carpentry", subcategory: "wood", unit: "sheet", unitPrice: 120.00, description: "Pre-laminated particle board (4'x8')" },
  { id: "m115", name: "Door Hinges", category: "carpentry", subcategory: "hardware", unit: "pair", unitPrice: 8.50, description: "Metal hinges for doors" },
  { id: "m116", name: "Door Handle Set", category: "carpentry", subcategory: "hardware", unit: "set", unitPrice: 35.00, description: "Complete door handle and lock set" },
  { id: "m117", name: "Window Handle", category: "carpentry", subcategory: "hardware", unit: "pcs", unitPrice: 12.00, description: "Handle for windows" },
  
  // HVAC
  { id: "m043", name: "Split AC Unit (1.0HP)", category: "hvac", subcategory: "ac", unit: "set", unitPrice: 1200.00, description: "1.0 horsepower split air conditioning unit" },
  { id: "m044", name: "Split AC Unit (1.5HP)", category: "hvac", subcategory: "ac", unit: "set", unitPrice: 1600.00, description: "1.5 horsepower split air conditioning unit" },
  { id: "m045", name: "Split AC Unit (2.0HP)", category: "hvac", subcategory: "ac", unit: "set", unitPrice: 2200.00, description: "2.0 horsepower split air conditioning unit" },
  { id: "m046", name: "Ceiling Fan", category: "hvac", subcategory: "fans", unit: "pcs", unitPrice: 150.00, description: "Standard ceiling fan with variable speed" },
  
  // Additional HVAC Materials
  { id: "m118", name: "Split AC Unit (2.5HP)", category: "hvac", subcategory: "ac", unit: "set", unitPrice: 2800.00, description: "2.5 horsepower split air conditioning unit" },
  { id: "m119", name: "Cassette AC Unit (2.0HP)", category: "hvac", subcategory: "ac", unit: "set", unitPrice: 3200.00, description: "2.0 horsepower ceiling cassette air conditioner" },
  { id: "m120", name: "Ducted AC System", category: "hvac", subcategory: "ac", unit: "set", unitPrice: 8500.00, description: "Central ducted air conditioning system" },
  { id: "m121", name: "AC Copper Pipes", category: "hvac", subcategory: "accessories", unit: "m", unitPrice: 18.50, description: "Copper pipes for air conditioner installation" },
  { id: "m122", name: "Exhaust Fan (8\")", category: "hvac", subcategory: "fans", unit: "pcs", unitPrice: 85.00, description: "8-inch exhaust fan for bathroom/kitchen" },
  { id: "m123", name: "Exhaust Fan (12\")", category: "hvac", subcategory: "fans", unit: "pcs", unitPrice: 120.00, description: "12-inch exhaust fan for larger spaces" },
  { id: "m124", name: "Ventilation Duct", category: "hvac", subcategory: "ventilation", unit: "m", unitPrice: 25.00, description: "Galvanized steel duct for ventilation systems" },
  { id: "m125", name: "Air Grille", category: "hvac", subcategory: "ventilation", unit: "pcs", unitPrice: 35.00, description: "Air supply/return grille for HVAC systems" },
  
  // Landscaping
  { id: "m047", name: "Garden Soil", category: "landscaping", subcategory: "soil", unit: "m³", unitPrice: 85.00, description: "Quality topsoil for garden areas" },
  { id: "m048", name: "Decorative Gravel", category: "landscaping", subcategory: "decorative", unit: "m³", unitPrice: 120.00, description: "Decorative gravel for garden pathways" },
  { id: "m049", name: "Grass Turf", category: "landscaping", subcategory: "plants", unit: "m²", unitPrice: 18.00, description: "Natural grass turf for lawn areas" },
  { id: "m050", name: "Outdoor Pavers", category: "landscaping", subcategory: "pavers", unit: "m²", unitPrice: 55.00, description: "Concrete pavers for outdoor patios and walkways" },
  
  // Additional Landscaping Materials
  { id: "m126", name: "Artificial Grass", category: "landscaping", subcategory: "plants", unit: "m²", unitPrice: 45.00, description: "Synthetic grass for low-maintenance lawns" },
  { id: "m127", name: "Retaining Wall Blocks", category: "landscaping", subcategory: "hardscape", unit: "pcs", unitPrice: 8.50, description: "Concrete blocks for retaining walls" },
  { id: "m128", name: "Garden Edging", category: "landscaping", subcategory: "hardscape", unit: "m", unitPrice: 12.00, description: "Plastic/metal garden edging" },
  { id: "m129", name: "Landscape Fabric", category: "landscaping", subcategory: "plants", unit: "m²", unitPrice: 3.50, description: "Weed barrier fabric for garden beds" },
  { id: "m130", name: "Outdoor Lighting", category: "landscaping", subcategory: "lighting", unit: "pcs", unitPrice: 45.00, description: "Garden path lighting fixture" },
  { id: "m131", name: "Irrigation System", category: "landscaping", subcategory: "irrigation", unit: "m²", unitPrice: 25.00, description: "Automatic irrigation system for gardens" },
  { id: "m132", name: "Wooden Fence Panel", category: "landscaping", subcategory: "fencing", unit: "panel", unitPrice: 85.00, description: "Decorative wooden fence panel (6'x4')" },
  
  // Waterproofing Materials
  { id: "m133", name: "Liquid Waterproofing Membrane", category: "waterproofing", subcategory: "liquid", unit: "liter", unitPrice: 18.00, description: "Brush-applied liquid waterproofing for flat roofs and bathrooms" },
  { id: "m134", name: "Waterproofing Cement", category: "waterproofing", subcategory: "cementitious", unit: "kg", unitPrice: 4.50, description: "Waterproofing cement additive for bathrooms" },
  { id: "m135", name: "Bitumen Waterproofing Sheet", category: "waterproofing", subcategory: "sheet", unit: "m²", unitPrice: 22.00, description: "Self-adhesive bitumen waterproofing membrane" },
  { id: "m136", name: "Polyurethane Sealant", category: "waterproofing", subcategory: "sealant", unit: "tube", unitPrice: 12.00, description: "Flexible polyurethane sealant for joints" },
  { id: "m137", name: "Silicone Sealant", category: "waterproofing", subcategory: "sealant", unit: "tube", unitPrice: 8.50, description: "Silicone sealant for bathroom and kitchen" },
  { id: "m138", name: "Water Stop Tape", category: "waterproofing", subcategory: "accessories", unit: "m", unitPrice: 5.80, description: "PVC water stop tape for construction joints" },
  
  // Glass and Glazing
  { id: "m139", name: "Clear Glass (5mm)", category: "glazing", subcategory: "glass", unit: "m²", unitPrice: 65.00, description: "5mm clear float glass for windows" },
  { id: "m140", name: "Tinted Glass (6mm)", category: "glazing", subcategory: "glass", unit: "m²", unitPrice: 85.00, description: "6mm tinted glass for windows and facades" },
  { id: "m141", name: "Tempered Glass (8mm)", category: "glazing", subcategory: "glass", unit: "m²", unitPrice: 120.00, description: "8mm safety tempered glass" },
  { id: "m142", name: "Laminated Glass (10mm)", category: "glazing", subcategory: "glass", unit: "m²", unitPrice: 180.00, description: "10mm laminated safety glass" },
  { id: "m143", name: "Double Glazed Unit", category: "glazing", subcategory: "glass", unit: "m²", unitPrice: 220.00, description: "Insulated double glazed unit with air gap" },
  { id: "m144", name: "Structural Silicon", category: "glazing", subcategory: "accessories", unit: "tube", unitPrice: 18.00, description: "Structural silicon sealant for glazing" },
  
  // Insulation Materials
  { id: "m145", name: "Glass Wool Insulation", category: "insulation", subcategory: "thermal", unit: "m²", unitPrice: 18.00, description: "Glass wool insulation for walls and ceilings" },
  { id: "m146", name: "Rock Wool Insulation", category: "insulation", subcategory: "thermal", unit: "m²", unitPrice: 22.00, description: "Fire-resistant rock wool insulation" },
  { id: "m147", name: "Foam Board Insulation", category: "insulation", subcategory: "thermal", unit: "m²", unitPrice: 24.00, description: "Rigid foam board for thermal insulation" },
  { id: "m148", name: "Acoustic Panels", category: "insulation", subcategory: "acoustic", unit: "m²", unitPrice: 85.00, description: "Sound absorbing panels for walls and ceilings" },
  { id: "m149", name: "Vapor Barrier", category: "insulation", subcategory: "accessories", unit: "m²", unitPrice: 4.50, description: "Polyethylene vapor barrier membrane" },
  
  // Ceiling Materials
  { id: "m150", name: "Gypsum Board (9mm)", category: "ceiling", subcategory: "boards", unit: "sheet", unitPrice: 35.00, description: "9mm gypsum board for ceilings (4'x8')" },
  { id: "m151", name: "Gypsum Board (12mm)", category: "ceiling", subcategory: "boards", unit: "sheet", unitPrice: 42.00, description: "12mm gypsum board for ceilings (4'x8')" },
  { id: "m152", name: "PVC Ceiling Panels", category: "ceiling", subcategory: "panels", unit: "m²", unitPrice: 38.00, description: "Waterproof PVC ceiling panels" },
  { id: "m153", name: "Suspended Ceiling Grid", category: "ceiling", subcategory: "suspension", unit: "m²", unitPrice: 25.00, description: "Metal grid system for suspended ceilings" },
  { id: "m154", name: "Ceiling Tiles (60x60cm)", category: "ceiling", subcategory: "tiles", unit: "pcs", unitPrice: 8.50, description: "60x60cm mineral fiber ceiling tiles" },
  { id: "m155", name: "Ceiling Cornice", category: "ceiling", subcategory: "finishing", unit: "m", unitPrice: 12.00, description: "Decorative ceiling cornice/coving" }
];

// Function to get all materials
export const getAllMaterials = (): Material[] => {
  return materialDatabase;
};

// Function to filter materials by category
export const getMaterialsByCategory = (category: string): Material[] => {
  return materialDatabase.filter(material => material.category === category);
};

// Function to filter materials by subcategory
export const getMaterialsBySubcategory = (subcategory: string): Material[] => {
  return materialDatabase.filter(material => material.subcategory === subcategory);
};

// Function to get a material by ID
export const getMaterialById = (id: string): Material | undefined => {
  return materialDatabase.find(material => material.id === id);
};

// Function to search materials by name
export const searchMaterials = (query: string): Material[] => {
  const lowercaseQuery = query.toLowerCase();
  return materialDatabase.filter(material => 
    material.name.toLowerCase().includes(lowercaseQuery) ||
    material.description?.toLowerCase().includes(lowercaseQuery)
  );
};
