import { z } from "zod";

export const vaccineSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  tipo: z.string().min(1, "El tipo es requerido"),
});

export type VaccineFormData = z.infer<typeof vaccineSchema>;
