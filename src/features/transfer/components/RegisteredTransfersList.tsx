import { Box, Heading, Text, Button, Flex, Spinner, Center } from "@chakra-ui/react";
import { useTransfers, useDeleteTransfer } from "../hooks/useTransfers";
import { EditTransferModal } from "./EditTransferModal";

export const RegisteredTransfersList = () => {
  const { data: transfers = [], isLoading, isError } = useTransfers();
  const deleteTransfer = useDeleteTransfer();

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
          Error al cargar los traslados
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
          Traslados Registrados
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {transfers.length} traslado(s) en el sistema
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        {transfers.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Text color="gray.400" fontSize="lg" mb={2}>
              No hay traslados registrados aún
            </Text>
            <Text color="gray.500" fontSize="sm">
              Crea uno usando el formulario
            </Text>
          </Box>
        ) : (
          transfers.map((transfer) => (
            <Box
              key={transfer.id}
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
                    Traslado - {new Date(transfer.fecha_traslado).toLocaleDateString()}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    <Text as="span" fontWeight="medium">Cantidad:</Text> {transfer.cantidad} unidades
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    <Text as="span" fontWeight="medium">Lote:</Text> {transfer.lote?.codigo_lote || transfer.fk_lote}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    <Text as="span" fontWeight="medium">Origen:</Text> {transfer.origen?.nombre || transfer.fk_origen}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <Text as="span" fontWeight="medium">Destino:</Text> {transfer.destino?.nombre || transfer.fk_destino}
                  </Text>
                </Box>
                <Flex gap={2}>
                  <EditTransferModal transfer={transfer} />
                  <Button
                    variant="ghost"
                    colorPalette="pink"
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`¿Estás seguro de eliminar este traslado?`)) {
                        deleteTransfer.mutate(transfer.id);
                      }
                    }}
                    loading={deleteTransfer.isPending}
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
