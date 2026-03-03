import { StatCard, PageHeader } from "@/components/DashboardWidgets";
import { Users, CalendarDays, CheckCircle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const deptData = [
  { dept: "CSE", students: 120 },
  { dept: "ECE", students: 95 },
  { dept: "MECH", students: 80 },
  { dept: "CIVIL", students: 60 },
  { dept: "EEE", students: 75 },
];

const performanceDistribution = [
  { name: "Pass", value: 340, color: "hsl(142 70% 40%)" },
  { name: "At Risk", value: 60, color: "hsl(38 92% 50%)" },
  { name: "Fail", value: 30, color: "hsl(0 72% 51%)" },
];

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Admin Dashboard" description="Overview of academic management system" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Students" value={430} icon={Users} variant="primary" />
        <StatCard title="Upcoming Exams" value={12} icon={CalendarDays} variant="secondary" />
        <StatCard title="Pending Approvals" value={3} icon={CheckCircle} variant="warning" />
        <StatCard title="Pass Rate" value="79%" icon={BarChart3} variant="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Students by Department</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dept" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Performance Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={performanceDistribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {performanceDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
