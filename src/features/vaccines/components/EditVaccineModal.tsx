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
  vaccineSchema,
  type VaccineFormData,
} from "../validations/vaccine.validation";
import { useUpdateVaccine } from "../hooks/useVaccines";
import type { Vaccine } from "../types/vaccine.types";
import { useState } from "react";

interface EditVaccineModalProps {
  vaccine: Vaccine;
}

export const EditVaccineModal = ({ vaccine }: EditVaccineModalProps) => {
  const [open, setOpen] = useState(false);
  const updateVaccine = useUpdateVaccine();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VaccineFormData>({
    resolver: zodResolver(vaccineSchema),
    defaultValues: {
      nombre: vaccine.nombre,
      tipo: vaccine.tipo,
    },
  });

  const onSubmit = (data: VaccineFormData) => {
    updateVaccine.mutate(
      { id: vaccine.id, data },
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
            <Dialog.Title>Editar Vacuna</Dialog.Title>
          </Dialog.Header>

          <Dialog.CloseTrigger />

          <Dialog.Body>
            <Fieldset.Root>
              <form id="edit-vaccine-form" onSubmit={handleSubmit(onSubmit)}>
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
                form="edit-vaccine-form"
                bg="#9575CD"
                color="white"
                _hover={{ bg: "#7E57C2" }}
                loading={updateVaccine.isPending}
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
