import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onAccess: () => void;
}

export const ModuleCard = ({ icon: Icon, title, description, onAccess }: ModuleCardProps) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      <Flex direction="column" gap={4} h="full">
        <Box
          bg="#F0F0F0"
          w="fit-content"
          p={3}
          borderRadius="md"
        >
          <Icon size={32} color="#333" />
        </Box>
        <Box flex="1">
          <Heading size="sm" mb={2} fontWeight="semibold">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {description}
          </Text>
        </Box>
        <Button
          bg="#9575CD"
          color="white"
          w="full"
          _hover={{ bg: "#7E57C2" }}
          onClick={onAccess}
        >
          Acceder
        </Button>
      </Flex>
    </Box>
  );
};
