import { z } from "zod";

export const transferSchema = z.object({
  fk_lote: z.string().min(1, "El lote es requerido"),
  fk_origen: z.string().min(1, "El ambulatorio de origen es requerido"),
  fk_destino: z.string().min(1, "El ambulatorio de destino es requerido"),
  cantidad: z.number().min(1, "La cantidad debe ser mayor a 0"),
  fecha_traslado: z.string().min(1, "La fecha de traslado es requerida"),
});

export type TransferFormData = z.infer<typeof transferSchema>;
