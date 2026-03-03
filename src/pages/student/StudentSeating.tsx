import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const seating = {
  room: "Hall A - Room 201",
  exam: "Data Structures (CS301)",
  date: "Mar 15, 2026",
  seat: 14,
  totalSeats: 30,
  rows: 5,
  cols: 6,
  studentSeat: 14,
};

export default function StudentSeating() {
  return (
    <div>
      <PageHeader title="Seating Arrangement" description="Your assigned seat for upcoming exams" />
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-base">{seating.room}</CardTitle>
          <p className="text-sm text-muted-foreground">{seating.exam} · {seating.date}</p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-2 rounded bg-muted text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Front / Board
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${seating.cols}, 1fr)` }}>
            {Array.from({ length: seating.totalSeats }, (_, i) => {
              const seatNum = i + 1;
              const isStudent = seatNum === seating.studentSeat;
              return (
                <div
                  key={seatNum}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    isStudent
                      ? "gradient-primary text-primary-foreground ring-2 ring-primary ring-offset-2 scale-110"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {seatNum}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded gradient-primary" /> Your Seat</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-muted" /> Other</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
