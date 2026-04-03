import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, AlertTriangle, Upload, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { issueTypeLabels, issueTypeIcons, IssueType } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AiScanFlow from "@/components/AiScanFlow";

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const [issueType, setIssueType] = useState<IssueType | "">("");
  const [emergency, setEmergency] = useState(false);
  const [aiStage, setAiStage] = useState<"idle" | "uploading" | "scanning" | "detected">("idle");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setAiStage("uploading");
      setTimeout(() => setAiStage("scanning"), 800);
      setTimeout(() => {
        setAiStage("detected");
        setIssueType("pothole");
      }, 2500);
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
        <h1 className="text-2xl font-bold font-display gradient-text">Report an Issue</h1>
        <p className="text-sm text-muted-foreground mb-6">Help improve your community</p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <button key={s} onClick={() => setStep(s)} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                s <= step ? "bg-gradient-to-br from-neon-purple to-neon-teal text-primary-foreground glow-purple" : "glass text-muted-foreground"
              }`}>
                {s}
              </div>
              <div className={`flex-1 h-0.5 rounded-full ${s < step ? "bg-gradient-to-r from-neon-purple to-neon-teal" : "bg-border"} ${s === 3 ? "hidden" : ""}`} />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              {/* Image Upload */}
              <div className="glass rounded-2xl p-5 neu-raised">
                <label className="text-sm font-medium font-display text-foreground mb-3 block">Upload Photo</label>
                <div className="border-2 border-dashed border-border/50 rounded-2xl p-8 text-center hover:border-neon-purple/40 transition-all relative group">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="max-h-40 mx-auto rounded-xl object-cover" />
                  ) : (
                    <label className="cursor-pointer">
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Camera className="w-10 h-10 mx-auto text-muted-foreground/40 group-hover:text-neon-purple/60 transition-colors" />
                      </motion.div>
                      <p className="text-sm text-muted-foreground mt-3">Drag & drop or click to upload</p>
                      <p className="text-[10px] text-muted-foreground/50 mt-1">AI will auto-detect the issue</p>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>

              {/* AI Flow */}
              {aiStage !== "idle" && <AiScanFlow stage={aiStage} detectedType="Pothole" />}

              <Button
                type="button"
                onClick={() => setStep(2)}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-neon-purple to-neon-teal border-0 text-primary-foreground glow-purple hover:opacity-90"
              >
                Next: Details
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="glass rounded-2xl p-5 neu-raised space-y-4">
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Issue Type</label>
                  <Select value={issueType} onValueChange={(v) => setIssueType(v as IssueType)}>
                    <SelectTrigger className="bg-secondary/50 border-border/30 rounded-xl h-11">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent className="glass-strong rounded-xl">
                      {(Object.keys(issueTypeLabels) as IssueType[]).map((type) => (
                        <SelectItem key={type} value={type}>
                          {issueTypeIcons[type]} {issueTypeLabels[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Description</label>
                  <Textarea placeholder="Describe the issue..." rows={4} className="bg-secondary/50 border-border/30 rounded-xl" />
                </div>
              </div>

              {/* Emergency */}
              <div className={`glass rounded-2xl p-4 neu-raised flex items-center justify-between transition-all ${
                emergency ? "glow-pink gradient-border" : ""
              }`}>
                <div className="flex items-center gap-3">
                  <motion.div animate={emergency ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.8, repeat: Infinity }}>
                    <AlertTriangle className={`w-5 h-5 ${emergency ? "text-neon-pink" : "text-muted-foreground"}`} />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Emergency Mode</p>
                    <p className="text-[10px] text-muted-foreground">Urgent attention needed</p>
                  </div>
                </div>
                <Switch checked={emergency} onCheckedChange={setEmergency} />
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-11 rounded-xl border-border/30">Back</Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-neon-purple to-neon-teal border-0 text-primary-foreground glow-purple hover:opacity-90"
                >
                  Next: Location
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="glass rounded-2xl p-5 neu-raised">
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Location</label>
                <div className="relative mb-3">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Enter address or use GPS" className="pl-9 bg-secondary/50 border-border/30 rounded-xl h-11" />
                </div>
                {/* Simulated dark map */}
                <div className="h-48 rounded-xl bg-secondary/50 border border-border/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary">
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={`${i * 7}%`} x2="100%" y2={`${i * 7}%`} stroke="currentColor" strokeWidth="0.5" />
                      ))}
                      {Array.from({ length: 15 }).map((_, i) => (
                        <line key={`v${i}`} x1={`${i * 7}%`} y1="0" x2={`${i * 7}%`} y2="100%" stroke="currentColor" strokeWidth="0.5" />
                      ))}
                    </svg>
                    {/* Glowing pin */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-6 h-6 rounded-full bg-neon-purple flex items-center justify-center glow-purple">
                        <MapPin className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <div className="w-3 h-3 rounded-full bg-neon-purple/20 mx-auto -mt-1 animate-glow-pulse" />
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-11 rounded-xl border-border/30">Back</Button>
                <Button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-neon-purple to-neon-teal border-0 text-primary-foreground glow-purple hover:opacity-90"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
