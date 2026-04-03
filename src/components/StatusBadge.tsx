import { ComplaintStatus } from "@/lib/mock-data";

const statusConfig: Record<ComplaintStatus, { label: string; className: string }> = {
  reported: { label: "Reported", className: "status-reported" },
  "in-progress": { label: "In Progress", className: "status-in-progress" },
  resolved: { label: "Resolved", className: "status-resolved" },
};

export default function StatusBadge({ status }: { status: ComplaintStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${className}`}>
      {label}
    </span>
  );
}
