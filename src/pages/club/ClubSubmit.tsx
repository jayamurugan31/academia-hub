import { useState } from "react";
import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClubSubmit() {
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", description: "", date: "", venue: "" });
  const [file, setFile] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.date) {
      toast({ title: "Missing fields", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Proposal Submitted!", description: "Your event proposal has been sent for admin approval." });
    setForm({ title: "", description: "", date: "", venue: "" });
    setFile("");
  };

  return (
    <div>
      <PageHeader title="Submit Event Proposal" description="Create a new event proposal for admin review" />
      <Card className="max-w-lg mx-auto">
        <CardHeader><CardTitle className="text-base">New Proposal</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Event Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" placeholder="Hackathon 2026" /></div>
            <div><Label>Description *</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" placeholder="Describe your event..." rows={4} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Date *</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1" /></div>
              <div><Label>Venue</Label><Input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className="mt-1" placeholder="Seminar Hall" /></div>
            </div>
            <div>
              <Label>Attach PDF (optional)</Label>
              <label className="flex items-center gap-2 mt-1 p-3 border border-dashed rounded-lg cursor-pointer hover:border-primary/50 text-sm text-muted-foreground">
                <Upload className="w-4 h-4" />
                {file || "Click to upload PDF"}
                <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0]?.name || "")} className="hidden" />
              </label>
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground gap-2"><Send className="w-4 h-4" /> Submit Proposal</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
