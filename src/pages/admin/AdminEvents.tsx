import { useState } from "react";
import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface EventProposal {
  id: string;
  title: string;
  club: string;
  coordinator: string;
  date: string;
  description: string;
  status: "pending" | "approved" | "rejected";
}

const initialProposals: EventProposal[] = [
  { id: "1", title: "Hackathon 2026", club: "Coding Club", coordinator: "Sneha R", date: "2026-04-10", description: "24-hour hackathon for all departments", status: "pending" },
  { id: "2", title: "Photography Exhibition", club: "Arts Club", coordinator: "Vikram P", date: "2026-04-05", description: "Student photography showcase", status: "pending" },
  { id: "3", title: "Tech Symposium 2026", club: "IEEE Student Branch", coordinator: "Arun K", date: "2026-03-25", description: "Annual technical symposium", status: "approved" },
  { id: "4", title: "Blood Donation Camp", club: "NSS", coordinator: "Priya M", date: "2026-03-20", description: "Blood donation drive in campus", status: "pending" },
];

const statusConfig = {
  pending: { icon: Clock, class: "bg-warning/10 text-warning" },
  approved: { icon: CheckCircle, class: "bg-success/10 text-success" },
  rejected: { icon: XCircle, class: "bg-destructive/10 text-destructive" },
};

export default function AdminEvents() {
  const [proposals, setProposals] = useState(initialProposals);

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setProposals(proposals.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  return (
    <div>
      <PageHeader title="Event Approvals" description="Review and approve club event proposals" />
      <div className="grid gap-4">
        {proposals.map((p) => {
          const statusInfo = statusConfig[p.status];
          return (
            <Card key={p.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-foreground">{p.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded font-medium capitalize ${statusInfo.class}`}>{p.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Club: {p.club}</span>
                      <span>Coordinator: {p.coordinator}</span>
                      <span>Date: {p.date}</span>
                    </div>
                  </div>
                  {p.status === "pending" && (
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" onClick={() => updateStatus(p.id, "approved")} className="bg-success text-success-foreground hover:bg-success/90">Approve</Button>
                      <Button size="sm" variant="outline" onClick={() => updateStatus(p.id, "rejected")} className="border-destructive text-destructive hover:bg-destructive/10">Reject</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
