import { supabase } from "@/shared/api/supabase";
import type { Lote, CreateLoteDTO, UpdateLoteDTO } from "../types/lote.types";

export const lotesApi = {
  getAll: async (): Promise<Lote[]> => {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },

  getById: async (id: string): Promise<Lote> => {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  create: async (lote: CreateLoteDTO): Promise<Lote> => {
    const { data, error } = await supabase
      .from("lotes")
      .insert([lote])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  update: async (id: string, lote: UpdateLoteDTO): Promise<Lote> => {
    const { data, error } = await supabase
      .from("lotes")
      .update(lote)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("lotes")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  },
};
