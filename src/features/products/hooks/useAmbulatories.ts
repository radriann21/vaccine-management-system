import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ambulatoriesApi } from "../api/ambulatories.api";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import type { CreateAmbulatoryDTO, UpdateAmbulatoryDTO } from "../types/ambulatory.types";

export const useAmbulatories = () => {
  return useQuery({
    queryKey: queryKeys.ambulatories.lists(),
    queryFn: ambulatoriesApi.getAll,
  });
};

export const useAmbulatory = (id: string) => {
  return useQuery({
    queryKey: queryKeys.ambulatories.detail(id),
    queryFn: () => ambulatoriesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateAmbulatory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAmbulatoryDTO) => ambulatoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ambulatories.lists() });
      toaster.create({
        title: "Ambulatorio creado",
        description: "El ambulatorio se ha registrado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al crear ambulatorio",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};

export const useUpdateAmbulatory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAmbulatoryDTO }) =>
      ambulatoriesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ambulatories.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ambulatories.detail(variables.id) });
      toaster.create({
        title: "Ambulatorio actualizado",
        description: "Los cambios se han guardado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al actualizar ambulatorio",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};

export const useDeleteAmbulatory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ambulatoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ambulatories.lists() });
      toaster.create({
        title: "Ambulatorio eliminado",
        description: "El ambulatorio se ha eliminado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al eliminar ambulatorio",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};
