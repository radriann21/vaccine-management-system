import { Box, Heading, Text, Button, Flex, Spinner, Center, Badge } from "@chakra-ui/react";
import { useLotes, useDeleteLote } from "../hooks/useLotes";
import { EditLoteModal } from "./EditLoteModal";
import { useEffect } from "react";
import { checkAndAlertLowStock, getStockStatus } from "@/shared/utils/stockAlerts";

export const RegisteredLotesList = () => {
  const { data: lotes = [], isLoading, isError } = useLotes();
  const deleteLote = useDeleteLote();

  useEffect(() => {
    if (lotes.length > 0) {
      checkAndAlertLowStock(lotes);
    }
  }, [lotes]);

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
          lotes.map((lote) => {
            const stockStatus = getStockStatus(lote.stock_actual);
            return (
            <Box
              key={lote.id}
              p={4}
              border="1px solid"
              borderColor={lote.stock_actual < 100 ? "orange.200" : "gray.200"}
              borderRadius="md"
              bg={lote.stock_actual < 100 ? stockStatus.bgColor : "white"}
              _hover={{ borderColor: "gray.300", shadow: "sm" }}
              transition="all 0.2s"
            >
              <Flex justify="space-between" align="start">
                <Box flex="1">
                  <Flex align="center" gap={2} mb={2}>
                    <Heading size="sm">
                      {lote.codigo_lote}
                    </Heading>
                    {lote.stock_actual < 100 && (
                      <Badge colorPalette="orange" size="sm">
                        {stockStatus.label}
                      </Badge>
                    )}
                    {lote.stock_actual === 0 && (
                      <Badge colorPalette="pink" size="sm">
                        Sin stock
                      </Badge>
                    )}
                  </Flex>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    <Text as="span" fontWeight="medium">ID Vacuna:</Text> {lote.fk_vacunas}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    <Text as="span" fontWeight="medium">Cantidad Total:</Text> {lote.cantidad_total} dosis
                  </Text>
                  <Text fontSize="sm" color={stockStatus.color} mb={1} fontWeight="medium">
                    <Text as="span" fontWeight="bold">Stock Actual:</Text> {lote.stock_actual} dosis
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <Text as="span" fontWeight="medium">Vencimiento:</Text> {lote.fecha_vencimiento}
                  </Text>
                </Box>
                <Flex gap={2}>
                  <EditLoteModal lote={lote} />
                  <Button
                    variant="ghost"
                    colorPalette="pink"
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
          );
          })
        )}
      </Box>
    </Box>
  );
};
