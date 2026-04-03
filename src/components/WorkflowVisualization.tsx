import { motion } from "framer-motion";
import { workflowSteps } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";

export default function WorkflowVisualization({ activeStep = 2 }: { activeStep?: number }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Resolution Workflow</h3>
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {workflowSteps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg min-w-[80px] ${
                i <= activeStep ? "bg-primary/10" : "bg-muted/50"
              }`}
            >
              <span className="text-lg">{step.icon}</span>
              <span className={`text-xs font-semibold ${i <= activeStep ? "text-primary" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </motion.div>
            {i < workflowSteps.length - 1 && (
              <ChevronRight className={`w-4 h-4 mx-0.5 flex-shrink-0 ${i < activeStep ? "text-primary" : "text-muted-foreground/40"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
