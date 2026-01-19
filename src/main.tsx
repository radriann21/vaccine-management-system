import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/shared/theme/theme.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/query/queryClient.ts";
import App from "@/app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);
