import { useState } from "react";
import { exportApi } from "../api/export.api";
import { generateCSV, downloadCSV } from "@/shared/utils/csvExport";
import type { ExportType } from "../types/export.types";

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportLotes = async () => {
    setIsExporting(true);
    setError(null);
    try {
      const data = await exportApi.getLotesForExport();
      
      const csvContent = generateCSV(data, [
        { key: "codigo_lote", label: "Código de Lote" },
        { key: "vacuna", label: "Vacuna" },
        { key: "fecha_vencimiento", label: "Fecha de Vencimiento" },
        { key: "cantidad_total", label: "Cantidad Total" },
        { key: "stock_actual", label: "Stock Actual" },
        { key: "fecha_registro", label: "Fecha de Registro" },
      ]);

      const filename = `lotes_${new Date().toISOString().split("T")[0]}.csv`;
      downloadCSV(csvContent, filename);
      
      return { success: true, count: data.length };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al exportar lotes";
      setError(errorMessage);
      throw err;
    } finally {
      setIsExporting(false);
    }
  };

  const exportTransfers = async () => {
    setIsExporting(true);
    setError(null);
    try {
      const data = await exportApi.getTransfersForExport();
      
      const csvContent = generateCSV(data, [
        { key: "codigo_lote", label: "Código de Lote" },
        { key: "origen", label: "Ambulatorio Origen" },
        { key: "destino", label: "Ambulatorio Destino" },
        { key: "cantidad", label: "Cantidad" },
        { key: "fecha_traslado", label: "Fecha de Traslado" },
        { key: "fecha_registro", label: "Fecha de Registro" },
      ]);

      const filename = `traslados_${new Date().toISOString().split("T")[0]}.csv`;
      downloadCSV(csvContent, filename);
      
      return { success: true, count: data.length };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al exportar traslados";
      setError(errorMessage);
      throw err;
    } finally {
      setIsExporting(false);
    }
  };

  const exportAmbulatorios = async () => {
    setIsExporting(true);
    setError(null);
    try {
      const data = await exportApi.getAmbulatoriosForExport();
      
      const csvContent = generateCSV(data, [
        { key: "nombre", label: "Nombre" },
        { key: "direccion", label: "Dirección" },
        { key: "telefono", label: "Teléfono" },
        { key: "fecha_registro", label: "Fecha de Registro" },
      ]);

      const filename = `ambulatorios_${new Date().toISOString().split("T")[0]}.csv`;
      downloadCSV(csvContent, filename);
      
      return { success: true, count: data.length };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al exportar ambulatorios";
      setError(errorMessage);
      throw err;
    } finally {
      setIsExporting(false);
    }
  };

  const exportData = async (type: ExportType) => {
    switch (type) {
      case "lotes":
        return await exportLotes();
      case "traslados":
        return await exportTransfers();
      case "ambulatorios":
        return await exportAmbulatorios();
      default:
        throw new Error("Tipo de exportación no válido");
    }
  };

  return {
    isExporting,
    error,
    exportLotes,
    exportTransfers,
    exportAmbulatorios,
    exportData,
  };
};
