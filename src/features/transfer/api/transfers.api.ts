import { supabase } from "@/shared/api/supabase";
import type { Transfer, TransferWithDetails, CreateTransferDTO, UpdateTransferDTO } from "../types/transfer.types";

export const transfersApi = {
  getAll: async (): Promise<TransferWithDetails[]> => {
    const { data, error } = await supabase
      .from("traslados")
      .select(`
        *,
        lote:lotes!fk_lote(codigo_lote),
        origen:ambulatorios!fk_origen(nombre),
        destino:ambulatorios!fk_destino(nombre)
      `)
      .order("fecha_traslado", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },

  getById: async (id: string): Promise<Transfer> => {
    const { data, error } = await supabase
      .from("traslados")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  create: async (transfer: CreateTransferDTO): Promise<Transfer> => {
    const { data: lote, error: loteError } = await supabase
      .from("lotes")
      .select("stock_actual")
      .eq("id", transfer.fk_lote)
      .single();

    if (loteError) {
      throw new Error("Error al verificar el lote: " + loteError.message);
    }

    if (!lote || lote.stock_actual < transfer.cantidad) {
      throw new Error("Stock insuficiente en el lote seleccionado");
    }

    const { data, error } = await supabase
      .from("traslados")
      .insert([transfer])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const newStock = lote.stock_actual - transfer.cantidad;
    const { error: updateError } = await supabase
      .from("lotes")
      .update({ stock_actual: newStock })
      .eq("id", transfer.fk_lote);

    if (updateError) {
      throw new Error("Error al actualizar el stock: " + updateError.message);
    }

    return data;
  },

  update: async (id: string, transfer: UpdateTransferDTO): Promise<Transfer> => {
    const { data, error } = await supabase
      .from("traslados")
      .update(transfer)
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
      .from("traslados")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  },
};
