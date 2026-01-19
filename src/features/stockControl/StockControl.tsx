import { Box, Heading, Text, Grid, Button, Flex } from "@chakra-ui/react";
import { DashboardLayout } from "@/shared/layouts/DashboardLayout";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { LoteForm } from "@/features/stockControl/components/LoteForm";
import { RegisteredLotesList } from "@/features/stockControl/components/RegisteredLotesList";
import { useLotes } from "@/features/stockControl/hooks/useLotes";
import { checkLowStock } from "@/shared/utils/stockAlerts";

export default function StockControl() {
  const navigate = useNavigate();
  const { data: lotes = [] } = useLotes();
  
  const lowStockLotes = lotes.filter(checkLowStock);
  const outOfStockLotes = lotes.filter(lote => lote.stock_actual === 0);

  return (
    <DashboardLayout>
      <Box mb={6}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard")}
          mb={4}
        >
          <ArrowLeft size={16} />
          <Text ml={2}>Volver al Dashboard</Text>
        </Button>
        <Heading size="xl" mb={2}>
          Ingresar Lotes
        </Heading>
        <Text color="gray.600">
          Registra nuevos lotes de vacunas
        </Text>
      </Box>

      {lowStockLotes.length > 0 && (
        <Box
          bg="orange.50"
          border="1px solid"
          borderColor="orange.200"
          borderRadius="lg"
          p={4}
          mb={6}
        >
          <Flex align="center" gap={2} mb={2}>
            <AlertTriangle size={20} color="#F4B084" />
            <Heading size="sm" color="orange.500">
              Alerta de Stock Bajo
            </Heading>
          </Flex>
          <Text fontSize="sm" color="orange.500">
            {lowStockLotes.length} lote(s) con stock menor a 100 unidades
            {outOfStockLotes.length > 0 && (
              <Text as="span" fontWeight="bold" ml={2}>
                ({outOfStockLotes.length} sin stock)
              </Text>
            )}
          </Text>
        </Box>
      )}

      <Grid
        templateColumns={{ base: "1fr", lg: "400px 1fr" }}
        gap={6}
        alignItems="start"
      >
        <LoteForm />
        <RegisteredLotesList />
      </Grid>
    </DashboardLayout>
  );
}
