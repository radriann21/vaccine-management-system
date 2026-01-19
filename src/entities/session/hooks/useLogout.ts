import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { useSessionStore } from "../model/store";
import { toaster } from "@/shared/components/ui/toaster";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const clearUser = useSessionStore((state) => state.clearUser);
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      clearUser();
      navigate("/", { replace: true });
      
      toaster.create({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error al cerrar sesión",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoading: logoutMutation.isPending,
  };
};
