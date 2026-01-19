import {
  Button,
  Field,
  Input,
  Fieldset,
  Dialog,
  Flex,
  NativeSelectRoot,
  NativeSelectField,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transferSchema,
  type TransferFormData,
} from "../validations/transfer.validation";
import { useUpdateTransfer } from "../hooks/useTransfers";
import { useLotes } from "@/features/stockControl/hooks/useLotes";
import { useAmbulatories } from "@/features/products/hooks/useAmbulatories";
import type { Transfer } from "../types/transfer.types";
import { useState } from "react";

interface EditTransferModalProps {
  transfer: Transfer;
}

export const EditTransferModal = ({ transfer }: EditTransferModalProps) => {
  const [open, setOpen] = useState(false);
  const updateTransfer = useUpdateTransfer();
  const { data: lotes = [], isLoading: loadingLotes } = useLotes();
  const { data: ambulatories = [], isLoading: loadingAmbulatories } = useAmbulatories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fk_lote: transfer.fk_lote,
      fk_origen: transfer.fk_origen,
      fk_destino: transfer.fk_destino,
      cantidad: transfer.cantidad,
      fecha_traslado: transfer.fecha_traslado,
    },
  });

  const onSubmit = (data: TransferFormData) => {
    updateTransfer.mutate(
      { id: transfer.id, data },
      {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      }
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          colorPalette="cyan"
        >
          Editar
        </Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="500px">
          <Dialog.Header>
            <Dialog.Title>Editar Traslado</Dialog.Title>
          </Dialog.Header>

          <Dialog.CloseTrigger />

          <Dialog.Body>
            <Fieldset.Root>
              <form id="edit-transfer-form" onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Content display="flex" flexDirection="column" gap={4}>
                  <Field.Root required invalid={!!errors.fk_lote}>
                    <Field.Label>
                      Lote
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <NativeSelectRoot disabled={loadingLotes}>
                      <NativeSelectField
                        placeholder="Selecciona un lote"
                        {...register("fk_lote")}
                      >
                        {lotes.map((lote) => (
                          <option key={lote.id} value={lote.id}>
                            {lote.codigo_lote} (Stock: {lote.stock_actual})
                          </option>
                        ))}
                      </NativeSelectField>
                    </NativeSelectRoot>
                    {errors.fk_lote && (
                      <Field.ErrorText>{errors.fk_lote.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root required invalid={!!errors.fk_origen}>
                    <Field.Label>
                      Origen (Ambulatorio)
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <NativeSelectRoot disabled={loadingAmbulatories}>
                      <NativeSelectField
                        placeholder="Selecciona ambulatorio de origen"
                        {...register("fk_origen")}
                      >
                        {ambulatories.map((ambulatory) => (
                          <option key={ambulatory.id} value={ambulatory.id}>
                            {ambulatory.nombre}
                          </option>
                        ))}
                      </NativeSelectField>
                    </NativeSelectRoot>
                    {errors.fk_origen && (
                      <Field.ErrorText>{errors.fk_origen.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root required invalid={!!errors.fk_destino}>
                    <Field.Label>
                      Destino (Ambulatorio)
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <NativeSelectRoot disabled={loadingAmbulatories}>
                      <NativeSelectField
                        placeholder="Selecciona ambulatorio de destino"
                        {...register("fk_destino")}
                      >
                        {ambulatories.map((ambulatory) => (
                          <option key={ambulatory.id} value={ambulatory.id}>
                            {ambulatory.nombre}
                          </option>
                        ))}
                      </NativeSelectField>
                    </NativeSelectRoot>
                    {errors.fk_destino && (
                      <Field.ErrorText>{errors.fk_destino.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root required invalid={!!errors.cantidad}>
                    <Field.Label>
                      Cantidad
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="number"
                      placeholder="Ej: 250"
                      {...register("cantidad", { valueAsNumber: true })}
                    />
                    {errors.cantidad && (
                      <Field.ErrorText>{errors.cantidad.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root required invalid={!!errors.fecha_traslado}>
                    <Field.Label>
                      Fecha de Traslado
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="date"
                      {...register("fecha_traslado")}
                    />
                    {errors.fecha_traslado && (
                      <Field.ErrorText>{errors.fecha_traslado.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                </Fieldset.Content>
              </form>
            </Fieldset.Root>
          </Dialog.Body>

          <Dialog.Footer>
            <Flex gap={3} w="full" justify="flex-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                form="edit-transfer-form"
                bg="#9575CD"
                color="white"
                _hover={{ bg: "#7E57C2" }}
                loading={updateTransfer.isPending}
              >
                Guardar Cambios
              </Button>
            </Flex>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
