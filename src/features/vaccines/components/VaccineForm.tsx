import { Box, Heading, Text, Field, Input, Button, Fieldset } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vaccineSchema, type VaccineFormData } from "../validations/vaccine.validation";
import { useCreateVaccine } from "../hooks/useVaccines";

export const VaccineForm = () => {
  const createVaccine = useCreateVaccine();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VaccineFormData>({
    resolver: zodResolver(vaccineSchema),
  });

  const onSubmit = (data: VaccineFormData) => {
    createVaccine.mutate(data, {
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
          Nueva Vacuna
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Registra una nueva vacuna en el sistema
        </Text>
      </Box>

      <Fieldset.Root>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Content display="flex" flexDirection="column" gap={4}>
            <Field.Root required invalid={!!errors.nombre}>
              <Field.Label>
                Nombre
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Ej: COVID-19, Influenza"
                {...register("nombre")}
              />
              {errors.nombre && (
                <Field.ErrorText>{errors.nombre.message}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!errors.tipo}>
              <Field.Label>
                Tipo
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Ej: ARNm, Virus inactivado"
                {...register("tipo")}
              />
              {errors.tipo && (
                <Field.ErrorText>{errors.tipo.message}</Field.ErrorText>
              )}
            </Field.Root>

            <Button
              type="submit"
              bg="#81C784"
              color="white"
              w="full"
              mt={2}
              _hover={{ bg: "#66BB6A" }}
              loading={createVaccine.isPending}
            >
              Agregar Vacuna
            </Button>
          </Fieldset.Content>
        </form>
      </Fieldset.Root>
    </Box>
  );
};
