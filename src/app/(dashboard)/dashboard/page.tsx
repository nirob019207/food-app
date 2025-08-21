"use client";

import Dashboard from "@/components/admin/dashboard/Dashboard";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function Page() {
  // Get token from cookies
  const token = Cookies.get("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode<{ role?: string }>(token);
      role = decoded?.role || null;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // Render dashboard for ADMIN & SUPERADMIN only
  if (role === "ADMIN" || role === "SUPERADMIN") {
    return (
      <div className="p-6 flex flex-col gap-6 mb-20">
        <Dashboard />
      </div>
    );
  }

  // Show friendly message for normal USER or unknown roles
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 mb-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-3">
        Welcome to Our Dashboard!
      </h1>
      <p className="text-gray-600 text-lg text-center max-w-md">
        
      </p>
    </div>
  );
}
