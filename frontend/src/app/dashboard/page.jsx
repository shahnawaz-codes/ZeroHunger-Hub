"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button, PageLoader } from "@/components/ui";

export default function DashboardPage() {
  const { userData, isLoading, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // Client-side guard (middleware is primary guard)
  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !userData) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-primary-600">MyApp</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Hello,{" "}
            <span className="font-medium text-gray-900">{userData.name}</span>
          </span>
          <Button variant="secondary" size="sm" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-8">
          You are authenticated. This is your protected area.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Account", value: userData.role.toUpperCase() },
            { label: "Email", value: userData.email },
            {
              label: "Member Since",
              value: new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
            >
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-lg font-semibold text-gray-900 truncate">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Placeholder activity */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {["Account created", "Email verified", "First login"].map(
              (item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="h-2 w-2 rounded-full bg-primary-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                  <span className="ml-auto text-gray-400 text-xs">
                    Just now
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
