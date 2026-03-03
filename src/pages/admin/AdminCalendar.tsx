import { useState } from "react";
import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "exam" | "holiday" | "event";
}

const initialEvents: CalendarEvent[] = [
  { id: "1", title: "Mid-Semester Exams Begin", date: "2026-03-15", type: "exam" },
  { id: "2", title: "Holi Holiday", date: "2026-03-17", type: "holiday" },
  { id: "3", title: "Tech Symposium", date: "2026-03-25", type: "event" },
  { id: "4", title: "End-Semester Exams", date: "2026-04-20", type: "exam" },
  { id: "5", title: "Summer Vacation Begins", date: "2026-05-01", type: "holiday" },
];

const typeColors: Record<string, string> = {
  exam: "bg-destructive/10 text-destructive",
  holiday: "bg-success/10 text-success",
  event: "bg-info/10 text-info",
};

export default function AdminCalendar() {
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", type: "exam" as CalendarEvent["type"] });

  const addEvent = () => {
    if (!form.title || !form.date) return;
    setEvents([...events, { ...form, id: Date.now().toString() }]);
    setForm({ title: "", date: "", type: "exam" });
    setOpen(false);
  };

  const deleteEvent = (id: string) => setEvents(events.filter((e) => e.id !== id));

  return (
    <div>
      <PageHeader title="Academic Calendar" description="Manage academic events, exams and holidays">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground gap-2"><Plus className="w-4 h-4" /> Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Calendar Event</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" /></div>
              <div><Label>Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1" /></div>
              <div>
                <Label>Type</Label>
                <div className="flex gap-2 mt-1">
                  {(["exam", "holiday", "event"] as const).map((t) => (
                    <button key={t} onClick={() => setForm({ ...form, type: t })} className={`px-3 py-1 rounded text-sm capitalize border ${form.type === t ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border text-muted-foreground"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <Button onClick={addEvent} className="w-full gradient-primary text-primary-foreground">Add Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {events.sort((a, b) => a.date.localeCompare(b.date)).map((e) => (
              <div key={e.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-1 rounded font-medium capitalize ${typeColors[e.type]}`}>{e.type}</span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteEvent(e.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
