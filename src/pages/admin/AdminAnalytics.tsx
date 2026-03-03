import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const accuracyData = [
  { model: "Random Forest", accuracy: 87, precision: 85, recall: 89 },
  { model: "Logistic Regression", accuracy: 82, precision: 80, recall: 84 },
];

const trendData = [
  { month: "Jan", passRate: 75, atRisk: 25 },
  { month: "Feb", passRate: 78, atRisk: 22 },
  { month: "Mar", passRate: 79, atRisk: 21 },
  { month: "Apr", passRate: 82, atRisk: 18 },
  { month: "May", passRate: 80, atRisk: 20 },
];

export default function AdminAnalytics() {
  return (
    <div>
      <PageHeader title="AI Analytics" description="Machine learning model performance and predictions" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Model Accuracy Comparison</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="model" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Accuracy" />
                <Bar dataKey="precision" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Precision" />
                <Bar dataKey="recall" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Recall" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Pass Rate Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="passRate" stroke="hsl(var(--success))" strokeWidth={2} name="Pass Rate %" />
                <Line type="monotone" dataKey="atRisk" stroke="hsl(var(--destructive))" strokeWidth={2} name="At Risk %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Model Details</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accuracyData.map((m) => (
              <div key={m.model} className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-bold text-foreground mb-3">{m.model}</h4>
                <div className="space-y-2 text-sm">
                  {[{ label: "Accuracy", val: m.accuracy }, { label: "Precision", val: m.precision }, { label: "Recall", val: m.recall }].map((metric) => (
                    <div key={metric.label} className="flex items-center gap-3">
                      <span className="text-muted-foreground w-20">{metric.label}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full gradient-primary rounded-full" style={{ width: `${metric.val}%` }} />
                      </div>
                      <span className="font-mono font-semibold text-foreground w-12 text-right">{metric.val}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">Features: studytime, absences, failures, internal marks</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
