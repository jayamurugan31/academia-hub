import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ROLE_ROUTES: Record<UserRole, string> = {
  student: "/student",
  admin: "/admin",
  seating_manager: "/seating",
  club_coordinator: "/club",
};

export default function DashboardLayout() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  const allowedPrefix = ROLE_ROUTES[user.role];
  if (!location.pathname.startsWith(allowedPrefix)) {
    return <Navigate to={allowedPrefix} replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b bg-card/50 backdrop-blur-sm px-4 gap-3 sticky top-0 z-30">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{user.name}</span>
              <span className="mx-2">·</span>
              <span className="capitalize">{user.role.replace("_", " ")}</span>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
