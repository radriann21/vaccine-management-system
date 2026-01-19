import { Box, Button, Text, Stack, createToaster } from "@chakra-ui/react";
import { Download } from "lucide-react";
import { useExport } from "../hooks/useExport";
import type { ExportType } from "../types/export.types";

const toaster = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
});

interface ExportSectionProps {
  title: string;
  description: string;
  exportType: ExportType;
  buttonLabel: string;
}

export const ExportSection = ({
  title,
  description,
  exportType,
  buttonLabel,
}: ExportSectionProps) => {
  const { isExporting, exportData } = useExport();

  const handleExport = async () => {
    try {
      const result = await exportData(exportType);
      toaster.success({
        title: "Exportación exitosa",
        description: `Se han exportado ${result.count} registros correctamente`,
      });
    } catch (error) {
      toaster.error({
        title: "Error al exportar",
        description: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };

  return (
    <Stack gap={4} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="semibold" mb={1}>
          {title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </Box>
      <Button
        bg="#9575CD"
        color="white"
        size="lg"
        onClick={handleExport}
        loading={isExporting}
        _hover={{ bg: "#7E57C2" }}
      >
        <Download size={20} />
        {buttonLabel}
      </Button>
    </Stack>
  );
};
