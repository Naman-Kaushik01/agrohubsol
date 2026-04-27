import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tractor, MapPin, Star, Calendar, Fuel, Settings } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Equipment = {
  id: string;
  name: string;
  category: "Tractors" | "Harvesting" | "Tillage" | "Sowing" | "Spraying" | "Irrigation" | "Transport";
  description: string;
  power: string;
  hourlyRate: number;
  dailyRate: number;
  rating: number;
  reviews: number;
  location: string;
  owner: string;
  available: boolean;
  image: string;
};

const EQUIPMENT: Equipment[] = [
  { id: "eq1", name: "Tractor (45 HP)", category: "Tractors", description: "Versatile mid-range tractor for ploughing, hauling, and powering implements.", power: "45 HP Diesel", hourlyRate: 350, dailyRate: 2200, rating: 4.8, reviews: 124, location: "Ludhiana, Punjab", owner: "Singh Agri Rentals", available: true, image: "https://images.unsplash.com/photo-1605338803155-8b4d8b1b1b1b?w=600&h=400&fit=crop&q=80" },
  { id: "eq2", name: "Combine Harvester", category: "Harvesting", description: "Self-propelled harvester ideal for wheat, rice, and soybean fields.", power: "120 HP", hourlyRate: 1800, dailyRate: 12000, rating: 4.9, reviews: 98, location: "Karnal, Haryana", owner: "Greenfield Equipments", available: true, image: "https://images.unsplash.com/photo-1591086949506-a8b6b96bb40d?w=600&h=400&fit=crop&q=80" },
  { id: "eq3", name: "Plough (MB)", category: "Tillage", description: "Mouldboard plough for primary tillage and inverting heavy soils.", power: "Tractor mounted", hourlyRate: 200, dailyRate: 1200, rating: 4.6, reviews: 67, location: "Indore, MP", owner: "Patel Farm Tools", available: true, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop&q=80" },
  { id: "eq4", name: "Rotavator", category: "Tillage", description: "Secondary tillage implement for fine seedbed preparation.", power: "Tractor PTO", hourlyRate: 250, dailyRate: 1500, rating: 4.7, reviews: 89, location: "Ahmedabad, Gujarat", owner: "Kisan Equipment Co.", available: true, image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop&q=80" },
  { id: "eq5", name: "Cultivator (9-tyne)", category: "Tillage", description: "Spring-loaded cultivator for breaking soil clods and weeding.", power: "Tractor mounted", hourlyRate: 180, dailyRate: 1100, rating: 4.5, reviews: 54, location: "Jaipur, Rajasthan", owner: "Desert Agro Hire", available: true, image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&h=400&fit=crop&q=80" },
  { id: "eq6", name: "Seed Drill", category: "Sowing", description: "Precision seed drill for uniform sowing of cereals and pulses.", power: "Tractor mounted", hourlyRate: 280, dailyRate: 1700, rating: 4.8, reviews: 76, location: "Lucknow, UP", owner: "AgroBoost Rentals", available: true, image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&h=400&fit=crop&q=80" },
  { id: "eq7", name: "Harrow (Disc)", category: "Tillage", description: "Heavy-duty disc harrow for breaking up soil after ploughing.", power: "Tractor mounted", hourlyRate: 220, dailyRate: 1300, rating: 4.6, reviews: 48, location: "Nashik, Maharashtra", owner: "Sahyadri Farms", available: false, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop&q=80" },
  { id: "eq8", name: "Power Tiller", category: "Tillage", description: "Walk-behind tiller perfect for small farms and orchards.", power: "12 HP Diesel", hourlyRate: 150, dailyRate: 900, rating: 4.7, reviews: 112, location: "Coimbatore, TN", owner: "South India Agro", available: true, image: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=600&h=400&fit=crop&q=80" },
  { id: "eq9", name: "Pesticide Sprayer", category: "Spraying", description: "Tractor-mounted boom sprayer for efficient pesticide application.", power: "500L tank", hourlyRate: 200, dailyRate: 1200, rating: 4.7, reviews: 83, location: "Pune, Maharashtra", owner: "CropCare Rentals", available: true, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop&q=80" },
  { id: "eq10", name: "Round Baler", category: "Harvesting", description: "Compacts hay and straw into round bales for storage.", power: "Tractor PTO", hourlyRate: 600, dailyRate: 3800, rating: 4.8, reviews: 41, location: "Meerut, UP", owner: "Hay Master Rentals", available: true, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&q=80" },
  { id: "eq11", name: "Thresher", category: "Harvesting", description: "Multi-crop thresher for wheat, paddy, maize, and pulses.", power: "10 HP", hourlyRate: 300, dailyRate: 1800, rating: 4.6, reviews: 65, location: "Bhopal, MP", owner: "Central Agro Hire", available: true, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop&q=80" },
  { id: "eq12", name: "Land Leveller", category: "Tillage", description: "Laser-guided leveller for precision field grading and water savings.", power: "Tractor mounted", hourlyRate: 450, dailyRate: 2800, rating: 4.9, reviews: 38, location: "Hisar, Haryana", owner: "PrecisionFarm Co.", available: true, image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&h=400&fit=crop&q=80" },
  { id: "eq13", name: "Ridger", category: "Tillage", description: "Forms ridges and furrows for sugarcane, potato, and vegetable crops.", power: "Tractor mounted", hourlyRate: 180, dailyRate: 1100, rating: 4.5, reviews: 52, location: "Kolhapur, Maharashtra", owner: "Sugarcane Equipment Hub", available: true, image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&h=400&fit=crop&q=80" },
  { id: "eq14", name: "Tractor Trailer (3-Ton)", category: "Transport", description: "Heavy-duty trailer for hauling produce, fodder, and inputs.", power: "3-ton capacity", hourlyRate: 200, dailyRate: 1300, rating: 4.7, reviews: 91, location: "Patiala, Punjab", owner: "Singh Agri Rentals", available: true, image: "https://images.unsplash.com/photo-1605338803155-8b4d8b1b1b1b?w=600&h=400&fit=crop&q=80" },
  { id: "eq15", name: "Water Pump (5 HP)", category: "Irrigation", description: "Diesel-powered centrifugal pump for irrigation from open wells.", power: "5 HP Diesel", hourlyRate: 120, dailyRate: 700, rating: 4.6, reviews: 144, location: "Nagpur, Maharashtra", owner: "AquaFarm Rentals", available: true, image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop&q=80" },
  { id: "eq16", name: "Sprinkler System", category: "Irrigation", description: "Portable sprinkler set covering up to 1 acre per setup.", power: "Includes pipes & nozzles", hourlyRate: 150, dailyRate: 900, rating: 4.8, reviews: 78, location: "Bengaluru, Karnataka", owner: "Drop2Drop Irrigation", available: true, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop&q=80" },
  { id: "eq17", name: "Subsoiler", category: "Tillage", description: "Deep tillage implement for breaking compacted hardpan layers.", power: "Tractor mounted (50+ HP)", hourlyRate: 320, dailyRate: 2000, rating: 4.7, reviews: 29, location: "Rajkot, Gujarat", owner: "DeepSoil Hire Co.", available: true, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop&q=80" },
  { id: "eq18", name: "Reaper", category: "Harvesting", description: "Self-propelled reaper for cutting wheat, paddy, and grasses.", power: "5 HP", hourlyRate: 250, dailyRate: 1500, rating: 4.6, reviews: 57, location: "Varanasi, UP", owner: "Ganga Agro Rentals", available: true, image: "https://images.unsplash.com/photo-1591086949506-a8b6b96bb40d?w=600&h=400&fit=crop&q=80" },
  { id: "eq19", name: "Hoe (Manual)", category: "Tillage", description: "Sturdy manual hoe for weeding and small-plot soil work.", power: "Manual", hourlyRate: 30, dailyRate: 150, rating: 4.5, reviews: 38, location: "Mysuru, Karnataka", owner: "Village Tools Hire", available: true, image: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=600&h=400&fit=crop&q=80" },
  { id: "eq20", name: "Rotary Tiller", category: "Tillage", description: "PTO-driven rotary tiller for fine seedbed in one pass.", power: "Tractor PTO", hourlyRate: 260, dailyRate: 1600, rating: 4.8, reviews: 71, location: "Chandigarh", owner: "NorthFarm Equipments", available: true, image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop&q=80" },
];

const FILTERS = ["All", "Tractors", "Harvesting", "Tillage", "Sowing", "Spraying", "Irrigation", "Transport"] as const;

export default function Equipment() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EQUIPMENT.filter((e) => filter === "All" || e.category === filter).filter((e) => {
      if (!q) return true;
      return e.name.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.owner.toLowerCase().includes(q);
    });
  }, [search, filter]);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Tractor className="h-4 w-4" /> Equipment Rental
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Rent farm <span className="text-primary">equipment</span> by the hour or day
            </h1>
            <p className="text-muted-foreground">
              Tractors, harvesters, tillage tools, sprayers, irrigation kits and more — from verified contractors near you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container space-y-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search equipment, owner or location"
              className="md:max-w-sm"
            />
            <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof FILTERS[number])}>
              <TabsList className="flex flex-wrap h-auto">
                {FILTERS.map((f) => (
                  <TabsTrigger key={f} value={f} className="text-xs md:text-sm">{f}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No equipment matches your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((e) => (
                <Card key={e.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-border/60">
                  <div className="relative aspect-[4/3] bg-muted">
                    <img src={e.image} alt={e.name} className="w-full h-full object-cover" loading="lazy" />
                    <Badge className="absolute top-3 left-3" variant="secondary">{e.category}</Badge>
                    {!e.available && (
                      <Badge className="absolute top-3 right-3" variant="destructive">Booked</Badge>
                    )}
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight">{e.name}</h3>
                      <div className="flex items-center gap-1 mt-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{e.rating}</span>
                        <span className="text-muted-foreground">({e.reviews} rentals)</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{e.description}</p>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><Settings className="h-3.5 w-3.5" /> {e.power}</div>
                      <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {e.location}</div>
                      <div className="flex items-center gap-2"><Fuel className="h-3.5 w-3.5" /> Owner: {e.owner}</div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        <div className="text-xs text-muted-foreground">Starting at</div>
                        <div className="font-bold text-primary">₹{e.hourlyRate}<span className="text-xs text-muted-foreground font-normal">/hr · ₹{e.dailyRate}/day</span></div>
                      </div>
                      <Button
                        size="sm"
                        disabled={!e.available}
                        onClick={() => toast.success(`Booking request sent for ${e.name}`)}
                      >
                        <Calendar className="h-4 w-4 mr-1.5" /> Rent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
