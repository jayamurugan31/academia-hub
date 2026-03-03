import { StatCard, PageHeader } from "@/components/DashboardWidgets";
import { Users, LayoutGrid, Upload, Settings } from "lucide-react";

export default function SeatingDashboard() {
  return (
    <div>
      <PageHeader title="Seating Manager" description="Manage examination seating arrangements" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Students Uploaded" value={430} icon={Users} variant="primary" />
        <StatCard title="Rooms Available" value={12} icon={LayoutGrid} variant="secondary" />
        <StatCard title="Exams Scheduled" value={6} icon={Upload} variant="warning" />
        <StatCard title="Plans Generated" value={4} icon={Settings} variant="success" />
      </div>
    </div>
  );
}
