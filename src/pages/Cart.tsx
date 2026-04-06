import { Layout } from "@/components/layout/Layout";
import { useCart, useUpdateCartItem, useRemoveCartItem } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function Cart() {
  const { data: cartItems, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  const total = cartItems?.reduce((sum: number, item: any) => sum + Number(item.products.price) * item.quantity, 0) ?? 0;

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 space-y-4">
          <Skeleton className="h-8 w-48" />
          {[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      </Layout>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center space-y-4">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground">Browse the marketplace to find products</p>
          <Button asChild><Link to="/marketplace">Go to Marketplace</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: any) => (
              <Card key={item.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-20 w-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    {item.products.image_url ? (
                      <img src={item.products.image_url} alt={item.products.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground/30">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/marketplace/${item.products.id}`} className="font-semibold hover:text-primary line-clamp-1">
                      {item.products.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">${Number(item.products.price).toFixed(2)} / {item.products.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateItem.mutate({ id: item.id, quantity: item.quantity - 1 })}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateItem.mutate({ id: item.id, quantity: item.quantity + 1 })}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-semibold w-20 text-right">${(Number(item.products.price) * item.quantity).toFixed(2)}</span>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeItem.mutate(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="h-fit sticky top-20">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-green-600">Free</span></div>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link to="/checkout">Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
