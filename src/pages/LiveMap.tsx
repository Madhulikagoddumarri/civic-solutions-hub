import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Layers, Filter } from "lucide-react";
import { mockComplaints, issueTypeIcons, issueTypeLabels } from "@/lib/mock-data";
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
      <div className="p-3 flex items-center gap-2 border-b border-border bg-background">
        <Button
          variant={showHeatmap ? "default" : "outline"}
          size="sm"
          onClick={() => setShowHeatmap(!showHeatmap)}
        >
          <Layers className="w-4 h-4 mr-1.5" />
          {showHeatmap ? "Heatmap On" : "Heatmap Off"}
        </Button>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-1.5" />
          Filter
        </Button>
        <span className="text-xs text-muted-foreground ml-auto">{mockComplaints.length} issues on map</span>
      </div>

      <div className="flex-1 relative bg-muted">
        {/* Simulated Map */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted to-accent/5">
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="currentColor" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="currentColor" strokeWidth="0.5" />
            ))}
          </svg>

          {/* Heatmap overlay */}
          {showHeatmap && (
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-destructive/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-warning/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-civic-orange/20 rounded-full blur-3xl" />
            </div>
          )}

          {/* Pins */}
          {mockComplaints.map((c, i) => {
            const positions = [
              { top: "25%", left: "35%" },
              { top: "40%", left: "55%" },
              { top: "30%", left: "65%" },
              { top: "55%", left: "30%" },
              { top: "60%", left: "50%" },
              { top: "45%", left: "75%" },
            ];
            const pos = positions[i] || positions[0];
            return (
              <motion.button
                key={c.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className={`absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-full ${selectedId === c.id ? "z-20" : ""}`}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedId(selectedId === c.id ? null : c.id)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg transition-transform ${
                  selectedId === c.id ? "scale-125 ring-2 ring-primary" : ""
                } ${
                  c.priority === "emergency" ? "bg-destructive" :
                  c.status === "resolved" ? "bg-success" : "bg-primary"
                }`}>
                  <span className="text-xs">{issueTypeIcons[c.issueType]}</span>
                </div>
                <div className="w-2 h-2 rotate-45 -mt-1 bg-primary" />
              </motion.button>
            );
          })}
        </div>

        {/* Selected complaint detail */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-80 glass-card rounded-xl p-4 z-30"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{issueTypeIcons[selected.issueType]}</span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{selected.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={selected.status} />
                  <PriorityBadge priority={selected.priority} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{selected.description}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
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
