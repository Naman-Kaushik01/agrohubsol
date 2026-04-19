import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { MarketplaceFilters, type SortOption } from "@/components/marketplace/MarketplaceFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_MAX = 1000;

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, DEFAULT_MAX]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortOption>("newest");
  const [priceTouched, setPriceTouched] = useState(false);

  const { data: products, isLoading } = useProducts(selectedCategory, search);
  const { data: categories } = useCategories();

  const maxPrice = useMemo(() => {
    if (!products?.length) return DEFAULT_MAX;
    return Math.ceil(Math.max(...products.map((p: any) => Number(p.price)))) || DEFAULT_MAX;
  }, [products]);

  // Compute review stats and apply filters/sorting client-side
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const enriched = products.map((p: any) => {
      const reviews = p.reviews || [];
      const avgRating = reviews.length
        ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length
        : 0;
      return { ...p, avgRating, reviewCount: reviews.length };
    });

    const upperBound = priceTouched ? priceRange[1] : Infinity;
    const lowerBound = priceTouched ? priceRange[0] : 0;

    const filtered = enriched.filter((p: any) => {
      const price = Number(p.price);
      if (price < lowerBound || price > upperBound) return false;
      if (minRating > 0 && p.avgRating < minRating) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "rating":
        sorted.sort((a, b) => b.avgRating - a.avgRating);
        break;
      case "popular":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
      default:
        sorted.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
    return sorted;
  }, [products, priceRange, priceTouched, minRating, sort]);

  const hasActiveFilters = priceTouched || minRating > 0 || sort !== "newest";

  const clearFilters = () => {
    setPriceRange([0, maxPrice]);
    setPriceTouched(false);
    setMinRating(0);
    setSort("newest");
  };

  const clearAll = () => {
    clearFilters();
    setSearch("");
    setSelectedCategory(undefined);
  };

  const filtersUI = (
    <MarketplaceFilters
      priceRange={priceTouched ? priceRange : [0, maxPrice]}
      onPriceRangeChange={(v) => {
        setPriceRange(v);
        setPriceTouched(true);
      }}
      maxPrice={maxPrice}
      minRating={minRating}
      onMinRatingChange={setMinRating}
      sort={sort}
      onSortChange={setSort}
      onClear={clearFilters}
      hasActive={hasActiveFilters}
    />
  );

  return (
    <Layout>
      <div className="container py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">
            Browse agricultural supplies from verified suppliers
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          {/* Mobile filter trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <div className="mt-6">{filtersUI}</div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={!selectedCategory ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(undefined)}
          >
            All
          </Badge>
          {categories?.map((cat) => (
            <Badge
              key={cat.id}
              variant={selectedCategory === cat.slug ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.slug ? undefined : cat.slug)
              }
            >
              {cat.name}
            </Badge>
          ))}
          {(search || selectedCategory || hasActiveFilters) && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <X className="h-3 w-3 mr-1" /> Clear all
            </Button>
          )}
        </div>

        {/* Layout with sidebar */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <div className="hidden lg:block">{filtersUI}</div>

          <div>
            {/* Result count */}
            {!isLoading && (
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-3 border rounded-xl bg-card">
                <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
