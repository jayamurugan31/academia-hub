import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { QRCodeSVG } from "qrcode.react";
import { Download, GraduationCap } from "lucide-react";

const exams = [
  { subject: "Data Structures", code: "CS301", date: "Mar 15, 2026", time: "10:00 AM - 1:00 PM", room: "Hall A - 201", seat: "14" },
  { subject: "Operating Systems", code: "CS302", date: "Mar 18, 2026", time: "10:00 AM - 1:00 PM", room: "Hall B - 105", seat: "22" },
  { subject: "Computer Networks", code: "CS303", date: "Mar 21, 2026", time: "2:00 PM - 5:00 PM", room: "Hall A - 302", seat: "8" },
];

export default function StudentHallTicket() {
  const { user } = useAuth();

  const qrData = JSON.stringify({ id: user?.id, name: user?.name, reg: user?.registerNumber, dept: user?.department });

  return (
    <div>
      <PageHeader title="Hall Ticket" description="Download your examination hall ticket">
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </Button>
      </PageHeader>

      <Card className="max-w-2xl mx-auto" id="hall-ticket">
        <CardContent className="p-8">
          <div className="text-center border-b pb-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-extrabold text-foreground">ABC College of Engineering</h2>
            </div>
            <p className="text-sm text-muted-foreground">Examination Hall Ticket - March 2026</p>
          </div>

          <div className="flex justify-between items-start mb-8">
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-muted-foreground w-32">Name:</span>
                <span className="font-semibold text-foreground">{user?.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-32">Register No:</span>
                <span className="font-semibold font-mono text-foreground">{user?.registerNumber}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-32">Department:</span>
                <span className="font-semibold text-foreground">{user?.department}</span>
              </div>
            </div>
            <div className="p-2 bg-card border rounded-lg">
              <QRCodeSVG value={qrData} size={100} level="H" />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold text-foreground">Subject</th>
                <th className="text-left p-3 font-semibold text-foreground">Code</th>
                <th className="text-left p-3 font-semibold text-foreground">Date & Time</th>
                <th className="text-left p-3 font-semibold text-foreground">Room</th>
                <th className="text-left p-3 font-semibold text-foreground">Seat</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((e) => (
                <tr key={e.code} className="border-b">
                  <td className="p-3 text-foreground">{e.subject}</td>
                  <td className="p-3 font-mono text-muted-foreground">{e.code}</td>
                  <td className="p-3 text-foreground">
                    <div>{e.date}</div>
                    <div className="text-xs text-muted-foreground">{e.time}</div>
                  </td>
                  <td className="p-3 text-foreground">{e.room}</td>
                  <td className="p-3 font-mono font-semibold text-foreground">{e.seat}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
            <p>This is a computer-generated document. No signature required.</p>
            <p className="mt-1">Scan the QR code for verification.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
