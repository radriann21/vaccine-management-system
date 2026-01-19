import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transfersApi } from "../api/transfers.api";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import type { CreateTransferDTO, UpdateTransferDTO } from "../types/transfer.types";

export const useTransfers = () => {
  return useQuery({
    queryKey: queryKeys.transfers.lists(),
    queryFn: transfersApi.getAll,
  });
};

export const useTransfer = (id: string) => {
  return useQuery({
    queryKey: queryKeys.transfers.detail(id),
    queryFn: () => transfersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransferDTO) => transfersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transfers.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.lotes.lists() });
      toaster.create({
        title: "Traslado creado",
        description: "El traslado se ha registrado exitosamente y el stock ha sido actualizado",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al crear traslado",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};

export const useUpdateTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTransferDTO }) =>
      transfersApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transfers.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.transfers.detail(variables.id) });
      toaster.create({
        title: "Traslado actualizado",
        description: "Los cambios se han guardado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al actualizar traslado",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};

export const useDeleteTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transfersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transfers.lists() });
      toaster.create({
        title: "Traslado eliminado",
        description: "El traslado se ha eliminado exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al eliminar traslado",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });
};
