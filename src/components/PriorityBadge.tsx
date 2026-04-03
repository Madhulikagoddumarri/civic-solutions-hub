import { Priority } from "@/lib/mock-data";

const config: Record<Priority, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", color: "bg-warning/10 text-warning" },
  high: { label: "High", color: "bg-civic-orange/10 text-civic-orange" },
  emergency: { label: "Emergency", color: "bg-destructive/10 text-destructive" },
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, color } = config[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}
