import { useState } from "react";
import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shuffle, Download } from "lucide-react";

interface Seat {
  student: string;
  dept: string;
  regNo: string;
}

const DEPTS = ["CSE", "ECE", "MECH", "CIVIL", "EEE"];
const NAMES = ["Arun", "Divya", "Rahul", "Priya", "Vikram", "Sneha", "Karthik", "Meena", "Suresh", "Kavya", "Raj", "Anitha", "Deepak", "Lakshmi", "Ganesh", "Nithya", "Hari", "Revathi", "Mohan", "Sathya", "Ravi", "Geetha", "Prasad", "Uma", "Venkat", "Janani", "Siva", "Bhuvana", "Ashok", "Padma"];

function generateSeating(rows: number, cols: number): Seat[][] {
  const seats: Seat[][] = [];
  let nameIdx = 0;
  for (let r = 0; r < rows; r++) {
    const row: Seat[] = [];
    for (let c = 0; c < cols; c++) {
      const dept = DEPTS[(r + c) % DEPTS.length]; // prevent adjacent same dept
      row.push({ student: NAMES[nameIdx % NAMES.length], dept, regNo: `21${dept.slice(0, 2)}${100 + nameIdx}` });
      nameIdx++;
    }
    seats.push(row);
  }
  return seats;
}

export default function SeatingGenerate() {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(6);
  const [seats, setSeats] = useState<Seat[][] | null>(null);

  const deptColors: Record<string, string> = {
    CSE: "bg-primary/10 text-primary border-primary/20",
    ECE: "bg-secondary/10 text-secondary border-secondary/20",
    MECH: "bg-warning/10 text-warning border-warning/20",
    CIVIL: "bg-success/10 text-success border-success/20",
    EEE: "bg-info/10 text-info border-info/20",
  };

  return (
    <div>
      <PageHeader title="Generate Seating" description="Create randomized seating with department separation">
        {seats && <Button className="gradient-primary text-primary-foreground gap-2"><Download className="w-4 h-4" /> Export PDF</Button>}
      </PageHeader>

      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-end gap-4">
            <div><Label>Rows</Label><Input type="number" min={2} max={10} value={rows} onChange={(e) => setRows(+e.target.value)} className="w-24 mt-1" /></div>
            <div><Label>Columns</Label><Input type="number" min={2} max={10} value={cols} onChange={(e) => setCols(+e.target.value)} className="w-24 mt-1" /></div>
            <Button onClick={() => setSeats(generateSeating(rows, cols))} className="gradient-primary text-primary-foreground gap-2"><Shuffle className="w-4 h-4" /> Generate</Button>
          </div>
        </CardContent>
      </Card>

      {seats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Room Layout — {rows * cols} seats</CardTitle>
            <div className="flex gap-2 mt-2 flex-wrap">
              {DEPTS.map((d) => <span key={d} className={`text-xs px-2 py-1 rounded border ${deptColors[d]}`}>{d}</span>)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3 p-2 rounded bg-muted text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Board</div>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {seats.flat().map((s, i) => (
                <div key={i} className={`p-2 rounded-lg border text-center ${deptColors[s.dept]}`}>
                  <p className="text-xs font-bold">{s.student}</p>
                  <p className="text-[10px] font-mono opacity-80">{s.regNo}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
