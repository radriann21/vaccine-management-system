import { Box, Heading, Text, Field, Input, Button, Fieldset } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loteSchema, type LoteFormData } from "@/features/stockControl/validations/lote.validation";
import { useCreateLote } from "@/features/stockControl/hooks/useLotes";
import { useVaccines } from "@/features/vaccines/hooks/useVaccines";
import { NativeSelectRoot, NativeSelectField } from "@chakra-ui/react";

export const LoteForm = () => {
  const createLote = useCreateLote();
  const { data: vaccines = [], isLoading: loadingVaccines } = useVaccines();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoteFormData>({
    resolver: zodResolver(loteSchema),
  });

  const onSubmit = (data: LoteFormData) => {
    createLote.mutate(data, {
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
          Nuevo Lote
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Completa los datos del lote
        </Text>
      </Box>

      <Fieldset.Root>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("cantidad_total", { valueAsNumber: true })}
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
                {...register("stock_actual", { valueAsNumber: true })}
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

            <Button
              type="submit"
              bg="#5B3FFF"
              color="white"
              w="full"
              mt={2}
              _hover={{ bg: "#4A32CC" }}
              loading={createLote.isPending}
            >
              Agregar Lote
            </Button>
          </Fieldset.Content>
        </form>
      </Fieldset.Root>
    </Box>
  );
};
