import { z } from "zod";

export const loteSchema = z.object({
  fk_vacunas: z.string().min(1, "La vacuna es requerida"),
  codigo_lote: z.string().min(1, "El código de lote es requerido"),
  fecha_vencimiento: z.string().min(1, "La fecha de vencimiento es requerida"),
  cantidad_total: z.number().min(1, "La cantidad debe ser mayor a 0"),
  stock_actual: z.number().min(0, "El stock actual no puede ser negativo"),
});

export type LoteFormData = z.infer<typeof loteSchema>;
