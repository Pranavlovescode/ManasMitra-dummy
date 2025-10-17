import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  email: string;
  name?: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For demo purposes, we're storing users in AsyncStorage
// In a real app, you would use a backend service
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, you would validate credentials with your backend
      const usersString = await AsyncStorage.getItem("users");
      const users = usersString ? JSON.parse(usersString) : [];

      const foundUser = users.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password
      );

      if (foundUser) {
        const userData = { email: foundUser.email, name: foundUser.name };
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    name: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, you would send this data to your backend
      const usersString = await AsyncStorage.getItem("users");
      const users = usersString ? JSON.parse(usersString) : [];

      // Check if user already exists
      if (users.some((u: { email: string }) => u.email === email)) {
        return false;
      }

      const newUser = { email, name, password };
      users.push(newUser);

      await AsyncStorage.setItem("users", JSON.stringify(users));

      // Auto login after signup
      const userData = { email, name };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return true;
    } catch (error) {
      console.error("Signup error", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
