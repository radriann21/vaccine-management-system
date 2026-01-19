/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: string;
  email: string;
  role: string;
  user_metadata: any;
}

export interface Session {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}