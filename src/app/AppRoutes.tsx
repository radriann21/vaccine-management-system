import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "@/shared/components/guards/ProtectedRoute";
import { PublicRoute } from "@/shared/components/guards/PublicRoute";
import { Center, Spinner } from "@chakra-ui/react";

const Login = lazy(() => import("@/features/login/Login"));
const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const Products = lazy(() => import("@/features/products/Products"));
const StockControl = lazy(() => import("@/features/stockControl/StockControl"));
const Vaccines = lazy(() => import("@/features/vaccines/Vaccines"));
const Transfers = lazy(() => import("@/features/transfer/Transfers"));
const DataExport = lazy(() => import("@/features/dataExport/DataExport"));

const LoadingFallback = () => (
  <Center minH="100vh">
    <Spinner size="xl" color="#135DFB" />
  </Center>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ambulatorios" element={<Products />} />
            <Route path="/lotes" element={<StockControl />} />
            <Route path="/vacunas" element={<Vaccines />} />
            <Route path="/traslados" element={<Transfers />} />
            <Route path="/importar-exportar" element={<DataExport />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;