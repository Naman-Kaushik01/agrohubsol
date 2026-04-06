import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useProduct } from "@/hooks/useProducts";
import { useAddToCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, ArrowLeft, Star, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id!);
  const { user } = useAuth();
  const addToCart = useAddToCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Button variant="ghost" className="mt-4" onClick={() => navigate("/marketplace")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
          </Button>
        </div>
      </Layout>
    );
  }

  const avgRating = product.reviews?.length
    ? (product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : null;

  const handleAdd = () => {
    if (!user) { navigate("/login"); return; }
    addToCart.mutate(
      { productId: product.id, quantity: qty },
      {
        onSuccess: () => toast({ title: "Added to cart", description: `${product.name} added to cart` }),
        onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  return (
    <Layout>
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate("/marketplace")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground/30">
                <Package className="h-24 w-24" />
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div>
              {product.product_categories && (
                <Badge variant="secondary" className="mb-2">{product.product_categories.name}</Badge>
              )}
              <h1 className="text-3xl font-bold">{product.name}</h1>
              {product.profiles && (
                <p className="text-sm text-muted-foreground mt-1">by {product.profiles.full_name}</p>
              )}
            </div>

            {avgRating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`h-4 w-4 ${s <= Math.round(Number(avgRating)) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium">{avgRating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
              </div>
            )}

            <div>
              <span className="text-3xl font-bold text-primary">${Number(product.price).toFixed(2)}</span>
              <span className="text-muted-foreground ml-1">/{product.unit}</span>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="text-sm">
              {product.stock_quantity > 0 ? (
                <span className="text-green-600 font-medium">✓ In Stock ({product.stock_quantity} available)</span>
              ) : (
                <span className="text-destructive font-medium">Out of Stock</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))}>-</Button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <Button variant="ghost" size="icon" onClick={() => setQty(Math.min(product.stock_quantity, qty + 1))}>+</Button>
              </div>
              <Button size="lg" onClick={handleAdd} disabled={addToCart.isPending || product.stock_quantity === 0}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="pt-6 border-t space-y-4">
                <h3 className="font-semibold text-lg">Reviews</h3>
                {product.reviews.map((review: any) => (
                  <div key={review.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`h-3 w-3 ${s <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'}`} />
                      ))}
                    </div>
                    {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
