import { authenticated } from "@/services/authService";
import type { User } from "@/types/user";
import { isApiError } from "@/utils/error";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  finished: boolean;
  getUser: () => Promise<void>;
}

// Create context with default value null
export const UserContext = createContext<UserContextType | null>(null);

// Define props for the provider
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const response = await authenticated();
    if (isApiError(response)) {
      console.error(response.error);
      setError(response.error);
      setUser(null);
    }

    if (response) setUser(response as User);

    setLoading(false);
    setFinished(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, finished, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
