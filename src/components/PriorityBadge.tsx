import { Priority } from "@/lib/mock-data";

const config: Record<Priority, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-muted/50 text-muted-foreground" },
  medium: { label: "Medium", className: "bg-warning/15 text-warning" },
  high: { label: "High", className: "bg-neon-purple/15 text-neon-purple" },
  emergency: { label: "Emergency", className: "bg-neon-pink/15 text-neon-pink" },
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, className } = config[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${className}`}>
      {label}
    </span>
  );
}
