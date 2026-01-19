import {
  Button,
  Field,
  Input,
  Fieldset,
  Dialog,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ambulatorySchema,
  type AmbulatoryFormData,
} from "../validations/products.validation";
import { useUpdateAmbulatory } from "../hooks/useAmbulatories";
import type { Ambulatory } from "../types/ambulatory.types";
import { useState } from "react";

interface EditAmbulatoryModalProps {
  ambulatory: Ambulatory;
}

export const EditAmbulatoryModal = ({ ambulatory }: EditAmbulatoryModalProps) => {
  const [open, setOpen] = useState(false);
  const updateAmbulatory = useUpdateAmbulatory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AmbulatoryFormData>({
    resolver: zodResolver(ambulatorySchema),
    defaultValues: {
      nombre: ambulatory.nombre,
      ubicacion: ambulatory.ubicacion,
      responsable: ambulatory.responsable || "",
      telefono: ambulatory.telefono || "",
    },
  });

  const onSubmit = (data: AmbulatoryFormData) => {
    updateAmbulatory.mutate(
      { id: ambulatory.id, data },
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
            <Dialog.Title>Editar Ambulatorio</Dialog.Title>
          </Dialog.Header>

          <Dialog.CloseTrigger />

          <Dialog.Body>
            <Fieldset.Root>
              <form id="edit-ambulatory-form" onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Content display="flex" flexDirection="column" gap={4}>
                  <Field.Root required invalid={!!errors.nombre}>
                    <Field.Label>
                      Nombre
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      placeholder="Ej: Centro de Salud Norte"
                      {...register("nombre")}
                    />
                    {errors.nombre && (
                      <Field.ErrorText>{errors.nombre.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root required invalid={!!errors.ubicacion}>
                    <Field.Label>
                      Ubicación
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      placeholder="Ej: Calle Principal 123"
                      {...register("ubicacion")}
                    />
                    {errors.ubicacion && (
                      <Field.ErrorText>{errors.ubicacion.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root invalid={!!errors.responsable}>
                    <Field.Label>Responsable</Field.Label>
                    <Input
                      placeholder="Nombre del responsable"
                      {...register("responsable")}
                    />
                    {errors.responsable && (
                      <Field.ErrorText>{errors.responsable.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root invalid={!!errors.telefono}>
                    <Field.Label>Teléfono</Field.Label>
                    <Input
                      placeholder="+58 212 123 4567"
                      {...register("telefono")}
                    />
                    {errors.telefono && (
                      <Field.ErrorText>{errors.telefono.message}</Field.ErrorText>
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
                form="edit-ambulatory-form"
                bg="#9575CD"
                color="white"
                _hover={{ bg: "#7E57C2" }}
                loading={updateAmbulatory.isPending}
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
