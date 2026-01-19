import { Box } from "@chakra-ui/react";
import { LoginForm } from "./components/LoginForm";
import backgroundImage from "@/assets/pexels-rdne.jpg";

export default function Login() {
  return (
    <Box
      as="main"
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(0.7) blur(0.5px)",
        zIndex: 0,
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))",
        backdropFilter: "blur(1px)",
        zIndex: 1,
      }}
    >
      <Box position="relative" zIndex={2}>
        <LoginForm />
      </Box>
    </Box>
  );
}
