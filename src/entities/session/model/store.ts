import { create } from "zustand";
import type { Session, User } from "./interfaces/interface";

export const useSessionStore = create<Session>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  setUser: (user: User) => set({ user, isAuthenticated: true, isInitialized: true }),
  clearUser: () => set({ user: null, isAuthenticated: false, isInitialized: false }),
}));