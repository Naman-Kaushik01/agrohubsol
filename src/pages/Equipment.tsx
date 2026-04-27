import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Tractor, MapPin, Star, Search, Filter as FilterIcon, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EQUIPMENT, EQUIPMENT_CATEGORIES } from "@/data/equipment";

type AvailabilityFilter = "all" | "available" | "booked";

export default function Equipment() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<typeof EQUIPMENT_CATEGORIES[number]>("All");
  const [maxDaily, setMaxDaily] = useState<number>(15000);
  const [minRating, setMinRating] = useState<number>(0);
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EQUIPMENT.filter((e) => category === "All" || e.category === category)
      .filter((e) => e.dailyRate <= maxDaily)
      .filter((e) => e.rating >= minRating)
      .filter((e) =>
        availability === "all" ? true : availability === "available" ? e.available : !e.available,
      )
      .filter((e) => {
        if (!q) return true;
        return (
          e.name.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.contractor.name.toLowerCase().includes(q) ||
          e.shortDescription.toLowerCase().includes(q)
        );
      });
  }, [search, category, maxDaily, minRating, availability]);

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
              20+ verified machines — tractors, harvesters, tillage tools, sprayers, irrigation kits and more — booked in minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Filters sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FilterIcon className="h-4 w-4" /> Filters
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground tracking-wider">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tractor, owner, city..."
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs uppercase text-muted-foreground tracking-wider">Max daily rate</Label>
                <span className="text-sm font-semibold text-primary">₹{maxDaily.toLocaleString()}</span>
              </div>
              <Slider
                value={[maxDaily]}
                onValueChange={(v) => setMaxDaily(v[0])}
                min={500}
                max={15000}
                step={100}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground tracking-wider">Minimum rating</Label>
              <div className="flex gap-1">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <Button
                    key={r}
                    variant={minRating === r ? "default" : "outline"}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setMinRating(r)}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground tracking-wider">Availability</Label>
              <Tabs value={availability} onValueChange={(v) => setAvailability(v as AvailabilityFilter)}>
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1 text-xs">All</TabsTrigger>
                  <TabsTrigger value="available" className="flex-1 text-xs">Available</TabsTrigger>
                  <TabsTrigger value="booked" className="flex-1 text-xs">Booked</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Button
              variant="ghost"
              className="w-full text-xs"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setMaxDaily(15000);
                setMinRating(0);
                setAvailability("all");
              }}
            >
              Reset filters
            </Button>
          </aside>

          {/* Listing */}
          <div className="space-y-6 min-w-0">
            <Tabs value={category} onValueChange={(v) => setCategory(v as typeof EQUIPMENT_CATEGORIES[number])}>
              <TabsList className="flex flex-wrap h-auto">
                {EQUIPMENT_CATEGORIES.map((c) => (
                  <TabsTrigger key={c} value={c} className="text-xs md:text-sm">{c}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {EQUIPMENT.length} machines
            </div>

            {filtered.length === 0 ? (
              <Card className="p-12 text-center text-muted-foreground">No equipment matches your filters.</Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((e) => (
                  <Link key={e.id} to={`/equipment/${e.slug}`} className="group">
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-all hover:-translate-y-1 border-border/60">
                      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                        <img
                          src={e.images[0]}
                          alt={e.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-3 left-3" variant="secondary">{e.category}</Badge>
                        <Badge
                          className="absolute top-3 right-3"
                          variant={e.available ? "default" : "destructive"}
                        >
                          {e.available ? "Available" : "Booked"}
                        </Badge>
                      </div>
                      <CardContent className="p-5 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                            {e.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1 text-sm">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">{e.rating}</span>
                            <span className="text-muted-foreground">({e.reviewsCount})</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{e.shortDescription}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" /> {e.location}
                        </div>
                        <div className="flex items-end justify-between pt-3 border-t">
                          <div>
                            <div className="text-xs text-muted-foreground">From</div>
                            <div className="font-bold text-primary text-lg">
                              ₹{e.hourlyRate}
                              <span className="text-xs text-muted-foreground font-normal">/hr</span>
                            </div>
                            <div className="text-xs text-muted-foreground">₹{e.dailyRate.toLocaleString()}/day</div>
                          </div>
                          <span className="text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            View <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
