import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts";

const subjectData = [
  { subject: "DS", internal: 82, predicted: 78, attendance: 90 },
  { subject: "OS", internal: 68, predicted: 65, attendance: 78 },
  { subject: "CN", internal: 75, predicted: 72, attendance: 85 },
  { subject: "SE", internal: 90, predicted: 88, attendance: 95 },
  { subject: "DBMS", internal: 55, predicted: 52, attendance: 65 },
];

const riskData = [
  { name: "Pass", value: 85, fill: "hsl(142 70% 40%)" },
  { name: "At Risk", value: 15, fill: "hsl(0 72% 51%)" },
];

export default function StudentPerformance() {
  return (
    <div>
      <PageHeader title="Performance Prediction" description="AI-based analysis of your academic performance" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Subject-wise Analysis</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                <Bar dataKey="internal" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Internal Marks" />
                <Bar dataKey="predicted" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Predicted Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Risk Assessment</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={riskData} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" cornerRadius={10} />
                <Legend />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <p className="text-3xl font-extrabold text-success">85%</p>
              <p className="text-sm text-muted-foreground">Probability of Passing</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Detailed Metrics</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold text-foreground">Subject</th>
                <th className="text-left p-3 font-semibold text-foreground">Internal</th>
                <th className="text-left p-3 font-semibold text-foreground">Predicted</th>
                <th className="text-left p-3 font-semibold text-foreground">Attendance</th>
                <th className="text-left p-3 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {subjectData.map((s) => (
                <tr key={s.subject} className="border-b">
                  <td className="p-3 font-medium text-foreground">{s.subject}</td>
                  <td className="p-3 text-foreground">{s.internal}%</td>
                  <td className="p-3 text-foreground">{s.predicted}%</td>
                  <td className="p-3 text-foreground">{s.attendance}%</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${s.predicted >= 60 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                      {s.predicted >= 60 ? "Pass" : "At Risk"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
