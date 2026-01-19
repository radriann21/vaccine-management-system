import {
  Box,
  Heading,
  Text,
  Field,
  Input,
  Button,
  Fieldset,
} from "@chakra-ui/react";
import {
  ambulatorySchema,
  type AmbulatoryFormData,
} from "@/features/products/validations/products.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAmbulatory } from "../hooks/useAmbulatories";

export const AmbulatoryForm = () => {
  const createAmbulatory = useCreateAmbulatory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AmbulatoryFormData>({
    resolver: zodResolver(ambulatorySchema),
  });

  const onSubmit = (data: AmbulatoryFormData) => {
    createAmbulatory.mutate(data, {
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
          Nuevo Ambulatorio
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Completa los datos de la sede
        </Text>
      </Box>

      <Fieldset.Root display="flex" flexDirection="column" gap={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Content>
            <Field.Root required invalid={!!errors.nombre}>
              <Field.Label>
                Nombre
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Ej: Centro de Salud Norte"
                size="md"
                {...register("nombre")}
              />
              {
                errors.nombre && (
                  <Field.ErrorText>{errors.nombre.message}</Field.ErrorText>
                )
              }
            </Field.Root>

            <Field.Root required invalid={!!errors.ubicacion}>
              <Field.Label>
                Ubicación
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Ej: Calle Principal 123"
                size="md"
                {...register("ubicacion")}
              />
              {
                errors.ubicacion && (
                  <Field.ErrorText>{errors.ubicacion.message}</Field.ErrorText>
                )
              }
            </Field.Root>

            <Field.Root invalid={!!errors.responsable}>
              <Field.Label>Responsable</Field.Label>
              <Input
                placeholder="Nombre del responsable"
                size="md"
                {...register("responsable")}
              />
              {
                errors.responsable && (
                  <Field.ErrorText>{errors.responsable.message}</Field.ErrorText>
                )
              }
            </Field.Root>

            <Field.Root invalid={!!errors.telefono}>
              <Field.Label>Teléfono</Field.Label>
              <Input
                placeholder="+58 212 123 4567"
                size="md"
                {...register("telefono")}
              />
              {
                errors.telefono && (
                  <Field.ErrorText>{errors.telefono.message}</Field.ErrorText>
                )
              }
            </Field.Root>

            <Button
              type="submit"
              bg="#81C784"
              color="white"
              w="full"
              mt={2}
              _hover={{ bg: "#66BB6A" }}
              loading={createAmbulatory.isPending}
            >
              Agregar Ambulatorio
            </Button>
          </Fieldset.Content>
        </form>
      </Fieldset.Root>
    </Box>
  );
};
