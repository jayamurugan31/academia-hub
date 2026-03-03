import { useState } from "react";
import { PageHeader } from "@/components/DashboardWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle } from "lucide-react";

export default function SeatingUpload() {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploaded(true);
    }
  };

  return (
    <div>
      <PageHeader title="Upload Students" description="Upload student list CSV for seating allocation" />
      <Card className="max-w-lg mx-auto">
        <CardHeader><CardTitle className="text-base">Student List Upload</CardTitle></CardHeader>
        <CardContent>
          {!uploaded ? (
            <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all">
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="font-semibold text-foreground">Click to upload CSV</p>
              <p className="text-sm text-muted-foreground mt-1">CSV with columns: RegNo, Name, Department</p>
              <input type="file" accept=".csv" onChange={handleUpload} className="hidden" />
            </label>
          ) : (
            <div className="text-center p-8">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
              <p className="font-semibold text-foreground">File Uploaded Successfully</p>
              <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>{fileName}</span>
              </div>
              <Button variant="outline" className="mt-4" onClick={() => { setUploaded(false); setFileName(""); }}>Upload Another</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
