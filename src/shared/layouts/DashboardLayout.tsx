import { Box, Container, Flex, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { useLogout } from "@/entities/session/hooks/useLogout";
import { Antenna } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logout, isLoading } = useLogout();

  return (
    <Box minH="100vh" bg="#F5F7FA">
      <Box as="header" bg="white" borderBottom="1px solid" borderColor="gray.200" py={4}>
        <Container maxW="1400px">
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={3}>
              <Icon p={2} bgColor="#5B3FFF" color="white" rounded="md">
                <Antenna size={24} />
              </Icon>
              <Box>
                <Heading size="md" fontWeight="bold">
                  Sistema de Inventario
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Gestión de Vacunas
                </Text>
              </Box>
            </Flex>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              loading={isLoading}
            >
              Cerrar Sesión
            </Button>
          </Flex>
        </Container>
      </Box>
      <Container maxW="1400px" py={8}>
        {children}
      </Container>
    </Box>
  );
};
