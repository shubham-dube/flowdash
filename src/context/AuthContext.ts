"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, getIdTokenResult, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextProps | null>(null);
  
  export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        checkTokenExpiry(currentUser as User)
      });
  
      return () => unsubscribe();
    }, []);
  
    const logout = async () => {
      try {
        await signOut(auth);
        setUser(null); 
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
  
    return React.createElement(
      AuthContext.Provider,
      { value: { user, loading, logout } },
      children
    );
  };

  const checkTokenExpiry = async (user: User) => {
    const tokenResult = await getIdTokenResult(user);
    const expirationTime = new Date(tokenResult.expirationTime).getTime();
    const currentTime = new Date().getTime();
  
    const timeLeft = expirationTime - currentTime;
  
    console.log("Token expires in:", timeLeft, "ms");
  
    if (timeLeft <= 0) {
      await signOut(auth);
    }
  };