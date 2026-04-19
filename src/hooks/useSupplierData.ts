import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/** Fetches order_items belonging to the current supplier's products with order info */
export function useSupplierOrders() {
  const { profile, role } = useAuth();

  return useQuery({
    queryKey: ["supplier-orders", profile?.id],
    queryFn: async () => {
      if (!profile || role !== "supplier") return [];

      // 1. Get this supplier's product ids
      const { data: products, error: pErr } = await supabase
        .from("products")
        .select("id")
        .eq("supplier_id", profile.id);
      if (pErr) throw pErr;
      const productIds = (products ?? []).map((p) => p.id);
      if (productIds.length === 0) return [];

      // 2. Fetch order_items for those products with order details
      const { data, error } = await supabase
        .from("order_items")
        .select("*, products(name, image_url, unit), orders(id, status, created_at, shipping_address, user_id)")
        .in("product_id", productIds)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!profile && role === "supplier",
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status: status as any })
        .eq("id", orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["supplier-orders"] });
    },
  });
}
