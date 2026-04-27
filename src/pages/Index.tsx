import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Sprout, ShoppingBag, Tractor, Users, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const features = [
  { icon: ShoppingBag, title: "Marketplace", desc: "Browse seeds, fertilizers, pesticides, and tools from verified suppliers.", link: "/marketplace" },
  { icon: Tractor, title: "Equipment Rental", desc: "Rent tractors and farming equipment from trusted contractors.", link: "/equipment" },
  { icon: Users, title: "Labor Hiring", desc: "Find skilled agricultural workers for your farm operations.", link: "/labor" },
  { icon: GraduationCap, title: "Expert Advice", desc: "Connect with agricultural experts for consultations and guidance.", link: "/experts" },
];

export default function Index() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sprout className="h-4 w-4" /> Agricultural Services Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Grow Smarter with <span className="text-primary">AgroHub</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your one-stop platform connecting farmers, suppliers, contractors, and agricultural experts.
              Access supplies, rent equipment, hire labor, and get expert advice — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {user ? (
                <Button asChild size="lg" className="text-base">
                  <Link to="/marketplace">Browse Marketplace <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="text-base">
                    <Link to="/register">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-base">
                    <Link to="/marketplace">Explore Marketplace</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.08),transparent_50%)]" />
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything Your Farm Needs</h2>
            <p className="text-muted-foreground mt-2">A comprehensive platform designed for modern agriculture</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="group hover:shadow-lg transition-all hover:-translate-y-1 border-border/60">
                <CardContent className="p-6 space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                  <Link to={f.link} className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Learn More <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Transform Your Farming?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Join thousands of farmers and suppliers who trust AgroHub for their agricultural needs.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-base">
            <Link to="/register">Join AgroHub Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
