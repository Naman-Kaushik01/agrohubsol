import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  onChange?: (value: number) => void;
  className?: string;
}

const sizeMap = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-6 w-6" };

export function RatingStars({ value, max = 5, size = "md", onChange, className }: RatingStarsProps) {
  const interactive = !!onChange;
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const filled = starValue <= Math.round(value);
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(starValue)}
            className={cn(
              interactive && "cursor-pointer hover:scale-110 transition-transform",
              !interactive && "cursor-default"
            )}
            aria-label={`Rate ${starValue} of ${max}`}
          >
            <Star
              className={cn(
                sizeMap[size],
                filled ? "fill-secondary text-secondary" : "text-muted-foreground/30"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
