import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, AlertTriangle, Upload, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { issueTypeLabels, issueTypeIcons, IssueType } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const [issueType, setIssueType] = useState<IssueType | "">("");
  const [emergency, setEmergency] = useState(false);
  const [aiDetecting, setAiDetecting] = useState(false);
  const [aiDetected, setAiDetected] = useState<IssueType | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const simulateAiDetection = () => {
    setAiDetecting(true);
    setTimeout(() => {
      const detected: IssueType = "pothole";
      setAiDetected(detected);
      setIssueType(detected);
      setAiDetecting(false);
    }, 2000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      simulateAiDetection();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Complaint submitted successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-bold text-foreground">Report an Issue</h1>
        <p className="text-sm text-muted-foreground mb-6">Help improve your community by reporting problems</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload with AI */}
          <div className="glass-card rounded-xl p-4">
            <label className="text-sm font-medium text-foreground mb-2 block">Upload Photo</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors relative">
              {imagePreview ? (
                <div className="space-y-3">
                  <img src={imagePreview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-cover" />
                  {aiDetecting && (
                    <div className="flex items-center justify-center gap-2 text-sm text-primary">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      AI analyzing image...
                    </div>
                  )}
                  {aiDetected && !aiDetecting && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      AI Detected: {issueTypeIcons[aiDetected]} {issueTypeLabels[aiDetected]}
                    </motion.div>
                  )}
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground mt-1">AI will auto-detect the issue type</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>

          {/* Issue Type */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Issue Type</label>
            <Select value={issueType} onValueChange={(v) => setIssueType(v as IssueType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(issueTypeLabels) as IssueType[]).map((type) => (
                  <SelectItem key={type} value={type}>
                    {issueTypeIcons[type]} {issueTypeLabels[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
            <Textarea placeholder="Describe the issue in detail..." rows={4} />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Enter address or use GPS" className="pl-9" />
            </div>
            <div className="mt-2 h-40 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground border border-border">
              <MapPin className="w-5 h-5 mr-2" />
              Map view — tap to pin location
            </div>
          </div>

          {/* Emergency Toggle */}
          <div className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className={`w-5 h-5 ${emergency ? "text-destructive" : "text-muted-foreground"}`} />
              <div>
                <p className="text-sm font-medium text-foreground">Emergency / High Priority</p>
                <p className="text-xs text-muted-foreground">Mark if this needs urgent attention</p>
              </div>
            </div>
            <Switch checked={emergency} onCheckedChange={setEmergency} />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Upload className="w-4 h-4 mr-2" />
            Submit Report
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
