import { motion } from "framer-motion";
import { Upload, ScanLine, CheckCircle, Sparkles } from "lucide-react";

interface Props {
  stage: "idle" | "uploading" | "scanning" | "detected";
  detectedType?: string;
}

export default function AiScanFlow({ stage, detectedType }: Props) {
  const steps = [
    { key: "uploading", icon: Upload, label: "Upload Image", color: "text-neon-blue" },
    { key: "scanning", icon: ScanLine, label: "AI Scanning", color: "text-neon-purple" },
    { key: "detected", icon: CheckCircle, label: "Issue Detected", color: "text-neon-teal" },
  ];

  const stageIndex = steps.findIndex(s => s.key === stage);

  return (
    <div className="glass rounded-2xl p-5 neu-raised">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-neon-purple" />
        <h3 className="text-sm font-semibold font-display text-foreground">AI Issue Detection</h3>
      </div>
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step.key} className="flex items-center flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.4 }}
              animate={{
                scale: i <= stageIndex ? 1 : 0.85,
                opacity: i <= stageIndex ? 1 : 0.3,
              }}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <motion.div
                animate={
                  stage === step.key
                    ? { boxShadow: ["0 0 10px hsl(var(--neon-purple)/0.3)", "0 0 30px hsl(var(--neon-purple)/0.5)", "0 0 10px hsl(var(--neon-purple)/0.3)"] }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`w-12 h-12 rounded-xl glass flex items-center justify-center ${
                  i <= stageIndex ? "glow-purple" : ""
                }`}
              >
                {stage === "scanning" && step.key === "scanning" ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </motion.div>
                ) : (
                  <step.icon className={`w-5 h-5 ${i <= stageIndex ? step.color : "text-muted-foreground/40"}`} />
                )}
              </motion.div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                i <= stageIndex ? step.color : "text-muted-foreground/40"
              }`}>
                {step.label}
              </span>
            </motion.div>
            {i < steps.length - 1 && (
              <div className={`w-full h-[2px] mx-1 rounded-full flex-shrink ${
                i < stageIndex ? "bg-gradient-to-r from-neon-purple to-neon-teal" : "bg-border/30"
              }`} />
            )}
          </div>
        ))}
      </div>
      {stage === "detected" && detectedType && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 glass rounded-xl p-3 glow-teal flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4 text-neon-teal" />
          <span className="text-sm font-medium text-foreground">Detected: <span className="text-neon-teal">{detectedType}</span></span>
        </motion.div>
      )}
    </div>
  );
}
