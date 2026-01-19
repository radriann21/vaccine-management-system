import { useEffect } from "react";
import { supabase } from "@/shared/api/supabase";
import { useSessionStore } from "../model/store";

export const useSessionInit = () => {
  const { setUser, clearUser, isInitialized } = useSessionStore();

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            role: session.user.user_metadata?.role || "user",
            user_metadata: session.user.user_metadata,
          });
        } else {
          clearUser();
          useSessionStore.setState({ isInitialized: true });
        }
      } catch (error) {
        console.error("Error initializing session:", error);
        clearUser();
        useSessionStore.setState({ isInitialized: true });
      }
    };

    if (!isInitialized) {
      initializeSession();
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            role: session.user.user_metadata?.role || "user",
            user_metadata: session.user.user_metadata,
          });
        } else if (event === "SIGNED_OUT") {
          clearUser();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, clearUser, isInitialized]);
};
