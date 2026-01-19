import { Toaster } from "@/shared/components/ui/toaster";
import { useSessionInit } from "@/entities/session/hooks/useSessionInit";
import AppRoutes from "./AppRoutes";

const App = () => {
  useSessionInit();

  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
};

export default App;