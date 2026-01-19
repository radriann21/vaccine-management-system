import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { useSessionStore } from "@/entities/session/model/store";
import { toaster } from "@/shared/components/ui/toaster";
import { useNavigate } from "react-router";
import type { LoginSchemaType } from "../validations/login.validation";

interface LoginResponse {
  success: boolean;
  message?: string;
}

export const useLogin = () => {
  const setUser = useSessionStore((state) => state.setUser);
  const navigate = useNavigate();

  const loginMutation = useMutation<LoginResponse, Error, LoginSchemaType>({
    mutationFn: async (credentials) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("No se pudo obtener la información del usuario");
      }

      return {
        success: true,
        message: "Inicio de sesión exitoso",
      };
    },
    onSuccess: async () => {
      const { data } = await supabase.auth.getUser();
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          role: data.user.user_metadata?.role || "user",
          user_metadata: data.user.user_metadata,
        });

        navigate("/dashboard", { replace: true });

        toaster.create({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al sistema",
          type: "success",
          duration: 3000,
        });
      }
    },
    onError: (error) => {
      toaster.create({
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales inválidas",
        type: "error",
        duration: 5000,
      });
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};