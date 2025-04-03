"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { type PermissionArea } from "@/lib/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: PermissionArea;
}

export function ProtectedRoute({
  children,
  requiredPermission
}: ProtectedRouteProps) {
  const { isAuthenticated, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    // If a specific permission is required, check for it
    if (requiredPermission && !hasPermission(requiredPermission)) {
      // Redirect to dashboard with limited access instead of completely blocking
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, hasPermission, router, requiredPermission]);

  // If checks pass, render the children
  if (!isAuthenticated || (requiredPermission && !hasPermission(requiredPermission))) {
    // Return null or a loading state while redirecting
    return null;
  }

  return <>{children}</>;
}
