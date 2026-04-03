import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, AlertTriangle, Search, ChevronDown } from "lucide-react";
import { mockComplaints, issueTypeLabels, issueTypeIcons, ComplaintStatus } from "@/lib/mock-data";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import StarRating from "@/components/StarRating";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const departments = ["All", "Roads & Infrastructure", "Sanitation", "Water Services", "Electrical", "General"];

export default function AdminDashboard() {
  const [filter, setFilter] = useState<"all" | ComplaintStatus>("all");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const complaints = mockComplaints
    .filter(c => filter === "all" || c.status === filter)
    .filter(c => deptFilter === "All" || c.department === deptFilter)
    .filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  const stats = {
    total: mockComplaints.length,
    reported: mockComplaints.filter(c => c.status === "reported").length,
    inProgress: mockComplaints.filter(c => c.status === "in-progress").length,
    resolved: mockComplaints.filter(c => c.status === "resolved").length,
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage and resolve community complaints</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard label="Total" value={stats.total} icon={FileText} color="bg-primary/10 text-primary" />
        <StatsCard label="Pending" value={stats.reported} icon={AlertTriangle} color="bg-warning/10 text-warning" />
        <StatsCard label="In Progress" value={stats.inProgress} icon={Clock} color="bg-info/10 text-info" />
        <StatsCard label="Resolved" value={stats.resolved} icon={CheckCircle} color="bg-success/10 text-success" trend="85% rate" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search complaints..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex gap-1">
          {(["all", "reported", "in-progress", "resolved"] as const).map(s => (
            <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" onClick={() => setFilter(s)}>
              {s === "all" ? "All" : s === "in-progress" ? "Active" : s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold text-muted-foreground p-3">Issue</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-3 hidden sm:table-cell">Type</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-3 hidden md:table-cell">Priority</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-3 hidden lg:table-cell">Department</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-3 hidden lg:table-cell">Votes</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-3 hidden xl:table-cell">Rating</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3">
                    <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.location.address}</p>
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    <span className="text-sm">{issueTypeIcons[c.issueType]} {issueTypeLabels[c.issueType]}</span>
                  </td>
                  <td className="p-3"><StatusBadge status={c.status} /></td>
                  <td className="p-3 hidden md:table-cell"><PriorityBadge priority={c.priority} /></td>
                  <td className="p-3 hidden lg:table-cell text-sm text-muted-foreground">{c.department || "—"}</td>
                  <td className="p-3 hidden lg:table-cell text-sm font-medium text-foreground">{c.upvotes}</td>
                  <td className="p-3 hidden xl:table-cell">
                    {c.rating ? <StarRating rating={c.rating} size="sm" /> : <span className="text-xs text-muted-foreground">—</span>}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Before / After Section */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Before & After — Recent Resolution</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-destructive/5 border border-destructive/20 h-32 flex items-center justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <span className="text-2xl block mb-1">🕳️</span>
              Before — Pothole reported
            </div>
          </div>
          <div className="rounded-lg bg-success/5 border border-success/20 h-32 flex items-center justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <span className="text-2xl block mb-1">✅</span>
              After — Road repaired
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
