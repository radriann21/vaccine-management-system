import { Box, Heading, Text, Flex } from "@chakra-ui/react";

interface StatCardProps {
  value: number;
  label: string;
  color: string;
}

export const StatCard = ({ value, label, color }: StatCardProps) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
      textAlign="center"
    >
      <Flex direction="column" gap={2} align="center">
        <Heading size="2xl" fontWeight="bold" color={color}>
          {value}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {label}
        </Text>
      </Flex>
    </Box>
  );
};
