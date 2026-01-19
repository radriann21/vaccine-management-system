import { Navigate, Outlet } from "react-router";
import { useSessionStore } from "@/entities/session/model/store";
import { Spinner, Center } from "@chakra-ui/react";

interface PublicRouteProps {
  redirectTo?: string;
}

export const PublicRoute = ({ redirectTo = "/dashboard" }: PublicRouteProps) => {
  const { isAuthenticated, isInitialized } = useSessionStore();

  if (!isInitialized) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="#135DFB" />
      </Center>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
