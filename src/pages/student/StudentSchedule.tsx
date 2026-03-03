import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schedule = [
  { day: "Monday", subjects: [{ time: "9:00 AM", name: "Data Structures", faculty: "Dr. Ravi" }, { time: "11:00 AM", name: "DBMS Lab", faculty: "Prof. Meena" }] },
  { day: "Tuesday", subjects: [{ time: "9:00 AM", name: "Operating Systems", faculty: "Dr. Kumar" }, { time: "2:00 PM", name: "Computer Networks", faculty: "Prof. Anitha" }] },
  { day: "Wednesday", subjects: [{ time: "10:00 AM", name: "Software Engineering", faculty: "Dr. Ravi" }, { time: "1:00 PM", name: "DS Lab", faculty: "Prof. Meena" }] },
  { day: "Thursday", subjects: [{ time: "9:00 AM", name: "Computer Networks", faculty: "Prof. Anitha" }, { time: "11:00 AM", name: "Operating Systems", faculty: "Dr. Kumar" }] },
  { day: "Friday", subjects: [{ time: "10:00 AM", name: "Seminar", faculty: "Dr. Ravi" }] },
];

export default function StudentSchedule() {
  return (
    <div>
      <PageHeader title="Academic Schedule" description="Your weekly class timetable" />
      <div className="grid gap-4">
        {schedule.map((d) => (
          <Card key={d.day}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{d.day}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {d.subjects.map((s) => (
                  <div key={s.time + s.name} className="flex items-center gap-4 p-2 rounded-lg bg-muted/40">
                    <span className="text-xs font-mono text-muted-foreground w-20">{s.time}</span>
                    <span className="font-medium text-sm text-foreground flex-1">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.faculty}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
