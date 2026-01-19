import { Box, Heading, Text, Button, Flex, Spinner, Center } from "@chakra-ui/react";
import { useLotes, useDeleteLote } from "../hooks/useLotes";
import { EditLoteModal } from "./EditLoteModal";

export const RegisteredLotesList = () => {
  const { data: lotes = [], isLoading, isError } = useLotes();
  const deleteLote = useDeleteLote();

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
          <Spinner size="lg" color="#5B3FFF" />
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
        <Text color="red.500" textAlign="center" py={8}>
          Error al cargar los lotes
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
          Lotes Registrados
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {lotes.length} lote(s) en el sistema
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        {lotes.length === 0 ? (
          <Text color="gray.500" textAlign="center" py={8}>
            No hay lotes registrados
          </Text>
        ) : (
          lotes.map((lote) => (
            <Box
              key={lote.id}
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
                    {lote.codigo_lote}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    <Text as="span" fontWeight="medium">ID Vacuna:</Text> {lote.fk_vacunas}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    <Text as="span" fontWeight="medium">Cantidad Total:</Text> {lote.cantidad_total} dosis
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    <Text as="span" fontWeight="medium">Stock Actual:</Text> {lote.stock_actual} dosis
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <Text as="span" fontWeight="medium">Vencimiento:</Text> {lote.fecha_vencimiento}
                  </Text>
                </Box>
                <Flex gap={2}>
                  <EditLoteModal lote={lote} />
                  <Button
                    variant="ghost"
                    colorPalette="red"
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`¿Estás seguro de eliminar el lote "${lote.codigo_lote}"?`)) {
                        deleteLote.mutate(lote.id);
                      }
                    }}
                    loading={deleteLote.isPending}
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
