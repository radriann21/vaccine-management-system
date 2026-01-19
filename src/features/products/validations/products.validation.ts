import { z } from "zod";

export const ambulatorySchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  ubicacion: z.string().min(1, "La ubicación es requerida"),
  responsable: z.string().optional(),
  telefono: z.string().optional(),
});

export type AmbulatoryFormData = z.infer<typeof ambulatorySchema>;
