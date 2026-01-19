import { Box, Heading, Text, Grid, Button } from "@chakra-ui/react";
import { DashboardLayout } from "@/shared/layouts/DashboardLayout";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { AmbulatoryForm } from "@/features/products/components/AmbulatoryForm";
import { RegisteredAmbulatoriesList } from "@/features/products/components/RegisteredAmbulatoriesList";

export default function Products() {
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
          Ingresar Ambulatorios
        </Heading>
        <Text color="gray.600">
          Crea y gestiona nuevas sedes de ambulatorios
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", lg: "400px 1fr" }}
        gap={6}
        alignItems="start"
      >
        <AmbulatoryForm />
        <RegisteredAmbulatoriesList />
      </Grid>
    </DashboardLayout>
  );
}
