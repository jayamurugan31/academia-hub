import { useState } from "react";
import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Room {
  id: string;
  name: string;
  capacity: number;
  building: string;
}

const initialRooms: Room[] = [
  { id: "1", name: "Hall A - 201", capacity: 30, building: "Main Block" },
  { id: "2", name: "Hall A - 302", capacity: 40, building: "Main Block" },
  { id: "3", name: "Hall B - 105", capacity: 25, building: "Science Block" },
  { id: "4", name: "Lab 1", capacity: 35, building: "CS Block" },
];

export default function SeatingRooms() {
  const [rooms, setRooms] = useState(initialRooms);
  const [form, setForm] = useState({ name: "", capacity: 30, building: "" });

  const addRoom = () => {
    if (!form.name || !form.building) return;
    setRooms([...rooms, { ...form, id: Date.now().toString() }]);
    setForm({ name: "", capacity: 30, building: "" });
  };

  return (
    <div>
      <PageHeader title="Manage Rooms" description="Configure exam rooms and capacities" />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Add Room</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div><Label>Room Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" placeholder="Hall C - 101" /></div>
            <div><Label>Capacity</Label><Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: +e.target.value })} className="w-24 mt-1" /></div>
            <div><Label>Building</Label><Input value={form.building} onChange={(e) => setForm({ ...form, building: e.target.value })} className="mt-1" placeholder="Main Block" /></div>
            <Button onClick={addRoom} className="gradient-primary text-primary-foreground gap-2"><Plus className="w-4 h-4" /> Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-semibold text-foreground">Room</th>
              <th className="text-left p-3 font-semibold text-foreground">Building</th>
              <th className="text-left p-3 font-semibold text-foreground">Capacity</th>
              <th className="p-3"></th>
            </tr></thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.id} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{r.name}</td>
                  <td className="p-3 text-muted-foreground">{r.building}</td>
                  <td className="p-3 font-mono text-foreground">{r.capacity}</td>
                  <td className="p-3"><Button variant="ghost" size="icon" onClick={() => setRooms(rooms.filter((x) => x.id !== r.id))} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
