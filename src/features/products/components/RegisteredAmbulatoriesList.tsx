import { Box, Heading, Text, Button, Flex, Spinner, Center } from "@chakra-ui/react";
import { useAmbulatories, useDeleteAmbulatory } from "../hooks/useAmbulatories";
import { EditAmbulatoryModal } from "./EditAmbulatoryModal";

export const RegisteredAmbulatoriesList = () => {
  const { data: ambulatories = [], isLoading, isError } = useAmbulatories();
  const deleteAmbulatory = useDeleteAmbulatory();

  if (isLoading) {
    return (
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
      >
        <Center py={8}>
          <Spinner size="lg" color="#9575CD" />
        </Center>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text color="pink.400" textAlign="center" py={8}>
          Error al cargar los ambulatorios
        </Text>
      </Box>
    );
  }

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
          Ambulatorios Registrados
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {ambulatories.length} sede(s) en el sistema
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        {ambulatories.length === 0 ? (
          <Text color="gray.500" textAlign="center" py={8}>
            No hay ambulatorios registrados
          </Text>
        ) : (
          ambulatories.map((ambulatory) => (
            <Box
              key={ambulatory.id}
              p={4}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              _hover={{ borderColor: "gray.300", shadow: "sm" }}
              transition="all 0.2s"
            >
              <Flex justify="space-between" align="start">
                <Box flex="1">
                  <Heading size="sm" mb={2}>
                    {ambulatory.nombre}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    <Text as="span" fontWeight="medium">Ubicación:</Text> {ambulatory.ubicacion}
                  </Text>
                  {ambulatory.responsable && (
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      <Text as="span" fontWeight="medium">Responsable:</Text> {ambulatory.responsable}
                    </Text>
                  )}
                  {ambulatory.telefono && (
                    <Text fontSize="sm" color="gray.600">
                      <Text as="span" fontWeight="medium">Teléfono:</Text> {ambulatory.telefono}
                    </Text>
                  )}
                </Box>
                <Flex gap={2}>
                  <EditAmbulatoryModal ambulatory={ambulatory} />
                  <Button
                    variant="ghost"
                    colorPalette="pink"
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`¿Estás seguro de eliminar "${ambulatory.nombre}"?`)) {
                        deleteAmbulatory.mutate(ambulatory.id);
                      }
                    }}
                    loading={deleteAmbulatory.isPending}
                  >
                    Eliminar
                  </Button>
                </Flex>
              </Flex>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
