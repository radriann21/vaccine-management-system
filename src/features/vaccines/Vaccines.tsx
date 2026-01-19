import { Box, Heading, Text, Grid, Button } from "@chakra-ui/react";
import { DashboardLayout } from "@/shared/layouts/DashboardLayout";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { VaccineForm } from "./components/VaccineForm";
import { RegisteredVaccinesList } from "./components/RegisteredVaccinesList";

export default function Vaccines() {
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
          Gestión de Vacunas
        </Heading>
        <Text color="gray.600">
          Administra el catálogo de vacunas disponibles
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", lg: "400px 1fr" }}
        gap={6}
        alignItems="start"
      >
        <VaccineForm />
        <RegisteredVaccinesList />
      </Grid>
    </DashboardLayout>
  );
}
