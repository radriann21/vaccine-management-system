import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vaccinesApi } from "../api/vaccines.api";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import type { CreateVaccineDTO, UpdateVaccineDTO } from "../../vaccines/types/vaccine.types";

export const useVaccines = () => {
  return useQuery({
    queryKey: queryKeys.vaccines.lists(),
    queryFn: vaccinesApi.getAll,
  });
};

export const useVaccine = (id: string) => {
  return useQuery({
    queryKey: queryKeys.vaccines.detail(id),
    queryFn: () => vaccinesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateVaccine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVaccineDTO) => vaccinesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vaccines.lists() });
      toaster.create({
        title: "Vacuna creada",
        description: "La vacuna se ha registrado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al crear vacuna",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};

export const useUpdateVaccine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVaccineDTO }) =>
      vaccinesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vaccines.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.vaccines.detail(variables.id) });
      toaster.create({
        title: "Vacuna actualizada",
        description: "Los cambios se han guardado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al actualizar vacuna",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};

export const useDeleteVaccine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => vaccinesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vaccines.lists() });
      toaster.create({
        title: "Vacuna eliminada",
        description: "La vacuna se ha eliminado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al eliminar vacuna",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};
