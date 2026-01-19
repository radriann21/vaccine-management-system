import { Box, Heading, Text, Button, Flex, Spinner, Center } from "@chakra-ui/react";
import { useVaccines, useDeleteVaccine } from "../hooks/useVaccines";
import { EditVaccineModal } from "./EditVaccineModal";

export const RegisteredVaccinesList = () => {
  const { data: vaccines = [], isLoading, isError } = useVaccines();
  const deleteVaccine = useDeleteVaccine();

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
          Error al cargar las vacunas
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
          Vacunas Registradas
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {vaccines.length} vacuna(s) en el sistema
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        {vaccines.length === 0 ? (
          <Text color="gray.500" textAlign="center" py={8}>
            No hay vacunas registradas
          </Text>
        ) : (
          vaccines.map((vaccine) => (
            <Box
              key={vaccine.id}
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
                    {vaccine.nombre}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    <Text as="span" fontWeight="medium">Tipo:</Text> {vaccine.tipo}
                  </Text>
                </Box>
                <Flex gap={2}>
                  <EditVaccineModal vaccine={vaccine} />
                  <Button
                    variant="ghost"
                    colorPalette="pink"
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`¿Estás seguro de eliminar "${vaccine.nombre}"?`)) {
                        deleteVaccine.mutate(vaccine.id);
                      }
                    }}
                    loading={deleteVaccine.isPending}
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
