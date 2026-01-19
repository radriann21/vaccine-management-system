import { supabase } from "@/shared/api/supabase";
import type { LoteExportData, TransferExportData, AmbulatorioExportData } from "../types/export.types";

export const exportApi = {
  getLotesForExport: async (): Promise<LoteExportData[]> => {
    const { data, error } = await supabase
      .from("lotes")
      .select(`
        codigo_lote,
        fecha_vencimiento,
        cantidad_total,
        stock_actual,
        created_at,
        vacunas!fk_vacunas(nombre)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map((item) => {
      const vacuna = item.vacunas as unknown as { nombre: string } | null;
      return {
        codigo_lote: item.codigo_lote,
        vacuna: vacuna?.nombre || "N/A",
        fecha_vencimiento: item.fecha_vencimiento,
        cantidad_total: item.cantidad_total,
        stock_actual: item.stock_actual,
        fecha_registro: item.created_at,
      };
    });
  },

  getTransfersForExport: async (): Promise<TransferExportData[]> => {
    const { data, error } = await supabase
      .from("traslados")
      .select(`
        cantidad,
        fecha_traslado,
        created_at,
        lotes!fk_lote(codigo_lote),
        origen:ambulatorios!fk_origen(nombre),
        destino:ambulatorios!fk_destino(nombre)
      `)
      .order("fecha_traslado", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map((item) => {
      const lote = item.lotes as unknown as { codigo_lote: string } | null;
      const origen = item.origen as unknown as { nombre: string } | null;
      const destino = item.destino as unknown as { nombre: string } | null;
      return {
        codigo_lote: lote?.codigo_lote || "N/A",
        origen: origen?.nombre || "N/A",
        destino: destino?.nombre || "N/A",
        cantidad: item.cantidad,
        fecha_traslado: item.fecha_traslado,
        fecha_registro: item.created_at,
      };
    });
  },

  getAmbulatoriosForExport: async (): Promise<AmbulatorioExportData[]> => {
    const { data, error } = await supabase
      .from("ambulatorios")
      .select("nombre, direccion, telefono, created_at")
      .order("nombre", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map((item) => ({
      nombre: item.nombre,
      direccion: item.direccion,
      telefono: item.telefono,
      fecha_registro: item.created_at,
    }));
  },
};
