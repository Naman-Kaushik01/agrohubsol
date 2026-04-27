import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, MapPin, Star, MessageCircle, Languages, Briefcase } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type Expert = {
  id: string;
  name: string;
  specialty: string;
  crops: string[];
  bio: string;
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  fee: number;
  avatar: string;
};

const EXPERTS: Expert[] = [
  {
    id: "e1",
    name: "Dr. Anita Sharma",
    specialty: "Cereal Crops Specialist",
    crops: ["Wheat", "Rice", "Maize"],
    bio: "20+ years guiding farmers on high-yield cereal varieties, Rabi/Kharif planning, and integrated nutrient management.",
    experience: 22,
    rating: 4.9,
    reviews: 184,
    location: "Ludhiana, Punjab",
    languages: ["English", "Hindi", "Punjabi"],
    fee: 499,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    id: "e2",
    name: "Rajesh Patel",
    specialty: "Cotton & Oilseeds Expert",
    crops: ["Cotton", "Soybean", "Mustard", "Groundnut"],
    bio: "Field agronomist focused on BT cotton, oilseed rotation strategies, and pink bollworm management.",
    experience: 18,
    rating: 4.8,
    reviews: 142,
    location: "Ahmedabad, Gujarat",
    languages: ["English", "Hindi", "Gujarati"],
    fee: 399,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: "e3",
    name: "Dr. Meera Iyer",
    specialty: "Horticulture & Vegetables",
    crops: ["Tomato", "Onion", "Potato", "Chilli"],
    bio: "PhD in Horticulture. Helps growers with greenhouse production, drip fertigation, and post-harvest quality.",
    experience: 15,
    rating: 4.9,
    reviews: 211,
    location: "Bengaluru, Karnataka",
    languages: ["English", "Tamil", "Kannada"],
    fee: 599,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    id: "e4",
    name: "Suresh Kumar",
    specialty: "Sugarcane & Pulses",
    crops: ["Sugarcane", "Chickpea", "Pigeon Pea", "Lentil"],
    bio: "Specializes in ratoon management for sugarcane and disease-resistant pulse cultivation.",
    experience: 25,
    rating: 4.7,
    reviews: 96,
    location: "Lucknow, Uttar Pradesh",
    languages: ["Hindi", "English"],
    fee: 349,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: "e5",
    name: "Dr. Priya Nair",
    specialty: "Plantation & Spice Crops",
    crops: ["Coffee", "Tea", "Cardamom", "Black Pepper"],
    bio: "Plantation crop scientist advising on shade management, organic certification, and export-grade processing.",
    experience: 17,
    rating: 4.9,
    reviews: 158,
    location: "Kochi, Kerala",
    languages: ["English", "Malayalam", "Tamil"],
    fee: 549,
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
  {
    id: "e6",
    name: "Arjun Reddy",
    specialty: "Fruit Orchards Specialist",
    crops: ["Mango", "Banana", "Pomegranate", "Citrus"],
    bio: "Helps orchard owners with canopy management, flowering induction, and integrated pest control.",
    experience: 14,
    rating: 4.8,
    reviews: 127,
    location: "Hyderabad, Telangana",
    languages: ["English", "Hindi", "Telugu"],
    fee: 449,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
  },
  {
    id: "e7",
    name: "Dr. Kavita Joshi",
    specialty: "Organic & Sustainable Farming",
    crops: ["Vegetables", "Millets", "Pulses"],
    bio: "Organic certification consultant. Promotes natural farming, vermicompost, and biofertilizer adoption.",
    experience: 12,
    rating: 4.9,
    reviews: 173,
    location: "Pune, Maharashtra",
    languages: ["English", "Hindi", "Marathi"],
    fee: 499,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    id: "e8",
    name: "Vikram Singh",
    specialty: "Millets & Dryland Crops",
    crops: ["Pearl Millet", "Sorghum", "Finger Millet", "Barley"],
    bio: "Dryland farming specialist working on drought-resilient millets and water-efficient crop systems.",
    experience: 19,
    rating: 4.7,
    reviews: 88,
    location: "Jaipur, Rajasthan",
    languages: ["Hindi", "English"],
    fee: 379,
    avatar: "https://images.unsplash.com/photo-1542144612-1b3641ec3459?w=400&h=400&fit=crop",
  },
];

const FILTERS = ["All", "Cereals", "Vegetables", "Fruits", "Cotton & Oilseeds", "Plantation", "Millets", "Organic"] as const;

const matchesFilter = (e: Expert, f: typeof FILTERS[number]) => {
  if (f === "All") return true;
  if (f === "Cereals") return e.crops.some((c) => ["Wheat", "Rice", "Maize", "Barley"].includes(c));
  if (f === "Vegetables") return e.specialty.includes("Vegetable") || e.crops.some((c) => ["Tomato", "Onion", "Potato", "Chilli"].includes(c));
  if (f === "Fruits") return e.specialty.includes("Fruit") || e.crops.some((c) => ["Mango", "Banana", "Pomegranate", "Citrus"].includes(c));
  if (f === "Cotton & Oilseeds") return e.crops.some((c) => ["Cotton", "Soybean", "Mustard", "Groundnut"].includes(c));
  if (f === "Plantation") return e.specialty.includes("Plantation");
  if (f === "Millets") return e.specialty.includes("Millet") || e.crops.some((c) => c.includes("Millet"));
  if (f === "Organic") return e.specialty.toLowerCase().includes("organic");
  return true;
};

export default function Experts() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EXPERTS.filter((e) => matchesFilter(e, filter)).filter((e) => {
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.specialty.toLowerCase().includes(q) ||
        e.crops.some((c) => c.toLowerCase().includes(q)) ||
        e.location.toLowerCase().includes(q)
      );
    });
  }, [search, filter]);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <GraduationCap className="h-4 w-4" /> Expert Advice
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Talk to certified <span className="text-primary">crop farming experts</span>
            </h1>
            <p className="text-muted-foreground">
              Book consultations with agronomists who specialize in cereals, horticulture, plantation, and organic farming.
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
              placeholder="Search by name, crop, or location"
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
            <p className="text-center text-muted-foreground py-12">No experts match your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((e) => (
                <Card key={e.id} className="hover:shadow-lg transition-all hover:-translate-y-1 border-border/60">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border-2 border-primary/20">
                        <AvatarImage src={e.avatar} alt={e.name} />
                        <AvatarFallback>{e.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg leading-tight">{e.name}</h3>
                        <p className="text-sm text-primary font-medium">{e.specialty}</p>
                        <div className="flex items-center gap-1 mt-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-semibold">{e.rating}</span>
                          <span className="text-muted-foreground">({e.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">{e.bio}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {e.crops.map((c) => (
                        <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                      ))}
                    </div>

                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5" /> {e.experience} years experience</div>
                      <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {e.location}</div>
                      <div className="flex items-center gap-2"><Languages className="h-3.5 w-3.5" /> {e.languages.join(", ")}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <div className="text-xs text-muted-foreground">Consultation</div>
                        <div className="font-bold text-primary">₹{e.fee}<span className="text-xs text-muted-foreground font-normal"> / session</span></div>
                      </div>
                      <Button size="sm" onClick={() => toast.success(`Consultation request sent to ${e.name}`)}>
                        <MessageCircle className="h-4 w-4 mr-1.5" /> Book
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
