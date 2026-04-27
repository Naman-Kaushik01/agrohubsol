export type EquipmentCategory =
  | "Tractors"
  | "Harvesting"
  | "Tillage"
  | "Sowing"
  | "Spraying"
  | "Irrigation"
  | "Transport";

export type EquipmentReview = {
  user: string;
  rating: number;
  date: string;
  comment: string;
};

export type Contractor = {
  name: string;
  phone: string;
  yearsActive: number;
  totalRentals: number;
  responseTime: string;
};

export type Equipment = {
  id: string;
  slug: string;
  name: string;
  category: EquipmentCategory;
  shortDescription: string;
  fullDescription: string;
  useCases: string[];
  specs: { label: string; value: string }[];
  hourlyRate: number;
  dailyRate: number;
  rating: number;
  reviewsCount: number;
  available: boolean;
  location: string;
  contractor: Contractor;
  images: string[];
  reviews: EquipmentReview[];
};

// Curated Unsplash images per machine. 2–3 per item.
export const EQUIPMENT: Equipment[] = [
  {
    id: "eq1",
    slug: "tractor",
    name: "Tractor (45 HP)",
    category: "Tractors",
    shortDescription: "Versatile mid-range tractor for ploughing, hauling and powering implements.",
    fullDescription:
      "A reliable 45 HP diesel tractor suited for medium and large farms. Power steering, dual-clutch and PTO make it ideal for connecting cultivators, rotavators, trailers and seed drills. Comes with full fuel tank and trained operator on request.",
    useCases: ["Primary ploughing", "Hauling trailers", "Powering rotavators & seed drills", "Spraying with mounted boom"],
    specs: [
      { label: "Engine", value: "45 HP, 4-cylinder Diesel" },
      { label: "Transmission", value: "8 Forward + 2 Reverse" },
      { label: "PTO", value: "540 RPM" },
      { label: "Fuel Tank", value: "55 L" },
    ],
    hourlyRate: 350,
    dailyRate: 2200,
    rating: 4.8,
    reviewsCount: 124,
    available: true,
    location: "Ludhiana, Punjab",
    contractor: {
      name: "Singh Agri Rentals",
      phone: "+91 98765 43210",
      yearsActive: 12,
      totalRentals: 2400,
      responseTime: "Within 1 hour",
    },
    images: [
      "https://images.unsplash.com/photo-1605338198618-eef0a8c1f9c8?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Harpreet S.", rating: 5, date: "2 weeks ago", comment: "Strong machine, ran for 8 hours straight without issues." },
      { user: "Manjeet K.", rating: 5, date: "1 month ago", comment: "Owner delivered on time, fuel-efficient." },
      { user: "Balwinder R.", rating: 4, date: "2 months ago", comment: "Good tractor, brakes could be better but overall solid." },
    ],
  },
  {
    id: "eq2",
    slug: "combine-harvester",
    name: "Combine Harvester",
    category: "Harvesting",
    shortDescription: "Self-propelled harvester ideal for wheat, rice and soybean fields.",
    fullDescription:
      "Heavy-duty 120 HP combine harvester with a 14-foot cutting platform. Cuts, threshes, separates and cleans grain in one pass — drastically cutting harvest time and labor cost. Operator and diesel included.",
    useCases: ["Wheat harvesting", "Paddy harvesting", "Soybean & mustard threshing", "Large-field crop reaping"],
    specs: [
      { label: "Engine", value: "120 HP Diesel" },
      { label: "Cutter Bar", value: "14 ft" },
      { label: "Grain Tank", value: "2,200 L" },
      { label: "Capacity", value: "2–3 acres/hour" },
    ],
    hourlyRate: 1800,
    dailyRate: 12000,
    rating: 4.9,
    reviewsCount: 98,
    available: true,
    location: "Karnal, Haryana",
    contractor: {
      name: "Greenfield Equipments",
      phone: "+91 99887 66554",
      yearsActive: 9,
      totalRentals: 1380,
      responseTime: "Within 2 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1591086949506-a8b6b96bb40d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Ravinder P.", rating: 5, date: "1 week ago", comment: "Cleared 12 acres in a day, excellent." },
      { user: "Sukhdev S.", rating: 5, date: "3 weeks ago", comment: "Operator was experienced and careful." },
    ],
  },
  {
    id: "eq3",
    slug: "plough",
    name: "Mouldboard Plough",
    category: "Tillage",
    shortDescription: "Primary tillage implement for inverting and turning heavy soils.",
    fullDescription:
      "Heavy mouldboard plough designed for primary tillage. Inverts soil to bury weeds and crop residue, opens up compacted ground and prepares fields for the next crop cycle. Tractor mounted (35+ HP).",
    useCases: ["Pre-monsoon deep ploughing", "Burying crop residue", "Breaking new land", "Inverting heavy clay soils"],
    specs: [
      { label: "Type", value: "2-bottom Mouldboard" },
      { label: "Working Depth", value: "20–30 cm" },
      { label: "Tractor Required", value: "35+ HP" },
      { label: "Coverage", value: "0.4 acres/hour" },
    ],
    hourlyRate: 200,
    dailyRate: 1200,
    rating: 4.6,
    reviewsCount: 67,
    available: true,
    location: "Indore, MP",
    contractor: {
      name: "Patel Farm Tools",
      phone: "+91 97654 33221",
      yearsActive: 15,
      totalRentals: 980,
      responseTime: "Same day",
    },
    images: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Ramesh P.", rating: 5, date: "1 month ago", comment: "Cut through hard clay easily." },
      { user: "Dinesh M.", rating: 4, date: "2 months ago", comment: "Worked well, blades were sharp." },
    ],
  },
  {
    id: "eq4",
    slug: "rotavator",
    name: "Rotavator (7 ft)",
    category: "Tillage",
    shortDescription: "Secondary tillage for fine seedbed preparation in one pass.",
    fullDescription:
      "PTO-driven rotavator with hardened blades for pulverizing soil and creating a fine seedbed in a single pass. Reduces labour and saves diesel by combining ploughing and harrowing.",
    useCases: ["Seedbed preparation", "Mixing crop residue with soil", "Pre-sowing field smoothing", "Weed incorporation"],
    specs: [
      { label: "Width", value: "7 ft (84 in)" },
      { label: "Blades", value: "42 hardened" },
      { label: "Tractor PTO", value: "540 RPM" },
      { label: "Coverage", value: "0.6 acres/hour" },
    ],
    hourlyRate: 250,
    dailyRate: 1500,
    rating: 4.7,
    reviewsCount: 89,
    available: true,
    location: "Ahmedabad, Gujarat",
    contractor: {
      name: "Kisan Equipment Co.",
      phone: "+91 98245 66110",
      yearsActive: 10,
      totalRentals: 1620,
      responseTime: "Within 3 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Arvind T.", rating: 5, date: "3 weeks ago", comment: "Field was perfectly ready in one pass." },
      { user: "Kishan B.", rating: 4, date: "1 month ago", comment: "Solid build, blades stayed sharp." },
    ],
  },
  {
    id: "eq5",
    slug: "cultivator",
    name: "9-Tyne Cultivator",
    category: "Tillage",
    shortDescription: "Spring-loaded tyne cultivator for soil aeration and weeding.",
    fullDescription:
      "9-tyne spring cultivator that breaks soil clods, uproots weeds and aerates the topsoil. Spring loading protects tynes when hitting stones. Best used after primary ploughing.",
    useCases: ["Secondary tillage", "Inter-row weeding", "Soil aeration", "Pre-sowing prep"],
    specs: [
      { label: "Tynes", value: "9 spring-loaded" },
      { label: "Working Width", value: "6.5 ft" },
      { label: "Tractor Required", value: "35+ HP" },
      { label: "Coverage", value: "0.7 acres/hour" },
    ],
    hourlyRate: 180,
    dailyRate: 1100,
    rating: 4.5,
    reviewsCount: 54,
    available: true,
    location: "Jaipur, Rajasthan",
    contractor: {
      name: "Desert Agro Hire",
      phone: "+91 91234 78900",
      yearsActive: 8,
      totalRentals: 760,
      responseTime: "Within 4 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Mohan L.", rating: 4, date: "2 weeks ago", comment: "Worked well in sandy soil." },
      { user: "Suresh R.", rating: 5, date: "1 month ago", comment: "Springs absorbed rocks well." },
    ],
  },
  {
    id: "eq6",
    slug: "seed-drill",
    name: "Seed Drill (11-row)",
    category: "Sowing",
    shortDescription: "Precision sowing of cereals and pulses with simultaneous fertilizer placement.",
    fullDescription:
      "11-row seed cum fertilizer drill ensures uniform seed spacing and depth for higher germination. Adjustable seed metering for wheat, gram, soybean and mustard.",
    useCases: ["Wheat sowing", "Pulse & oilseed sowing", "Combined seed + fertilizer placement", "Line sowing"],
    specs: [
      { label: "Rows", value: "11" },
      { label: "Row Spacing", value: "Adjustable 15–22 cm" },
      { label: "Hopper Capacity", value: "65 kg seed + 45 kg fertilizer" },
      { label: "Coverage", value: "0.5 acres/hour" },
    ],
    hourlyRate: 280,
    dailyRate: 1700,
    rating: 4.8,
    reviewsCount: 76,
    available: true,
    location: "Lucknow, UP",
    contractor: {
      name: "AgroBoost Rentals",
      phone: "+91 90876 54321",
      yearsActive: 7,
      totalRentals: 940,
      responseTime: "Within 2 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Anil K.", rating: 5, date: "1 week ago", comment: "Even germination across the field." },
      { user: "Vikas S.", rating: 5, date: "3 weeks ago", comment: "Saved a lot of seed compared to broadcast." },
    ],
  },
  {
    id: "eq7",
    slug: "harrow",
    name: "Disc Harrow",
    category: "Tillage",
    shortDescription: "Heavy-duty disc harrow for breaking soil clods after ploughing.",
    fullDescription:
      "Tandem disc harrow with 16 hardened steel discs. Breaks heavy clods, mixes residue and prepares field for sowing. Adjustable disc angle controls aggressiveness.",
    useCases: ["Post-plough clod breaking", "Stubble incorporation", "Field smoothing", "Mixing fertilizer into topsoil"],
    specs: [
      { label: "Discs", value: "16 (8 + 8 tandem)" },
      { label: "Disc Diameter", value: "20 in" },
      { label: "Working Width", value: "7 ft" },
      { label: "Tractor Required", value: "45+ HP" },
    ],
    hourlyRate: 220,
    dailyRate: 1300,
    rating: 4.6,
    reviewsCount: 48,
    available: false,
    location: "Nashik, Maharashtra",
    contractor: {
      name: "Sahyadri Farms",
      phone: "+91 98700 12345",
      yearsActive: 11,
      totalRentals: 870,
      responseTime: "Within 6 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Prakash D.", rating: 5, date: "1 month ago", comment: "Broke down hard clods quickly." },
      { user: "Sanjay M.", rating: 4, date: "2 months ago", comment: "Good but heavy — needed a 50 HP tractor." },
    ],
  },
  {
    id: "eq8",
    slug: "power-tiller",
    name: "Power Tiller (12 HP)",
    category: "Tillage",
    shortDescription: "Walk-behind tiller perfect for small farms, orchards and terraces.",
    fullDescription:
      "12 HP diesel power tiller suitable for small holdings, orchards and hilly terrain where tractors can't reach. Can be fitted with rotary tiller, plough or trailer attachment.",
    useCases: ["Small-plot tillage", "Orchard inter-cultivation", "Vegetable bed preparation", "Hill farming"],
    specs: [
      { label: "Engine", value: "12 HP Diesel" },
      { label: "Working Width", value: "60 cm" },
      { label: "Fuel Consumption", value: "1.0 L/hour" },
      { label: "Weight", value: "270 kg" },
    ],
    hourlyRate: 150,
    dailyRate: 900,
    rating: 4.7,
    reviewsCount: 112,
    available: true,
    location: "Coimbatore, TN",
    contractor: {
      name: "South India Agro",
      phone: "+91 99445 67821",
      yearsActive: 9,
      totalRentals: 1840,
      responseTime: "Within 2 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Murali V.", rating: 5, date: "2 weeks ago", comment: "Perfect for my coconut grove." },
      { user: "Selvam K.", rating: 4, date: "1 month ago", comment: "Easy to handle, low fuel use." },
    ],
  },
  {
    id: "eq9",
    slug: "sprayer",
    name: "Boom Sprayer (500 L)",
    category: "Spraying",
    shortDescription: "Tractor-mounted boom sprayer for efficient pesticide & herbicide application.",
    fullDescription:
      "500-litre tractor-mounted boom sprayer with 12 nozzles spread across a 12-ft folding boom. Even spray distribution at low pressure protects crops and reduces chemical waste.",
    useCases: ["Pesticide application", "Herbicide spraying", "Foliar fertilizer spraying", "Fungicide treatment"],
    specs: [
      { label: "Tank Capacity", value: "500 L" },
      { label: "Boom Width", value: "12 ft (foldable)" },
      { label: "Nozzles", value: "12 hollow-cone" },
      { label: "Pump", value: "Diaphragm 35 L/min" },
    ],
    hourlyRate: 200,
    dailyRate: 1200,
    rating: 4.7,
    reviewsCount: 83,
    available: true,
    location: "Pune, Maharashtra",
    contractor: {
      name: "CropCare Rentals",
      phone: "+91 97233 11220",
      yearsActive: 6,
      totalRentals: 1120,
      responseTime: "Within 3 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Nilesh G.", rating: 5, date: "2 weeks ago", comment: "Even spray, no missed strips." },
      { user: "Pawan T.", rating: 4, date: "1 month ago", comment: "Boom folds nicely for narrow gates." },
    ],
  },
  {
    id: "eq10",
    slug: "baler",
    name: "Round Baler",
    category: "Harvesting",
    shortDescription: "Compacts hay and straw into round bales for easy storage and transport.",
    fullDescription:
      "Tractor-PTO round baler that produces uniform 4ft x 4ft bales weighing 250–350 kg each. Perfect for managing wheat straw, paddy straw and hay.",
    useCases: ["Wheat straw baling", "Paddy straw collection", "Hay storage", "Cattle fodder management"],
    specs: [
      { label: "Bale Size", value: "120 × 120 cm" },
      { label: "Bale Weight", value: "250–350 kg" },
      { label: "Tractor Required", value: "50+ HP" },
      { label: "Output", value: "20–25 bales/hour" },
    ],
    hourlyRate: 600,
    dailyRate: 3800,
    rating: 4.8,
    reviewsCount: 41,
    available: true,
    location: "Meerut, UP",
    contractor: {
      name: "Hay Master Rentals",
      phone: "+91 98011 22340",
      yearsActive: 5,
      totalRentals: 420,
      responseTime: "Within 4 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1591086949506-a8b6b96bb40d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Rakesh Y.", rating: 5, date: "1 month ago", comment: "Cleared 8 acres of straw quickly." },
      { user: "Mahesh K.", rating: 5, date: "2 months ago", comment: "Tight bales, easy to stack." },
    ],
  },
  {
    id: "eq11",
    slug: "thresher",
    name: "Multi-Crop Thresher",
    category: "Harvesting",
    shortDescription: "Diesel-powered thresher for wheat, paddy, maize, gram and pulses.",
    fullDescription:
      "10 HP multi-crop thresher with adjustable concave clearance for clean grain output across cereals, oilseeds and pulses. Built-in blower removes chaff automatically.",
    useCases: ["Wheat threshing", "Paddy threshing", "Pulse threshing (gram/lentil)", "Mustard separation"],
    specs: [
      { label: "Engine", value: "10 HP Diesel" },
      { label: "Output", value: "800–1200 kg/hour" },
      { label: "Cleaning", value: "Built-in blower & sieve" },
      { label: "Crops", value: "Wheat, Paddy, Maize, Pulses" },
    ],
    hourlyRate: 300,
    dailyRate: 1800,
    rating: 4.6,
    reviewsCount: 65,
    available: true,
    location: "Bhopal, MP",
    contractor: {
      name: "Central Agro Hire",
      phone: "+91 94552 33890",
      yearsActive: 13,
      totalRentals: 1240,
      responseTime: "Within 2 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1591086949506-a8b6b96bb40d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Deepak S.", rating: 5, date: "3 weeks ago", comment: "Clean grain, very little wastage." },
      { user: "Lalit J.", rating: 4, date: "1 month ago", comment: "Worked well on gram." },
    ],
  },
  {
    id: "eq12",
    slug: "leveller",
    name: "Laser Land Leveller",
    category: "Tillage",
    shortDescription: "Laser-guided leveller for precision field grading and water savings.",
    fullDescription:
      "Laser-guided land leveller that grades fields to within ±2 cm accuracy. Saves up to 30% irrigation water and improves uniform crop emergence. Includes laser transmitter, receiver and control box.",
    useCases: ["New field development", "Pre-paddy levelling", "Salinity control", "Improving irrigation efficiency"],
    specs: [
      { label: "Bucket Width", value: "8 ft" },
      { label: "Accuracy", value: "±2 cm" },
      { label: "Tractor Required", value: "55+ HP" },
      { label: "Coverage", value: "0.5 acres/hour" },
    ],
    hourlyRate: 450,
    dailyRate: 2800,
    rating: 4.9,
    reviewsCount: 38,
    available: true,
    location: "Hisar, Haryana",
    contractor: {
      name: "PrecisionFarm Co.",
      phone: "+91 99123 45678",
      yearsActive: 7,
      totalRentals: 510,
      responseTime: "Within 3 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Inder S.", rating: 5, date: "2 weeks ago", comment: "Field is dead-flat now, water spreads evenly." },
      { user: "Kuldeep R.", rating: 5, date: "1 month ago", comment: "Saved on irrigation in next season." },
    ],
  },
  {
    id: "eq13",
    slug: "ridger",
    name: "Ridger",
    category: "Tillage",
    shortDescription: "Forms ridges & furrows for sugarcane, potato and vegetable crops.",
    fullDescription:
      "Tractor-mounted 2-row ridger that creates uniform ridges and furrows for line sowing. Essential for sugarcane planting, potato cultivation and raised-bed vegetable farming.",
    useCases: ["Sugarcane planting", "Potato ridging", "Raised-bed vegetable beds", "Drainage furrowing"],
    specs: [
      { label: "Rows", value: "2" },
      { label: "Ridge Spacing", value: "60–90 cm adjustable" },
      { label: "Tractor Required", value: "35+ HP" },
      { label: "Coverage", value: "0.6 acres/hour" },
    ],
    hourlyRate: 180,
    dailyRate: 1100,
    rating: 4.5,
    reviewsCount: 52,
    available: true,
    location: "Kolhapur, Maharashtra",
    contractor: {
      name: "Sugarcane Equipment Hub",
      phone: "+91 96234 89901",
      yearsActive: 10,
      totalRentals: 690,
      responseTime: "Within 4 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Vijay P.", rating: 5, date: "1 month ago", comment: "Perfect for my sugarcane planting." },
      { user: "Ashok N.", rating: 4, date: "2 months ago", comment: "Even ridges, easy spacing adjustment." },
    ],
  },
  {
    id: "eq14",
    slug: "trailer",
    name: "Tractor Trailer (3-Ton)",
    category: "Transport",
    shortDescription: "Heavy-duty 3-ton hydraulic tipping trailer for hauling produce, fodder and inputs.",
    fullDescription:
      "3-ton capacity hydraulic tipping trailer with reinforced steel body and dual axles. Ideal for transporting harvested produce, fodder, manure and farm inputs.",
    useCases: ["Crop transport", "Fodder & manure hauling", "Input delivery", "Construction at the farm"],
    specs: [
      { label: "Capacity", value: "3 tons" },
      { label: "Body", value: "Steel, hydraulic tipping" },
      { label: "Axles", value: "Dual" },
      { label: "Tyres", value: "6.50 × 16, 8-ply" },
    ],
    hourlyRate: 200,
    dailyRate: 1300,
    rating: 4.7,
    reviewsCount: 91,
    available: true,
    location: "Patiala, Punjab",
    contractor: {
      name: "Singh Agri Rentals",
      phone: "+91 98765 43210",
      yearsActive: 12,
      totalRentals: 2400,
      responseTime: "Within 1 hour",
    },
    images: [
      "https://images.unsplash.com/photo-1605338198618-eef0a8c1f9c8?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Gurmeet S.", rating: 5, date: "2 weeks ago", comment: "Tipping mechanism worked perfectly." },
      { user: "Jaswinder K.", rating: 4, date: "1 month ago", comment: "Good capacity, sturdy build." },
    ],
  },
  {
    id: "eq15",
    slug: "water-pump",
    name: "Water Pump (5 HP Diesel)",
    category: "Irrigation",
    shortDescription: "Diesel centrifugal pump for irrigation from open wells and ponds.",
    fullDescription:
      "5 HP diesel centrifugal water pump with self-priming feature. Lifts water up to 25 m suction and delivers 30,000 L/hour — sufficient to irrigate up to 2 acres in a day.",
    useCases: ["Open-well irrigation", "Pond / canal lifting", "Field flooding", "Sprinkler / drip pressurizing"],
    specs: [
      { label: "Engine", value: "5 HP Diesel" },
      { label: "Discharge", value: "30,000 L/hour" },
      { label: "Suction Head", value: "25 m" },
      { label: "Fuel Consumption", value: "0.6 L/hour" },
    ],
    hourlyRate: 120,
    dailyRate: 700,
    rating: 4.6,
    reviewsCount: 144,
    available: true,
    location: "Nagpur, Maharashtra",
    contractor: {
      name: "AquaFarm Rentals",
      phone: "+91 90008 11223",
      yearsActive: 8,
      totalRentals: 2100,
      responseTime: "Within 2 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Sandeep B.", rating: 5, date: "3 weeks ago", comment: "Started on first pull every time." },
      { user: "Yogesh M.", rating: 4, date: "1 month ago", comment: "Good flow, reasonable fuel use." },
    ],
  },
  {
    id: "eq16",
    slug: "sprinkler-system",
    name: "Portable Sprinkler System",
    category: "Irrigation",
    shortDescription: "Portable sprinkler set covering up to 1 acre per setup.",
    fullDescription:
      "Portable sprinkler irrigation kit with 6 sprinkler heads, 200 m of HDPE pipes, couplers and risers. Saves up to 40% water compared to flood irrigation.",
    useCases: ["Vegetable irrigation", "Wheat & pulse irrigation", "Lawn / fodder watering", "Frost protection"],
    specs: [
      { label: "Sprinkler Heads", value: "6 brass" },
      { label: "Pipe Length", value: "200 m HDPE" },
      { label: "Coverage", value: "Up to 1 acre per shift" },
      { label: "Pressure", value: "2–3 kg/cm²" },
    ],
    hourlyRate: 150,
    dailyRate: 900,
    rating: 4.8,
    reviewsCount: 78,
    available: true,
    location: "Bengaluru, Karnataka",
    contractor: {
      name: "Drop2Drop Irrigation",
      phone: "+91 98456 22134",
      yearsActive: 6,
      totalRentals: 980,
      responseTime: "Within 3 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Naveen R.", rating: 5, date: "2 weeks ago", comment: "Very even coverage, easy to move." },
      { user: "Karthik P.", rating: 5, date: "1 month ago", comment: "Saved a lot of water in summer." },
    ],
  },
  {
    id: "eq17",
    slug: "subsoiler",
    name: "Subsoiler",
    category: "Tillage",
    shortDescription: "Deep tillage tool for breaking compacted hardpan layers.",
    fullDescription:
      "Single-tyne subsoiler that penetrates up to 60 cm to break hardpan and compacted layers. Improves drainage, root penetration and water infiltration in heavy soils.",
    useCases: ["Breaking hardpan", "Improving drainage", "Deep root development", "Salinity reclamation"],
    specs: [
      { label: "Type", value: "Single-tyne, heavy-duty" },
      { label: "Working Depth", value: "Up to 60 cm" },
      { label: "Tractor Required", value: "50+ HP" },
      { label: "Coverage", value: "0.3 acres/hour" },
    ],
    hourlyRate: 320,
    dailyRate: 2000,
    rating: 4.7,
    reviewsCount: 29,
    available: true,
    location: "Rajkot, Gujarat",
    contractor: {
      name: "DeepSoil Hire Co.",
      phone: "+91 99111 23456",
      yearsActive: 9,
      totalRentals: 380,
      responseTime: "Within 5 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Bhavesh M.", rating: 5, date: "1 month ago", comment: "Field drains much better now." },
      { user: "Hardik P.", rating: 4, date: "2 months ago", comment: "Heavy but effective." },
    ],
  },
  {
    id: "eq18",
    slug: "reaper",
    name: "Self-Propelled Reaper",
    category: "Harvesting",
    shortDescription: "Walk-behind reaper for cutting wheat, paddy and grasses.",
    fullDescription:
      "5 HP self-propelled reaper that cuts and lays standing crop in neat windrows for easy bundling. Cuts ~1 acre per hour, replacing 8–10 manual labourers.",
    useCases: ["Wheat reaping", "Paddy reaping", "Fodder grass cutting", "Pulse harvesting"],
    specs: [
      { label: "Engine", value: "5 HP Petrol/Diesel" },
      { label: "Cutter Bar", value: "4 ft" },
      { label: "Cutting Speed", value: "1 acre/hour" },
      { label: "Fuel Consumption", value: "0.8 L/hour" },
    ],
    hourlyRate: 250,
    dailyRate: 1500,
    rating: 4.6,
    reviewsCount: 57,
    available: true,
    location: "Varanasi, UP",
    contractor: {
      name: "Ganga Agro Rentals",
      phone: "+91 91100 22334",
      yearsActive: 7,
      totalRentals: 720,
      responseTime: "Within 3 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1591086949506-a8b6b96bb40d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Rajeev T.", rating: 5, date: "2 weeks ago", comment: "Replaced 10 labourers easily." },
      { user: "Mukesh G.", rating: 4, date: "1 month ago", comment: "Light to operate, good cut." },
    ],
  },
  {
    id: "eq19",
    slug: "hoe",
    name: "Wheel Hoe (Manual)",
    category: "Tillage",
    shortDescription: "Manual wheel hoe for weeding and small-plot soil work.",
    fullDescription:
      "Sturdy single-wheel manual hoe with interchangeable blades for weeding, hilling and shallow cultivation. Ideal for kitchen gardens, polyhouse and small vegetable plots.",
    useCases: ["Inter-row weeding", "Vegetable bed cultivation", "Hilling potato/onion", "Polyhouse maintenance"],
    specs: [
      { label: "Type", value: "Single-wheel, manual" },
      { label: "Working Width", value: "20 cm" },
      { label: "Attachments", value: "Hoe, ridger, cultivator blades" },
      { label: "Weight", value: "8 kg" },
    ],
    hourlyRate: 30,
    dailyRate: 150,
    rating: 4.5,
    reviewsCount: 38,
    available: true,
    location: "Mysuru, Karnataka",
    contractor: {
      name: "Village Tools Hire",
      phone: "+91 90234 56123",
      yearsActive: 5,
      totalRentals: 460,
      responseTime: "Same day",
    },
    images: [
      "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Lakshmi N.", rating: 5, date: "1 week ago", comment: "Perfect for my vegetable garden." },
      { user: "Ravi K.", rating: 4, date: "3 weeks ago", comment: "Light and easy to push." },
    ],
  },
  {
    id: "eq20",
    slug: "rotary-tiller",
    name: "Rotary Tiller (PTO)",
    category: "Tillage",
    shortDescription: "PTO-driven rotary tiller for fine seedbed in one pass.",
    fullDescription:
      "Heavy-duty PTO-driven rotary tiller with C-shaped hardened blades. Performs primary and secondary tillage in a single pass, leaving a perfectly fine seedbed.",
    useCases: ["Single-pass seedbed prep", "Stubble pulverization", "Vegetable bed making", "Wet-land puddling"],
    specs: [
      { label: "Width", value: "6 ft" },
      { label: "Blades", value: "36 C-type hardened" },
      { label: "PTO Speed", value: "540 RPM" },
      { label: "Tractor Required", value: "40+ HP" },
    ],
    hourlyRate: 260,
    dailyRate: 1600,
    rating: 4.8,
    reviewsCount: 71,
    available: true,
    location: "Chandigarh",
    contractor: {
      name: "NorthFarm Equipments",
      phone: "+91 98112 33445",
      yearsActive: 8,
      totalRentals: 1180,
      responseTime: "Within 2 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
    ],
    reviews: [
      { user: "Tarun S.", rating: 5, date: "2 weeks ago", comment: "Field ready in one pass, no harrowing needed." },
      { user: "Amit B.", rating: 5, date: "1 month ago", comment: "Strong blades, kept sharpness." },
    ],
  },
];

export const EQUIPMENT_CATEGORIES = [
  "All",
  "Tractors",
  "Harvesting",
  "Tillage",
  "Sowing",
  "Spraying",
  "Irrigation",
  "Transport",
] as const;

export function getEquipmentBySlug(slug: string) {
  return EQUIPMENT.find((e) => e.slug === slug || e.id === slug);
}
