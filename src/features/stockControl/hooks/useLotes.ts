import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lotesApi } from "../api/lotes.api";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import type { CreateLoteDTO, UpdateLoteDTO } from "../types/lote.types";

export const useLotes = () => {
  return useQuery({
    queryKey: queryKeys.lotes.lists(),
    queryFn: lotesApi.getAll,
  });
};

export const useLote = (id: string) => {
  return useQuery({
    queryKey: queryKeys.lotes.detail(id),
    queryFn: () => lotesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLoteDTO) => lotesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lotes.lists() });
      toaster.create({
        title: "Lote creado",
        description: "El lote se ha registrado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al crear lote",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};

export const useUpdateLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLoteDTO }) =>
      lotesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lotes.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.lotes.detail(variables.id) });
      toaster.create({
        title: "Lote actualizado",
        description: "Los cambios se han guardado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al actualizar lote",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};

export const useDeleteLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lotesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lotes.lists() });
      toaster.create({
        title: "Lote eliminado",
        description: "El lote se ha eliminado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al eliminar lote",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};
