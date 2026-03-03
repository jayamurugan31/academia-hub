import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const students = [
  { id: "21CS101", name: "Arun Kumar", dept: "CSE", year: 3, email: "arun@college.edu", cgpa: 8.5 },
  { id: "21CS102", name: "Divya S", dept: "CSE", year: 3, email: "divya@college.edu", cgpa: 9.1 },
  { id: "21EC201", name: "Rahul M", dept: "ECE", year: 3, email: "rahul@college.edu", cgpa: 7.8 },
  { id: "21ME301", name: "Priya K", dept: "MECH", year: 3, email: "priya@college.edu", cgpa: 8.2 },
  { id: "21CS103", name: "Vikram P", dept: "CSE", year: 3, email: "vikram@college.edu", cgpa: 6.5 },
  { id: "21EC202", name: "Sneha R", dept: "ECE", year: 3, email: "sneha@college.edu", cgpa: 8.9 },
  { id: "21CE401", name: "Karthik N", dept: "CIVIL", year: 3, email: "karthik@college.edu", cgpa: 7.2 },
  { id: "21EE501", name: "Meena T", dept: "EEE", year: 3, email: "meena@college.edu", cgpa: 8.0 },
];

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()) || s.dept.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader title="Student Directory" description="View and manage registered students" />
      <div className="mb-4"><Input placeholder="Search by name, register number or department..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" /></div>
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold text-foreground">Reg No</th>
                <th className="text-left p-3 font-semibold text-foreground">Name</th>
                <th className="text-left p-3 font-semibold text-foreground">Department</th>
                <th className="text-left p-3 font-semibold text-foreground">Year</th>
                <th className="text-left p-3 font-semibold text-foreground">CGPA</th>
                <th className="text-left p-3 font-semibold text-foreground">Email</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-mono text-foreground">{s.id}</td>
                  <td className="p-3 font-medium text-foreground">{s.name}</td>
                  <td className="p-3 text-foreground">{s.dept}</td>
                  <td className="p-3 text-foreground">{s.year}</td>
                  <td className="p-3"><span className={`font-semibold ${s.cgpa >= 8 ? "text-success" : s.cgpa >= 6 ? "text-warning" : "text-destructive"}`}>{s.cgpa}</span></td>
                  <td className="p-3 text-muted-foreground">{s.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
