import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { data: cartItems } = useCart();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const total = cartItems?.reduce((sum: number, item: any) => sum + Number(item.products.price) * item.quantity, 0) ?? 0;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartItems || cartItems.length === 0) return;

    try {
      await createOrder.mutateAsync({
        items: cartItems.map((item: any) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: Number(item.products.price),
        })),
        totalAmount: total,
        shippingAddress: `${address}\nPhone: ${phone}`,
      });
      setSuccess(true);
    } catch (err: any) {
      toast({ title: "Checkout failed", description: err.message, variant: "destructive" });
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="container py-20 text-center space-y-4">
          <CheckCircle className="h-16 w-16 mx-auto text-green-600" />
          <h2 className="text-2xl font-bold">Order Placed!</h2>
          <p className="text-muted-foreground">Your order has been placed successfully. You can track it in your orders page.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/orders")}>View Orders</Button>
            <Button variant="outline" onClick={() => navigate("/marketplace")}>Continue Shopping</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleCheckout} className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Shipping Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Textarea id="address" placeholder="Enter your full address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 234 567 890" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {cartItems?.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.products.name} × {item.quantity}</span>
                  <span className="font-medium">${(Number(item.products.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full" disabled={createOrder.isPending}>
            {createOrder.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Place Order — ${total.toFixed(2)}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
