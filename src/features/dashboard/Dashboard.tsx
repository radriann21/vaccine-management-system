import { Box, Heading, Text, Grid } from "@chakra-ui/react";
import { DashboardLayout } from "@/shared/layouts/DashboardLayout";
import { ModuleCard } from "./components/ModuleCard";
import { StatCard } from "./components/StatCard";
import { Package, Building2, Syringe, FileSpreadsheet, Pill } from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();

  const modules = [
    {
      icon: Package,
      title: "Ingresar Lotes",
      description: "Registra nuevos lotes de vacunas en el sistema",
      onAccess: () => navigate("/lotes"),
    },
    {
      icon: Building2,
      title: "Ingresar Ambulatorios",
      description: "Crea y gestiona nuevas sedes de ambulatorios",
      onAccess: () => navigate("/ambulatorios"),
    },
    {
      icon: Pill,
      title: "Gestión de Vacunas",
      description: "Administra el catálogo de vacunas disponibles",
      onAccess: () => navigate("/vacunas"),
    },
    {
      icon: Syringe,
      title: "Traslado de Vacunas",
      description: "Registra traslados entre ambulatorios",
      onAccess: () => navigate("/traslados"),
    },
    {
      icon: FileSpreadsheet,
      title: "Importar/Exportar",
      description: "Importa datos desde Excel o exporta reportes",
      onAccess: () => console.log("Acceder a Importar/Exportar"),
    },
  ];

  const statistics = [
    { value: 0, label: "Lotes Registrados", color: "#5B3FFF" },
    { value: 0, label: "Ambulatorios", color: "#10B981" },
    { value: 0, label: "Traslados", color: "#F59E0B" },
    { value: 0, label: "Últimos Reportes", color: "#8B5CF6" },
  ];

  return (
    <DashboardLayout>
      <Box mb={8}>
        <Heading size="xl" mb={2}>
          Bienvenido
        </Heading>
        <Text color="gray.600">
          Selecciona una funcionalidad para comenzar a trabajar
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        mb={8}
      >
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            icon={module.icon}
            title={module.title}
            description={module.description}
            onAccess={module.onAccess}
          />
        ))}
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
      >
        {statistics.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            color={stat.color}
          />
        ))}
      </Grid>
    </DashboardLayout>
  );
}
