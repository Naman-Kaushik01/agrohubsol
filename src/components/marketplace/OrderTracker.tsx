import { Check, Clock, Package, Truck, Home, X } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "pending", label: "Placed", Icon: Clock },
  { key: "confirmed", label: "Confirmed", Icon: Check },
  { key: "shipped", label: "Shipped", Icon: Truck },
  { key: "delivered", label: "Delivered", Icon: Home },
];

interface OrderTrackerProps {
  status: string;
}

export function OrderTracker({ status }: OrderTrackerProps) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-destructive text-sm font-medium">
        <X className="h-4 w-4" /> Order Cancelled
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);
  const activeIndex = currentIndex < 0 ? 0 : currentIndex;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => {
          const isComplete = i < activeIndex;
          const isCurrent = i === activeIndex;
          const Icon = step.Icon;
          return (
            <div key={step.key} className="flex flex-col items-center flex-1 relative">
              {/* Connector line behind */}
              {i > 0 && (
                <div
                  className={cn(
                    "absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2",
                    i <= activeIndex ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
              <div
                className={cn(
                  "relative z-10 h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors",
                  isComplete && "bg-primary border-primary text-primary-foreground",
                  isCurrent && "bg-primary border-primary text-primary-foreground ring-4 ring-primary/20",
                  !isComplete && !isCurrent && "bg-card border-muted text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  (isComplete || isCurrent) ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
