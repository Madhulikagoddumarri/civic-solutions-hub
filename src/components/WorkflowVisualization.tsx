import { motion } from "framer-motion";
import { workflowSteps } from "@/lib/mock-data";

export default function WorkflowVisualization({ activeStep = 2 }: { activeStep?: number }) {
  return (
    <div className="glass rounded-2xl p-5 neu-raised">
      <h3 className="text-sm font-semibold font-display text-foreground mb-5">Resolution Pipeline</h3>
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-thin">
        {workflowSteps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.12, type: "spring" }}
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl min-w-[85px] transition-all duration-300 ${
                i <= activeStep
                  ? "glass glow-purple"
                  : "bg-secondary/30"
              }`}
            >
              <motion.span
                className="text-xl"
                animate={i === activeStep ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {step.icon}
              </motion.span>
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                i <= activeStep ? "text-neon-purple" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
            </motion.div>
            {i < workflowSteps.length - 1 && (
              <div className={`w-6 h-[2px] mx-0.5 flex-shrink-0 rounded-full ${
                i < activeStep
                  ? "bg-gradient-to-r from-neon-purple to-neon-teal"
                  : "bg-border"
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
