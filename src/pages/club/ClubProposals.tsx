import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const proposals = [
  { id: "1", title: "Hackathon 2026", date: "2026-04-10", status: "approved" as const, submittedOn: "2026-02-15" },
  { id: "2", title: "Workshop on AI/ML", date: "2026-04-20", status: "pending" as const, submittedOn: "2026-02-28" },
  { id: "3", title: "Alumni Meetup", date: "2026-05-05", status: "approved" as const, submittedOn: "2026-02-10" },
  { id: "4", title: "Movie Night", date: "2026-03-30", status: "rejected" as const, submittedOn: "2026-02-20" },
  { id: "5", title: "Coding Bootcamp", date: "2026-04-15", status: "approved" as const, submittedOn: "2026-03-01" },
];

const statusConfig = {
  pending: { icon: Clock, class: "bg-warning/10 text-warning" },
  approved: { icon: CheckCircle, class: "bg-success/10 text-success" },
  rejected: { icon: XCircle, class: "bg-destructive/10 text-destructive" },
};

export default function ClubProposals() {
  return (
    <div>
      <PageHeader title="My Proposals" description="Track the status of your submitted event proposals" />
      <div className="grid gap-4">
        {proposals.map((p) => {
          const s = statusConfig[p.status];
          const Icon = s.icon;
          return (
            <Card key={p.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.class}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{p.title}</p>
                    <p className="text-xs text-muted-foreground">Event: {p.date} · Submitted: {p.submittedOn}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium capitalize ${s.class}`}>{p.status}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
