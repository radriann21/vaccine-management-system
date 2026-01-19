import { toaster } from "@/shared/components/ui/toaster";
import type { Lote } from "@/features/stockControl/types/lote.types";

const LOW_STOCK_THRESHOLD = 100;

export const checkLowStock = (lote: Lote): boolean => {
  return lote.stock_actual < LOW_STOCK_THRESHOLD;
};

export const showLowStockAlert = (lote: Lote) => {
  toaster.create({
    title: "⚠️ Stock Bajo",
    description: `El lote "${lote.codigo_lote}" tiene solo ${lote.stock_actual} unidades disponibles`,
    type: "warning",
    duration: 5000,
  });
};

export const checkAndAlertLowStock = (lotes: Lote[]) => {
  const lowStockLotes = lotes.filter(checkLowStock);
  
  if (lowStockLotes.length > 0) {
    toaster.create({
      title: "⚠️ Alerta de Stock",
      description: `${lowStockLotes.length} lote(s) con stock bajo (< ${LOW_STOCK_THRESHOLD} unidades)`,
      type: "warning",
      duration: 6000,
    });
  }
  
  return lowStockLotes;
};

export const getStockStatus = (stock: number): {
  color: string;
  label: string;
  bgColor: string;
} => {
  if (stock === 0) {
    return {
      color: "red.400",
      label: "Sin stock",
      bgColor: "red.100",
    };
  }
  
  if (stock < LOW_STOCK_THRESHOLD) {
    return {
      color: "orange.400",
      label: "Stock bajo",
      bgColor: "orange.100",
    };
  }
  
  return {
    color: "green.400",
    label: "Stock normal",
    bgColor: "green.100",
  };
};
