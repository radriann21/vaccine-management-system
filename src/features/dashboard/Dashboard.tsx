import { Box, Heading, Text, Grid } from "@chakra-ui/react";
import { DashboardLayout } from "@/shared/layouts/DashboardLayout";
import { ModuleCard } from "./components/ModuleCard";
import { StatCard } from "./components/StatCard";
import { Package, Building2, Syringe, FileSpreadsheet, Pill } from "lucide-react";
import { useNavigate } from "react-router";
import { useLotes } from "@/features/stockControl/hooks/useLotes";
import { useAmbulatories } from "@/features/products/hooks/useAmbulatories";
import { useTransfers } from "@/features/transfer/hooks/useTransfers";
import { useVaccines } from "@/features/vaccines/hooks/useVaccines";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: lotes = [] } = useLotes();
  const { data: ambulatories = [] } = useAmbulatories();
  const { data: transfers = [] } = useTransfers();
  const { data: vaccines = [] } = useVaccines();

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
      onAccess: () => navigate("/importar-exportar"),
    },
  ];

  const statistics = [
    { value: lotes.length, label: "Lotes Registrados", color: "#9575CD" },
    { value: ambulatories.length, label: "Ambulatorios", color: "#81C784" },
    { value: transfers.length, label: "Traslados", color: "#FF9F66" },
    { value: vaccines.length, label: "Vacunas Registradas", color: "#5B8DBE" },
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
