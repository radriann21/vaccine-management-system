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
  loteSchema,
  type LoteFormData,
} from "../validations/lote.validation";
import { useUpdateLote } from "../hooks/useLotes";
import { useVaccines } from "@/features/vaccines/hooks/useVaccines";
import type { Lote } from "../types/lote.types";
import { useState } from "react";

interface EditLoteModalProps {
  lote: Lote;
}

export const EditLoteModal = ({ lote }: EditLoteModalProps) => {
  const [open, setOpen] = useState(false);
  const updateLote = useUpdateLote();
  const { data: vaccines = [], isLoading: loadingVaccines } = useVaccines();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoteFormData>({
    resolver: zodResolver(loteSchema),
    defaultValues: {
      codigo_lote: lote.codigo_lote,
      fk_vacunas: lote.fk_vacunas,
      cantidad_total: lote.cantidad_total,
      stock_actual: lote.stock_actual,
      fecha_vencimiento: lote.fecha_vencimiento,
    },
  });

  const onSubmit = (data: LoteFormData) => {
    updateLote.mutate(
      { id: lote.id, data },
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
            <Dialog.Title>Editar Lote</Dialog.Title>
          </Dialog.Header>

          <Dialog.CloseTrigger />

          <Dialog.Body>
            <Fieldset.Root>
              <form id="edit-lote-form" onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Content display="flex" flexDirection="column" gap={4}>
                  <Field.Root required invalid={!!errors.codigo_lote}>
                    <Field.Label>
                      Código de Lote
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      placeholder="Ej: LOT-2024-001"
                      {...register("codigo_lote")}
                    />
                    {errors.codigo_lote && (
                      <Field.ErrorText>{errors.codigo_lote.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root required invalid={!!errors.fk_vacunas}>
                    <Field.Label>
                      Vacuna
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <NativeSelectRoot disabled={loadingVaccines}>
                      <NativeSelectField
                        placeholder="Selecciona una vacuna"
                        {...register("fk_vacunas")}
                      >
                        {vaccines.map((vaccine) => (
                          <option key={vaccine.id} value={vaccine.id}>
                            {vaccine.nombre} - {vaccine.tipo}
                          </option>
                        ))}
                      </NativeSelectField>
                    </NativeSelectRoot>
                    {errors.fk_vacunas && (
                      <Field.ErrorText>{errors.fk_vacunas.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root required invalid={!!errors.cantidad_total}>
                    <Field.Label>
                      Cantidad Total
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="number"
                      placeholder="Ej: 500"
                      {...register("cantidad_total")}
                    />
                    {errors.cantidad_total && (
                      <Field.ErrorText>{errors.cantidad_total.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root required invalid={!!errors.stock_actual}>
                    <Field.Label>
                      Stock Actual
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="number"
                      placeholder="Ej: 500"
                      {...register("stock_actual")}
                    />
                    {errors.stock_actual && (
                      <Field.ErrorText>{errors.stock_actual.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root required invalid={!!errors.fecha_vencimiento}>
                    <Field.Label>
                      Fecha de Vencimiento
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="date"
                      {...register("fecha_vencimiento")}
                    />
                    {errors.fecha_vencimiento && (
                      <Field.ErrorText>{errors.fecha_vencimiento.message}</Field.ErrorText>
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
                form="edit-lote-form"
                bg="#9575CD"
                color="white"
                _hover={{ bg: "#7E57C2" }}
                loading={updateLote.isPending}
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
