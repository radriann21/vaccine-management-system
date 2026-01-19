import { Box } from "@chakra-ui/react";
import { LoginForm } from "./components/LoginForm";

export default function Login() {
  return (
    <Box
      as="main"
      bg="#E7EEFF"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LoginForm />
    </Box>
  );
}
