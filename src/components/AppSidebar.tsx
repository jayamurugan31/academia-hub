import {
  CalendarDays, FileText, LayoutGrid, Users, ClipboardList,
  BarChart3, GraduationCap, Download, Calendar, CheckCircle,
  Upload, Settings, LogOut, Home, Megaphone, Brain
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

type NavItem = { title: string; url: string; icon: React.ElementType };

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  student: [
    { title: "Dashboard", url: "/student", icon: Home },
    { title: "Academic Schedule", url: "/student/schedule", icon: CalendarDays },
    { title: "Hall Ticket", url: "/student/hall-ticket", icon: FileText },
    { title: "Seating", url: "/student/seating", icon: LayoutGrid },
    { title: "Events", url: "/student/events", icon: Calendar },
    { title: "Performance", url: "/student/performance", icon: Brain },
  ],
  admin: [
    { title: "Dashboard", url: "/admin", icon: Home },
    { title: "Academic Calendar", url: "/admin/calendar", icon: CalendarDays },
    { title: "Event Approvals", url: "/admin/events", icon: CheckCircle },
    { title: "Students", url: "/admin/students", icon: Users },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    { title: "Seating Export", url: "/admin/seating", icon: Download },
  ],
  seating_manager: [
    { title: "Dashboard", url: "/seating", icon: Home },
    { title: "Upload Students", url: "/seating/upload", icon: Upload },
    { title: "Generate Seating", url: "/seating/generate", icon: LayoutGrid },
    { title: "Manage Rooms", url: "/seating/rooms", icon: Settings },
  ],
  club_coordinator: [
    { title: "Dashboard", url: "/club", icon: Home },
    { title: "Submit Proposal", url: "/club/submit", icon: Megaphone },
    { title: "My Proposals", url: "/club/proposals", icon: ClipboardList },
  ],
};

const ROLE_LABELS: Record<UserRole, string> = {
  student: "Student Portal",
  admin: "Admin Panel",
  seating_manager: "Seating Manager",
  club_coordinator: "Club Portal",
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (!user) return null;
  const items = NAV_ITEMS[user.role];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="p-4 gradient-sidebar">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-sidebar-foreground">AMS</p>
              <p className="text-xs text-sidebar-foreground/70">{ROLE_LABELS[user.role]}</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <GraduationCap className="w-6 h-6 text-sidebar-primary" />
          </div>
        )}
      </div>
      <SidebarContent className="gradient-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-xs tracking-wider">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === `/student` || item.url === `/admin` || item.url === `/seating` || item.url === `/club`}
                      className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gradient-sidebar p-3">
        <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent">
          <LogOut className="w-4 h-4 mr-2" />
          {!collapsed && "Sign Out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
