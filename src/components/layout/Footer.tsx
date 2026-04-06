import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Sprout className="h-6 w-6 text-primary" />
              <span>AgroHub</span>
            </div>
            <p className="text-sm text-muted-foreground">Connecting farmers, suppliers, and agricultural experts on one platform.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Platform</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
              <Link to="/register" className="hover:text-foreground transition-colors">Get Started</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Help Center</span>
              <span>Contact Us</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AgroHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
