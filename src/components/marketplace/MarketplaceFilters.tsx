import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RatingStars } from "./RatingStars";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export type SortOption = "newest" | "price-asc" | "price-desc" | "rating" | "popular";

interface MarketplaceFiltersProps {
  priceRange: [number, number];
  onPriceRangeChange: (v: [number, number]) => void;
  maxPrice: number;
  minRating: number;
  onMinRatingChange: (v: number) => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
  onClear: () => void;
  hasActive: boolean;
}

export function MarketplaceFilters({
  priceRange,
  onPriceRangeChange,
  maxPrice,
  minRating,
  onMinRatingChange,
  sort,
  onSortChange,
  onClear,
  hasActive,
}: MarketplaceFiltersProps) {
  return (
    <aside className="space-y-6 p-5 border rounded-xl bg-card sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActive && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-7 px-2 text-xs">
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-sm">Sort by</Label>
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="popular">Most popular</SelectItem>
            <SelectItem value="rating">Top rated</SelectItem>
            <SelectItem value="price-asc">Price: Low to high</SelectItem>
            <SelectItem value="price-desc">Price: High to low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Price range</Label>
          <span className="text-xs text-muted-foreground">
            ${priceRange[0]} – ${priceRange[1]}
          </span>
        </div>
        <Slider
          min={0}
          max={maxPrice}
          step={Math.max(1, Math.floor(maxPrice / 100))}
          value={priceRange}
          onValueChange={(v) => onPriceRangeChange([v[0], v[1]] as [number, number])}
          className="mt-2"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm">Minimum rating</Label>
        <div className="flex items-center gap-2">
          <RatingStars value={minRating} onChange={onMinRatingChange} size="md" />
          {minRating > 0 && (
            <button
              type="button"
              onClick={() => onMinRatingChange(0)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              clear
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
