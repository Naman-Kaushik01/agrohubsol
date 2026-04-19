import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package } from "lucide-react";
import { useAddToCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { RatingStars } from "./RatingStars";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const addToCart = useAddToCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const reviews = product.reviews || [];
  const avgRating =
    product.avgRating ??
    (reviews.length
      ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length
      : 0);
  const reviewCount = product.reviewCount ?? reviews.length;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart.mutate(
      { productId: product.id },
      {
        onSuccess: () =>
          toast({ title: "Added to cart", description: `${product.name} added to your cart` }),
        onError: (err: any) =>
          toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  return (
    <Link to={`/marketplace/${product.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 h-full flex flex-col">
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground/40">
              <Package className="h-12 w-12" />
            </div>
          )}
          {product.product_categories && (
            <Badge className="absolute top-3 left-3" variant="secondary">
              {product.product_categories.name}
            </Badge>
          )}
        </div>
        <CardContent className="p-4 space-y-2 flex-1 flex flex-col">
          <h3 className="font-semibold line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {product.description}
          </p>

          {avgRating > 0 ? (
            <div className="flex items-center gap-1.5">
              <RatingStars value={avgRating} size="sm" />
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No reviews yet</p>
          )}

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-lg font-bold text-primary">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground ml-1">/{product.unit}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddToCart}
              disabled={addToCart.isPending || product.stock_quantity === 0}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
          {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
            <p className="text-xs text-destructive">Only {product.stock_quantity} left!</p>
          )}
          {product.stock_quantity === 0 && (
            <p className="text-xs text-destructive font-medium">Out of stock</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
