import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, AlertTriangle, Search, BarChart3, TrendingUp } from "lucide-react";
import { mockComplaints, issueTypeLabels, issueTypeIcons, ComplaintStatus } from "@/lib/mock-data";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import StarRating from "@/components/StarRating";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const departments = ["All", "Roads & Infrastructure", "Sanitation", "Water Services", "Electrical", "General"];

export default function AdminDashboard() {
  const [filter, setFilter] = useState<"all" | ComplaintStatus>("all");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [feedbackRating, setFeedbackRating] = useState(0);

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
        <h1 className="text-2xl font-bold font-display gradient-text">Admin Control Center</h1>
        <p className="text-sm text-muted-foreground">Monitor, manage, and resolve community issues</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard label="Total" value={stats.total} icon={FileText} gradientFrom="from-neon-purple/20" gradientTo="to-neon-blue/10" />
        <StatsCard label="Pending" value={stats.reported} icon={AlertTriangle} gradientFrom="from-warning/20" gradientTo="to-warning/5" />
        <StatsCard label="Active" value={stats.inProgress} icon={Clock} gradientFrom="from-neon-blue/20" gradientTo="to-neon-blue/5" />
        <StatsCard label="Resolved" value={stats.resolved} icon={CheckCircle} trend="85% rate" gradientFrom="from-success/20" gradientTo="to-success/5" />
      </div>

      {/* Animated mini charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {[
          { label: "Weekly Trend", values: [30, 45, 28, 55, 42, 65, 50], color: "neon-purple" },
          { label: "Resolution Speed", values: [60, 55, 70, 65, 80, 75, 85], color: "neon-teal" },
          { label: "Satisfaction", values: [70, 72, 68, 75, 78, 82, 85], color: "neon-blue" },
        ].map((chart, ci) => (
          <motion.div
            key={chart.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1 }}
            className="glass rounded-2xl p-4 neu-raised"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{chart.label}</span>
              <TrendingUp className={`w-3.5 h-3.5 text-${chart.color}`} />
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {chart.values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${v}%` }}
                  transition={{ delay: ci * 0.1 + i * 0.06, type: "spring" }}
                  className={`flex-1 rounded-t-md bg-gradient-to-t from-${chart.color}/40 to-${chart.color}/10`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
            className="pl-9 bg-secondary/50 border-border/30 rounded-xl h-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-secondary/50 border-border/30 rounded-xl h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass-strong rounded-xl">
            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex gap-1.5">
          {(["all", "reported", "in-progress", "resolved"] as const).map(s => (
            <Button
              key={s}
              size="sm"
              onClick={() => setFilter(s)}
              className={`rounded-xl text-xs ${
                filter === s
                  ? "bg-gradient-to-r from-neon-purple to-neon-teal border-0 text-primary-foreground glow-purple"
                  : "glass border-border/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All" : s === "in-progress" ? "Active" : s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden neu-raised">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                {["Issue", "Type", "Status", "Priority", "Dept", "Votes", "Rating"].map((h, i) => (
                  <th key={h} className={`text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider p-3 ${
                    i === 1 ? "hidden sm:table-cell" : i >= 3 && i <= 4 ? "hidden md:table-cell" : i >= 5 ? "hidden lg:table-cell" : ""
                  }`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-border/20 hover:bg-secondary/30 transition-colors group"
                >
                  <td className="p-3">
                    <p className="text-sm font-medium text-foreground truncate max-w-[200px] group-hover:text-neon-purple transition-colors">{c.title}</p>
                    <p className="text-[10px] text-muted-foreground">{c.location.address}</p>
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    <span className="text-sm">{issueTypeIcons[c.issueType]} {issueTypeLabels[c.issueType]}</span>
                  </td>
                  <td className="p-3"><StatusBadge status={c.status} /></td>
                  <td className="p-3 hidden md:table-cell"><PriorityBadge priority={c.priority} /></td>
                  <td className="p-3 hidden md:table-cell text-xs text-muted-foreground">{c.department || "—"}</td>
                  <td className="p-3 hidden lg:table-cell">
                    <span className="text-sm font-bold gradient-text">{c.upvotes}</span>
                  </td>
                  <td className="p-3 hidden lg:table-cell">
                    {c.rating ? <StarRating rating={c.rating} size="sm" /> : <span className="text-xs text-muted-foreground">—</span>}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Before & After */}
      <div>
        <h3 className="text-sm font-semibold font-display text-foreground mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-neon-teal" />
          Before & After — Recent Resolution
        </h3>
        <BeforeAfterSlider />
      </div>

      {/* Feedback section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-5 neu-raised"
      >
        <h3 className="text-sm font-semibold font-display text-foreground mb-4">Resolution Feedback</h3>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-muted-foreground">Your rating:</span>
          <StarRating rating={feedbackRating} onChange={setFeedbackRating} />
        </div>
        <Textarea
          placeholder="Share your feedback on the resolution..."
          rows={3}
          className="bg-secondary/50 border-border/30 rounded-xl mb-3"
        />
        <Button
          size="sm"
          className="bg-gradient-to-r from-neon-purple to-neon-teal border-0 text-primary-foreground glow-purple hover:opacity-90 rounded-xl"
        >
          Submit Feedback
        </Button>
      </motion.div>
    </div>
  );
}
