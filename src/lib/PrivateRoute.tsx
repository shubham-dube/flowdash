import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
            Authenticating, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/signin");
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
            Redirecting to Sign In Page...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
