import { Box, Heading, Text, Field, Input, Button, NativeSelectRoot, NativeSelectField, Fieldset } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transferSchema, type TransferFormData } from "../validations/transfer.validation";
import { useCreateTransfer } from "../hooks/useTransfers";
import { useLotes } from "@/features/stockControl/hooks/useLotes";
import { useAmbulatories } from "@/features/products/hooks/useAmbulatories";

export const TransferForm = () => {
  const createTransfer = useCreateTransfer();
  const { data: lotes = [], isLoading: loadingLotes } = useLotes();
  const { data: ambulatories = [], isLoading: loadingAmbulatories } = useAmbulatories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  });

  const onSubmit = (data: TransferFormData) => {
    createTransfer.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
    >
      <Box mb={6}>
        <Heading size="md" mb={1}>
          Nuevo Traslado
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Registra un traslado
        </Text>
      </Box>

      <Fieldset.Root>
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <Button
              type="submit"
              bg="#F59E0B"
              color="white"
              w="full"
              mt={2}
              _hover={{ bg: "#D97706" }}
              loading={createTransfer.isPending}
            >
              Registrar Traslado
            </Button>
          </Fieldset.Content>
        </form>
      </Fieldset.Root>
    </Box>
  );
};
