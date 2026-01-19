import { supabase } from "@/shared/api/supabase";
import type { Vaccine, CreateVaccineDTO, UpdateVaccineDTO } from "../types/vaccine.types";

export const vaccinesApi = {
  getAll: async (): Promise<Vaccine[]> => {
    const { data, error } = await supabase
      .from("vacunas")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },

  getById: async (id: string): Promise<Vaccine> => {
    const { data, error } = await supabase
      .from("vacunas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  create: async (vaccine: CreateVaccineDTO): Promise<Vaccine> => {
    const { data, error } = await supabase
      .from("vacunas")
      .insert([vaccine])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  update: async (id: string, vaccine: UpdateVaccineDTO): Promise<Vaccine> => {
    const { data, error } = await supabase
      .from("vacunas")
      .update(vaccine)
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
      .from("vacunas")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  },
};
