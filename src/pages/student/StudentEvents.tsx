import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";

const events = [
  { name: "Tech Symposium 2026", date: "Mar 25, 2026", time: "9:00 AM", venue: "Seminar Hall", desc: "Annual technical symposium with workshops and guest lectures." },
  { name: "Coding Contest", date: "Apr 2, 2026", time: "2:00 PM", venue: "CS Lab 1", desc: "Competitive programming contest open to all departments." },
  { name: "Cultural Fest", date: "Apr 15, 2026", time: "10:00 AM", venue: "Open Auditorium", desc: "Three-day cultural extravaganza with music, dance, and drama." },
];

export default function StudentEvents() {
  return (
    <div>
      <PageHeader title="Approved Events" description="Upcoming college events you can participate in" />
      <div className="grid gap-4">
        {events.map((e) => (
          <Card key={e.name}>
            <CardContent className="p-5 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{e.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
                <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{e.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.venue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
