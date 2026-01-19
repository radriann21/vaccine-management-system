import { Box, Heading, Text, Grid, Card, Stack } from "@chakra-ui/react";
import { DashboardLayout } from "@/shared/layouts/DashboardLayout";
import { ExportSection } from "./components/ExportSection";
import { Download, Upload, FileSpreadsheet } from "lucide-react";

export default function DataExport() {
  return (
    <DashboardLayout>
      <Box mb={8}>
        <Heading size="xl" mb={2}>
          Importar/Exportar Datos
        </Heading>
        <Text color="gray.600">
          Gestiona la importación y exportación de datos del sistema
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        gap={8}
      >
        <Card.Root>
          <Card.Header>
            <Stack direction="row" align="center" gap={3}>
              <Box
                bg="blue.500"
                color="white"
                p={3}
                borderRadius="lg"
              >
                <Upload size={24} />
              </Box>
              <Box>
                <Card.Title fontSize="xl">Importar Datos</Card.Title>
                <Card.Description>
                  Sube un archivo Excel o CSV
                </Card.Description>
              </Box>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Box
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="lg"
              p={8}
              textAlign="center"
              bg="gray.50"
            >
              <FileSpreadsheet
                size={48}
                style={{ margin: "0 auto", color: "#D4AF37" }}
              />
              <Text mt={4} fontWeight="medium">
                Arrastra tu archivo aquí
              </Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                o haz clic para seleccionar
              </Text>
            </Box>
            <Box mt={4} p={4} bg="blue.50" borderRadius="md">
              <Text fontSize="sm" fontWeight="semibold" color="blue.700" mb={2}>
                Formatos Aceptados
              </Text>
              <Text fontSize="sm" color="blue.600">
                ✓ Excel (.xlsx, .xls)
              </Text>
              <Text fontSize="sm" color="blue.600">
                ✓ CSV (.csv)
              </Text>
              <Text fontSize="xs" color="blue.500" mt={2}>
                <strong>Nota:</strong> Asegúrate de que el archivo tenga las columnas correctas
                (Número de Lote, Vacuna, Cantidad, etc.)
              </Text>
            </Box>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Stack direction="row" align="center" gap={3}>
              <Box
                bg="purple.500"
                color="white"
                p={3}
                borderRadius="lg"
              >
                <Download size={24} />
              </Box>
              <Box>
                <Card.Title fontSize="xl">Exportar Datos</Card.Title>
                <Card.Description>
                  Descarga los datos en formato CSV
                </Card.Description>
              </Box>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Stack gap={6}>
              <ExportSection
                title="Exportar Lotes"
                description="Descarga todos los lotes registrados con su información completa"
                exportType="lotes"
                buttonLabel="Exportar Lotes"
              />
              
              <ExportSection
                title="Exportar Ambulatorios"
                description="Descarga la lista de ambulatorios con sus datos de contacto"
                exportType="ambulatorios"
                buttonLabel="Exportar Ambulatorios"
              />
              
              <ExportSection
                title="Exportar Traslados"
                description="Descarga el historial completo de traslados entre ambulatorios"
                exportType="traslados"
                buttonLabel="Exportar Traslados"
              />
            </Stack>

            <Box mt={6} p={4} bg="purple.50" borderRadius="md">
              <Text fontSize="sm" color="purple.700">
                <strong>Tipos de reportes:</strong> Puedes exportar lotes, ambulatorios o traslados
                con todos sus datos en formato CSV compatible con Excel.
              </Text>
            </Box>
          </Card.Body>
        </Card.Root>
      </Grid>
    </DashboardLayout>
  );
}
