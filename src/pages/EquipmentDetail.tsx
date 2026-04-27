import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarIcon,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Star,
  Wrench,
} from "lucide-react";
import { getEquipmentBySlug } from "@/data/equipment";
import { toast } from "sonner";

type Mode = "hourly" | "daily";

export default function EquipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const equipment = id ? getEquipmentBySlug(id) : undefined;

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  // Booking state
  const [bookingOpen, setBookingOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [mode, setMode] = useState<Mode>("daily");
  const [hours, setHours] = useState(4);
  const [days, setDays] = useState(1);
  const [time, setTime] = useState("08:00");
  const [confirmed, setConfirmed] = useState(false);

  // Sync carousel index for thumbnails
  useMemo(() => {
    if (!carouselApi) return;
    carouselApi.on("select", () => setActiveIndex(carouselApi.selectedScrollSnap()));
  }, [carouselApi]);

  if (!equipment) {
    return (
      <Layout>
        <div className="container py-20 text-center space-y-4">
          <p className="text-muted-foreground">Equipment not found.</p>
          <Button asChild><Link to="/equipment">Back to listing</Link></Button>
        </div>
      </Layout>
    );
  }

  const total = mode === "hourly" ? equipment.hourlyRate * hours : equipment.dailyRate * days;
  const gst = Math.round(total * 0.05);
  const grandTotal = total + gst;

  const handleConfirm = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    setConfirmed(true);
    toast.success(`Booking confirmed for ${equipment.name}`);
  };

  const resetBooking = () => {
    setConfirmed(false);
    setDate(undefined);
    setHours(4);
    setDays(1);
    setMode("daily");
    setTime("08:00");
  };

  return (
    <Layout>
      <div className="container py-8 space-y-8">
        <Button variant="ghost" size="sm" onClick={() => navigate("/equipment")} className="-ml-3">
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to equipment
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          {/* Left: gallery + details */}
          <div className="space-y-8 min-w-0">
            <div className="space-y-3">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {equipment.images.map((src, i) => (
                    <CarouselItem key={i}>
                      <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                        <img
                          src={src}
                          alt={`${equipment.name} ${i + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3" />
                <CarouselNext className="right-3" />
              </Carousel>

              {equipment.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {equipment.images.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => carouselApi?.scrollTo(i)}
                      className={cn(
                        "relative h-16 w-24 rounded-md overflow-hidden border-2 transition-all flex-shrink-0",
                        activeIndex === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100",
                      )}
                    >
                      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <Badge variant="secondary" className="mb-2">{equipment.category}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{equipment.name}</h1>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-foreground">{equipment.rating}</span>
                      ({equipment.reviewsCount} reviews)
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{equipment.location}</span>
                  </div>
                </div>
                <Badge
                  className="text-sm py-1 px-3"
                  variant={equipment.available ? "default" : "destructive"}
                >
                  {equipment.available ? "Available now" : "Currently booked"}
                </Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">{equipment.fullDescription}</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" /> Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {equipment.specs.map((s) => (
                    <div key={s.label} className="flex justify-between border-b border-dashed pb-2">
                      <span className="text-sm text-muted-foreground">{s.label}</span>
                      <span className="text-sm font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <h2 className="font-semibold text-lg">Common use cases</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {equipment.useCases.map((u) => (
                    <li key={u} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-lg">Contractor</h2>
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarFallback className="font-semibold">
                      {equipment.contractor.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="font-semibold">{equipment.contractor.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {equipment.contractor.yearsActive} yrs · {equipment.contractor.totalRentals.toLocaleString()} rentals
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> Responds {equipment.contractor.responseTime.toLowerCase()}
                    </div>
                    <div className="text-sm flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-primary" /> {equipment.contractor.phone}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="font-semibold text-xl">Reviews</h2>
              <div className="space-y-4">
                {equipment.reviews.map((r, i) => (
                  <Card key={i}>
                    <CardContent className="p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="text-xs">{r.user.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{r.user}</div>
                            <div className="text-xs text-muted-foreground">{r.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={cn(
                                "h-3.5 w-3.5",
                                idx < r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start space-y-4">
            <Card className="border-primary/30 shadow-lg">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">₹{equipment.hourlyRate}</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  or <span className="font-semibold text-foreground">₹{equipment.dailyRate.toLocaleString()}</span> per day
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Hourly rate</span><span>₹{equipment.hourlyRate}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Daily rate</span><span>₹{equipment.dailyRate.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">GST</span><span>5%</span></div>
                </div>

                <Dialog
                  open={bookingOpen}
                  onOpenChange={(open) => {
                    setBookingOpen(open);
                    if (!open) setTimeout(resetBooking, 200);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg" disabled={!equipment.available}>
                      {equipment.available ? "Book Now" : "Currently Unavailable"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    {!confirmed ? (
                      <>
                        <DialogHeader>
                          <DialogTitle>Book {equipment.name}</DialogTitle>
                          <DialogDescription>
                            Pick your rental window. The contractor will confirm within {equipment.contractor.responseTime.toLowerCase()}.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-2">
                          <div className="space-y-2">
                            <Label>Rental type</Label>
                            <RadioGroup
                              value={mode}
                              onValueChange={(v) => setMode(v as Mode)}
                              className="grid grid-cols-2 gap-2"
                            >
                              <Label
                                htmlFor="hourly"
                                className={cn(
                                  "border rounded-md p-3 cursor-pointer text-sm transition-colors",
                                  mode === "hourly" && "border-primary bg-primary/5",
                                )}
                              >
                                <RadioGroupItem id="hourly" value="hourly" className="sr-only" />
                                Hourly
                              </Label>
                              <Label
                                htmlFor="daily"
                                className={cn(
                                  "border rounded-md p-3 cursor-pointer text-sm transition-colors",
                                  mode === "daily" && "border-primary bg-primary/5",
                                )}
                              >
                                <RadioGroupItem id="daily" value="daily" className="sr-only" />
                                Daily
                              </Label>
                            </RadioGroup>
                          </div>

                          <div className="space-y-2">
                            <Label>Start date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? format(date, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  onSelect={setDate}
                                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Start time</Label>
                              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label>{mode === "hourly" ? "Hours" : "Days"}</Label>
                              <Input
                                type="number"
                                min={1}
                                max={mode === "hourly" ? 12 : 30}
                                value={mode === "hourly" ? hours : days}
                                onChange={(e) => {
                                  const v = Math.max(1, Number(e.target.value || 1));
                                  mode === "hourly" ? setHours(v) : setDays(v);
                                }}
                              />
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                {mode === "hourly" ? `${hours} hrs × ₹${equipment.hourlyRate}` : `${days} days × ₹${equipment.dailyRate.toLocaleString()}`}
                              </span>
                              <span>₹{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">GST (5%)</span>
                              <span>₹{gst.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base pt-1">
                              <span>Total</span>
                              <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="ghost" onClick={() => setBookingOpen(false)}>Cancel</Button>
                          <Button onClick={handleConfirm}>Confirm Booking</Button>
                        </DialogFooter>
                      </>
                    ) : (
                      <>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" /> Booking Confirmed
                          </DialogTitle>
                          <DialogDescription>
                            Your request has been sent to {equipment.contractor.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">Equipment</span><span className="font-medium">{equipment.name}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{date && format(date, "PPP")}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{time}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{mode === "hourly" ? `${hours} hours` : `${days} days`}</span></div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-semibold"><span>Total payable</span><span className="text-primary">₹{grandTotal.toLocaleString()}</span></div>
                        </div>
                        <DialogFooter>
                          <Button onClick={() => setBookingOpen(false)} className="w-full">Done</Button>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>

                <p className="text-xs text-center text-muted-foreground">
                  No charge until contractor confirms · Free cancellation up to 6 hrs before
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
