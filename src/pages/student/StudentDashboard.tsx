import { StatCard, PageHeader } from "@/components/DashboardWidgets";
import { CalendarDays, FileText, LayoutGrid, Brain, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const upcomingExams = [
  { subject: "Data Structures", date: "Mar 15, 2026", room: "Hall A - 201" },
  { subject: "Operating Systems", date: "Mar 18, 2026", room: "Hall B - 105" },
  { subject: "Computer Networks", date: "Mar 21, 2026", room: "Hall A - 302" },
];

const events = [
  { name: "Tech Symposium 2026", date: "Mar 25", status: "Approved" },
  { name: "Coding Contest", date: "Apr 2", status: "Approved" },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <PageHeader title={`Welcome, ${user?.name}`} description="Your academic overview at a glance" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Upcoming Exams" value={3} icon={CalendarDays} variant="primary" />
        <StatCard title="Hall Tickets" value="Ready" icon={FileText} variant="success" />
        <StatCard title="Seat Assigned" value="A-201-14" icon={LayoutGrid} variant="secondary" />
        <StatCard title="Prediction" value="Pass" icon={Brain} variant="success" description="85% confidence" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Upcoming Exams</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingExams.map((e) => (
                <div key={e.subject} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{e.subject}</p>
                    <p className="text-xs text-muted-foreground">{e.date}</p>
                  </div>
                  <span className="text-xs font-mono bg-accent px-2 py-1 rounded text-accent-foreground">{e.room}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Approved Events</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.map((e) => (
                <div key={e.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">{e.name}</p>
                      <p className="text-xs text-muted-foreground">{e.date}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded font-medium">{e.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
