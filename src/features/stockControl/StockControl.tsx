import { Box, Heading, Text, Grid, Button } from "@chakra-ui/react";
import { DashboardLayout } from "@/shared/layouts/DashboardLayout";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { LoteForm } from "@/features/stockControl/components/LoteForm";
import { RegisteredLotesList } from "@/features/stockControl/components/RegisteredLotesList";

export default function StockControl() {
  const navigate = useNavigate();

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
