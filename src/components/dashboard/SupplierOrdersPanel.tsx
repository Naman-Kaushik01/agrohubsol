import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSupplierOrders, useUpdateOrderStatus } from "@/hooks/useSupplierData";
import { DollarSign, Package, ShoppingBag, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusOptions = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  pending: "secondary",
  confirmed: "outline",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

export function SupplierOrdersPanel() {
  const { data: items, isLoading } = useSupplierOrders();
  const updateStatus = useUpdateOrderStatus();
  const { toast } = useToast();

  const stats = useMemo(() => {
    if (!items) return { earnings: 0, orderCount: 0, unitsSold: 0 };
    const orderIds = new Set(items.map((i: any) => i.order_id));
    return {
      earnings: items.reduce(
        (sum: number, i: any) => sum + Number(i.unit_price) * i.quantity,
        0
      ),
      orderCount: orderIds.size,
      unitsSold: items.reduce((sum: number, i: any) => sum + i.quantity, 0),
    };
  }, [items]);

  // Group items by order
  const groupedOrders = useMemo(() => {
    if (!items) return [];
    const groups = new Map<string, { order: any; items: any[] }>();
    items.forEach((i: any) => {
      const existing = groups.get(i.order_id);
      if (existing) {
        existing.items.push(i);
      } else {
        groups.set(i.order_id, { order: i.orders, items: [i] });
      }
    });
    return Array.from(groups.values()).sort(
      (a, b) =>
        new Date(b.order?.created_at).getTime() - new Date(a.order?.created_at).getTime()
    );
  }, [items]);

  const handleStatusChange = (orderId: string, status: string) => {
    updateStatus.mutate(
      { orderId, status },
      {
        onSuccess: () => toast({ title: `Order marked as ${status}` }),
        onError: (err: any) =>
          toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  return (
    <div className="space-y-5">
      {/* Earnings overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Earnings</p>
              <p className="text-xl font-bold">${stats.earnings.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Orders Received</p>
              <p className="text-xl font-bold">{stats.orderCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Package className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Units Sold</p>
              <p className="text-xl font-bold">{stats.unitsSold}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders list */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : groupedOrders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No orders for your products yet
            </p>
          ) : (
            <div className="space-y-4">
              {groupedOrders.map(({ order, items }) => {
                if (!order) return null;
                const subtotal = items.reduce(
                  (s: number, i: any) => s + Number(i.unit_price) * i.quantity,
                  0
                );
                return (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 space-y-3 bg-card"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-sm">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={statusVariant[order.status]} className="capitalize">
                          {order.status}
                        </Badge>
                        <Select
                          value={order.status}
                          onValueChange={(v) => handleStatusChange(order.id, v)}
                        >
                          <SelectTrigger className="w-36 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((s) => (
                              <SelectItem key={s} value={s} className="capitalize">
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5 border-t pt-3">
                      {items.map((it: any) => (
                        <div
                          key={it.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-foreground/85">
                            {it.products?.name} × {it.quantity} {it.products?.unit}
                          </span>
                          <span className="font-medium">
                            ${(Number(it.unit_price) * it.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm pt-2 border-t mt-2">
                        <span className="font-semibold">Your subtotal</span>
                        <span className="font-bold text-primary">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {order.shipping_address && (
                      <p className="text-xs text-muted-foreground">
                        📍 {order.shipping_address}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
