import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentSchedule from "@/pages/student/StudentSchedule";
import StudentHallTicket from "@/pages/student/StudentHallTicket";
import StudentSeating from "@/pages/student/StudentSeating";
import StudentEvents from "@/pages/student/StudentEvents";
import StudentPerformance from "@/pages/student/StudentPerformance";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminCalendar from "@/pages/admin/AdminCalendar";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminStudents from "@/pages/admin/AdminStudents";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminSeating from "@/pages/admin/AdminSeating";
import SeatingDashboard from "@/pages/seating/SeatingDashboard";
import SeatingUpload from "@/pages/seating/SeatingUpload";
import SeatingGenerate from "@/pages/seating/SeatingGenerate";
import SeatingRooms from "@/pages/seating/SeatingRooms";
import ClubDashboard from "@/pages/club/ClubDashboard";
import ClubSubmit from "@/pages/club/ClubSubmit";
import ClubProposals from "@/pages/club/ClubProposals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Student Routes */}
            <Route path="/student" element={<DashboardLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="schedule" element={<StudentSchedule />} />
              <Route path="hall-ticket" element={<StudentHallTicket />} />
              <Route path="seating" element={<StudentSeating />} />
              <Route path="events" element={<StudentEvents />} />
              <Route path="performance" element={<StudentPerformance />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="calendar" element={<AdminCalendar />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="seating" element={<AdminSeating />} />
            </Route>

            {/* Seating Manager Routes */}
            <Route path="/seating" element={<DashboardLayout />}>
              <Route index element={<SeatingDashboard />} />
              <Route path="upload" element={<SeatingUpload />} />
              <Route path="generate" element={<SeatingGenerate />} />
              <Route path="rooms" element={<SeatingRooms />} />
            </Route>

            {/* Club Coordinator Routes */}
            <Route path="/club" element={<DashboardLayout />}>
              <Route index element={<ClubDashboard />} />
              <Route path="submit" element={<ClubSubmit />} />
              <Route path="proposals" element={<ClubProposals />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
