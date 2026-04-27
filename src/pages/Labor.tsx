import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MapPin, Star, Phone, Briefcase, ShieldCheck, Languages } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Agency = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  workersAvailable: number;
  skills: string[];
  rating: number;
  reviews: number;
  location: string;
  serviceArea: string;
  languages: string[];
  dailyWage: number;
  minWorkers: number;
  contractTypes: string[];
  verified: boolean;
  established: number;
  contact: string;
  logo: string;
};

const AGENCIES: Agency[] = [
  {
    id: "ag1",
    name: "GreenField Labor Services",
    tagline: "Trusted farm labor across Punjab & Haryana",
    description: "Provides skilled and unskilled farm workers for sowing, harvesting, and post-harvest operations on contract.",
    workersAvailable: 240,
    skills: ["Wheat Harvesting", "Paddy Transplanting", "Pesticide Spraying", "General Farm Work"],
    rating: 4.8,
    reviews: 167,
    location: "Ludhiana, Punjab",
    serviceArea: "Punjab, Haryana, North Rajasthan",
    languages: ["Hindi", "Punjabi"],
    dailyWage: 450,
    minWorkers: 5,
    contractTypes: ["Daily", "Weekly", "Seasonal"],
    verified: true,
    established: 2012,
    contact: "+91 98765 43210",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop",
  },
  {
    id: "ag2",
    name: "AgriWorkforce Solutions",
    tagline: "Pan-India contract labor supplier",
    description: "Large-scale labor contractor with experience in plantation crops, sugarcane harvesting, and orchard management.",
    workersAvailable: 520,
    skills: ["Sugarcane Harvesting", "Orchard Pruning", "Plantation Work", "Loading & Unloading"],
    rating: 4.7,
    reviews: 234,
    location: "Pune, Maharashtra",
    serviceArea: "Maharashtra, Karnataka, Gujarat",
    languages: ["Hindi", "Marathi", "Kannada"],
    dailyWage: 500,
    minWorkers: 10,
    contractTypes: ["Weekly", "Monthly", "Seasonal", "Project-based"],
    verified: true,
    established: 2008,
    contact: "+91 98234 56789",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
  },
  {
    id: "ag3",
    name: "Kisan Mitra Manpower",
    tagline: "Affordable labor for small & medium farms",
    description: "Local labor cooperative connecting village workers with farmers needing daily help during peak seasons.",
    workersAvailable: 120,
    skills: ["Sowing", "Weeding", "Harvesting", "Threshing"],
    rating: 4.6,
    reviews: 98,
    location: "Lucknow, Uttar Pradesh",
    serviceArea: "Uttar Pradesh, Bihar",
    languages: ["Hindi", "Bhojpuri"],
    dailyWage: 380,
    minWorkers: 3,
    contractTypes: ["Daily", "Weekly"],
    verified: true,
    established: 2016,
    contact: "+91 91234 56780",
    logo: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=200&h=200&fit=crop",
  },
  {
    id: "ag4",
    name: "Harvest Heroes Pvt Ltd",
    tagline: "Mechanised harvesting crews on demand",
    description: "Specialised teams trained on combine harvesters, threshers, and balers — supplied with equipment operators.",
    workersAvailable: 85,
    skills: ["Combine Operation", "Tractor Driving", "Baler Operation", "Mechanic Support"],
    rating: 4.9,
    reviews: 142,
    location: "Karnal, Haryana",
    serviceArea: "Haryana, Punjab, Western UP",
    languages: ["Hindi", "Punjabi", "English"],
    dailyWage: 750,
    minWorkers: 4,
    contractTypes: ["Daily", "Project-based", "Seasonal"],
    verified: true,
    established: 2015,
    contact: "+91 99887 65432",
    logo: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=200&h=200&fit=crop",
  },
  {
    id: "ag5",
    name: "South Agri Manpower Co.",
    tagline: "Plantation & spice crop labor specialists",
    description: "Trained labor for coffee, tea, cardamom and pepper estates including pruning, picking, and processing.",
    workersAvailable: 310,
    skills: ["Coffee Picking", "Tea Plucking", "Spice Harvesting", "Estate Maintenance"],
    rating: 4.8,
    reviews: 188,
    location: "Coimbatore, Tamil Nadu",
    serviceArea: "Tamil Nadu, Kerala, Karnataka",
    languages: ["Tamil", "Malayalam", "Kannada", "Hindi"],
    dailyWage: 480,
    minWorkers: 8,
    contractTypes: ["Weekly", "Monthly", "Seasonal"],
    verified: true,
    established: 2010,
    contact: "+91 98456 12378",
    logo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop",
  },
  {
    id: "ag6",
    name: "Annadata Labor Network",
    tagline: "Cotton & oilseed harvesting experts",
    description: "Provides experienced cotton-picking and groundnut-harvesting crews on contract across Gujarat and MP.",
    workersAvailable: 175,
    skills: ["Cotton Picking", "Groundnut Harvesting", "Soybean Threshing", "Bagging"],
    rating: 4.7,
    reviews: 121,
    location: "Ahmedabad, Gujarat",
    serviceArea: "Gujarat, Madhya Pradesh, Rajasthan",
    languages: ["Hindi", "Gujarati"],
    dailyWage: 420,
    minWorkers: 6,
    contractTypes: ["Daily", "Weekly", "Seasonal"],
    verified: true,
    established: 2014,
    contact: "+91 97654 32108",
    logo: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=200&h=200&fit=crop",
  },
  {
    id: "ag7",
    name: "EcoFarm Workers Collective",
    tagline: "Certified organic farming labor",
    description: "Workers trained in organic and natural farming practices — ideal for certified organic farms and FPOs.",
    workersAvailable: 95,
    skills: ["Organic Farming", "Vermicomposting", "Mulching", "Hand Weeding"],
    rating: 4.9,
    reviews: 76,
    location: "Bengaluru, Karnataka",
    serviceArea: "Karnataka, Andhra Pradesh, Telangana",
    languages: ["Kannada", "Telugu", "English"],
    dailyWage: 550,
    minWorkers: 4,
    contractTypes: ["Weekly", "Monthly", "Project-based"],
    verified: true,
    established: 2017,
    contact: "+91 98003 21567",
    logo: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=200&h=200&fit=crop",
  },
  {
    id: "ag8",
    name: "Shakti Labor Contractors",
    tagline: "Bulk labor for large agricultural projects",
    description: "Large workforce for FPOs, agribusinesses, and government schemes — handles 100+ workers per project.",
    workersAvailable: 800,
    skills: ["Land Clearing", "Bulk Sowing", "Mass Harvesting", "Storage Operations"],
    rating: 4.6,
    reviews: 203,
    location: "Bhopal, Madhya Pradesh",
    serviceArea: "MP, Chhattisgarh, Maharashtra",
    languages: ["Hindi", "Marathi"],
    dailyWage: 400,
    minWorkers: 25,
    contractTypes: ["Project-based", "Seasonal", "Annual"],
    verified: true,
    established: 2009,
    contact: "+91 94567 89012",
    logo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=200&fit=crop",
  },
];

const FILTERS = ["All", "Verified", "Daily", "Weekly", "Seasonal", "Project-based"] as const;

export default function Labor() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return AGENCIES.filter((a) => {
      if (filter === "All") return true;
      if (filter === "Verified") return a.verified;
      return a.contractTypes.includes(filter);
    }).filter((a) => {
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.serviceArea.toLowerCase().includes(q) ||
        a.skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [search, filter]);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Users className="h-4 w-4" /> Labor Hiring
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Hire farm <span className="text-primary">labor on contract</span>
            </h1>
            <p className="text-muted-foreground">
              Connect with verified labor agencies supplying skilled and unskilled workers — daily, seasonal, or project-based.
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
              placeholder="Search agency, skill, or service area"
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
            <p className="text-center text-muted-foreground py-12">No agencies match your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((a) => (
                <Card key={a.id} className="hover:shadow-lg transition-all hover:-translate-y-1 border-border/60">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border-2 border-primary/20">
                        <AvatarImage src={a.logo} alt={a.name} />
                        <AvatarFallback>{a.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg leading-tight">{a.name}</h3>
                          {a.verified && (
                            <Badge variant="secondary" className="text-xs gap-1">
                              <ShieldCheck className="h-3 w-3 text-primary" /> Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-primary font-medium">{a.tagline}</p>
                        <div className="flex items-center gap-1 mt-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-semibold">{a.rating}</span>
                          <span className="text-muted-foreground">({a.reviews} reviews)</span>
                          <span className="text-muted-foreground">· Since {a.established}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{a.description}</p>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1.5">Skills offered</div>
                      <div className="flex flex-wrap gap-1.5">
                        {a.skills.map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> {a.workersAvailable} workers available</div>
                      <div className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5" /> Min {a.minWorkers} workers/order</div>
                      <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {a.location}</div>
                      <div className="flex items-center gap-2"><Languages className="h-3.5 w-3.5" /> {a.languages.join(", ")}</div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Service area:</span> {a.serviceArea}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {a.contractTypes.map((c) => (
                        <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        <div className="text-xs text-muted-foreground">Starting from</div>
                        <div className="font-bold text-primary">₹{a.dailyWage}<span className="text-xs text-muted-foreground font-normal">/worker/day</span></div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => toast.success(`Contract request sent to ${a.name}`)}
                      >
                        <Phone className="h-4 w-4 mr-1.5" /> Request Quote
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
