import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push("/signin");
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
