import { supabase } from "@/shared/api/supabase";
import type { Ambulatory, CreateAmbulatoryDTO, UpdateAmbulatoryDTO } from "../types/ambulatory.types";

export const ambulatoriesApi = {
  getAll: async (): Promise<Ambulatory[]> => {
    const { data, error } = await supabase
      .from("ambulatorios")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },

  getById: async (id: string): Promise<Ambulatory> => {
    const { data, error } = await supabase
      .from("ambulatorios")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  create: async (ambulatory: CreateAmbulatoryDTO): Promise<Ambulatory> => {
    const { data, error } = await supabase
      .from("ambulatorios")
      .insert([ambulatory])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  update: async (id: string, ambulatory: UpdateAmbulatoryDTO): Promise<Ambulatory> => {
    const { data, error } = await supabase
      .from("ambulatorios")
      .update(ambulatory)
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
      .from("ambulatorios")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  },
};
