import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Layers, Filter, Zap } from "lucide-react";
import { mockComplaints, issueTypeIcons } from "@/lib/mock-data";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import { Button } from "@/components/ui/button";

export default function LiveMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const selected = mockComplaints.find(c => c.id === selectedId);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Controls */}
      <div className="p-3 flex items-center gap-2 border-b border-border/30 glass-strong">
        <Button
          variant={showHeatmap ? "default" : "outline"}
          size="sm"
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={showHeatmap
            ? "bg-gradient-to-r from-neon-purple to-neon-teal border-0 text-primary-foreground glow-purple"
            : "border-border/30"
          }
        >
          <Layers className="w-4 h-4 mr-1.5" />
          Heatmap {showHeatmap ? "On" : "Off"}
        </Button>
        <Button variant="outline" size="sm" className="border-border/30">
          <Filter className="w-4 h-4 mr-1.5" />
          Filter
        </Button>
        <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-glow-pulse" />
          {mockComplaints.length} live issues
        </span>
      </div>

      <div className="flex-1 relative bg-background">
        {/* Dark Map */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-background to-secondary/50">
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
              {Array.from({ length: 30 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={`${i * 3.3}%`} x2="100%" y2={`${i * 3.3}%`} stroke="currentColor" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <line key={`v${i}`} x1={`${i * 3.3}%`} y1="0" x2={`${i * 3.3}%`} y2="100%" stroke="currentColor" strokeWidth="0.5" />
              ))}
            </svg>
          </div>

          {/* Heatmap glows */}
          {showHeatmap && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
              <div className="absolute top-[20%] left-[30%] w-52 h-52 bg-neon-pink/15 rounded-full blur-[60px]" />
              <div className="absolute top-[45%] left-[55%] w-40 h-40 bg-neon-purple/15 rounded-full blur-[50px]" />
              <div className="absolute bottom-[20%] right-[25%] w-36 h-36 bg-warning/12 rounded-full blur-[45px]" />
              <div className="absolute top-[35%] right-[35%] w-28 h-28 bg-neon-teal/10 rounded-full blur-[40px]" />
            </motion.div>
          )}

          {/* Neon Pins */}
          {mockComplaints.map((c, i) => {
            const positions = [
              { top: "22%", left: "32%" },
              { top: "38%", left: "52%" },
              { top: "28%", left: "68%" },
              { top: "55%", left: "28%" },
              { top: "62%", left: "48%" },
              { top: "42%", left: "78%" },
            ];
            const pos = positions[i] || positions[0];
            const isSelected = selectedId === c.id;
            const pinColor = c.priority === "emergency"
              ? "from-neon-pink to-destructive"
              : c.status === "resolved"
              ? "from-success to-neon-teal"
              : "from-neon-purple to-neon-blue";
            const glowClass = c.priority === "emergency" ? "glow-pink" : c.status === "resolved" ? "glow-teal" : "glow-purple";

            return (
              <motion.button
                key={c.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
                className={`absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-full ${isSelected ? "z-20" : ""}`}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedId(isSelected ? null : c.id)}
              >
                <motion.div
                  animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${pinColor} flex items-center justify-center shadow-lg ${glowClass} ${
                    isSelected ? "ring-2 ring-foreground/30" : ""
                  }`}
                >
                  <span className="text-sm">{issueTypeIcons[c.issueType]}</span>
                </motion.div>
                {/* Pulse ring */}
                <motion.div
                  className={`absolute w-9 h-9 rounded-full border border-neon-purple/30 top-0`}
                  animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Selected detail panel */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-80 glass-strong rounded-2xl p-4 z-30 gradient-border"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg flex-shrink-0">
                {issueTypeIcons[selected.issueType]}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold font-display text-foreground">{selected.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <StatusBadge status={selected.status} />
                  <PriorityBadge priority={selected.priority} />
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{selected.description}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {selected.location.address}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
