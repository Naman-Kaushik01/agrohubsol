import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useProducts(categorySlug?: string, search?: string) {
  return useQuery({
    queryKey: ["products", categorySlug, search],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*, product_categories(*), profiles!products_supplier_id_fkey(full_name), reviews(rating)")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (search) {
        query = query.ilike("name", `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      if (categorySlug && data) {
        return data.filter((p: any) => p.product_categories?.slug === categorySlug);
      }
      return data;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, product_categories(*), profiles!products_supplier_id_fkey(full_name), reviews(*)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });
}
