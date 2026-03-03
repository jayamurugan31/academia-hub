import { StatCard, PageHeader } from "@/components/DashboardWidgets";
import { Megaphone, CheckCircle, Clock, XCircle } from "lucide-react";

export default function ClubDashboard() {
  return (
    <div>
      <PageHeader title="Club Coordinator" description="Manage your club's event proposals" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Proposals" value={5} icon={Megaphone} variant="primary" />
        <StatCard title="Approved" value={3} icon={CheckCircle} variant="success" />
        <StatCard title="Pending" value={1} icon={Clock} variant="warning" />
        <StatCard title="Rejected" value={1} icon={XCircle} variant="default" />
      </div>
    </div>
  );
}
