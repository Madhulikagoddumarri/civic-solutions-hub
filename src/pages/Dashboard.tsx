import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, AlertTriangle, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { mockComplaints } from "@/lib/mock-data";
import StatsCard from "@/components/StatsCard";
import ComplaintCard from "@/components/ComplaintCard";
import WorkflowVisualization from "@/components/WorkflowVisualization";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [complaints, setComplaints] = useState(mockComplaints);

  const stats = {
    total: complaints.length,
    reported: complaints.filter(c => c.status === "reported").length,
    inProgress: complaints.filter(c => c.status === "in-progress").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
  };

  const handleUpvote = (id: string) => {
    setComplaints(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, upvotes: c.userHasUpvoted ? c.upvotes - 1 : c.upvotes + 1, userHasUpvoted: !c.userHasUpvoted }
          : c
      )
    );
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Track your community issues</p>
        </div>
        <Link to="/submit">
          <Button size="sm">
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Report Issue
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard label="Total Issues" value={stats.total} icon={FileText} color="bg-primary/10 text-primary" trend="+12% this week" />
        <StatsCard label="Reported" value={stats.reported} icon={AlertTriangle} color="bg-warning/10 text-warning" />
        <StatsCard label="In Progress" value={stats.inProgress} icon={Clock} color="bg-info/10 text-info" />
        <StatsCard label="Resolved" value={stats.resolved} icon={CheckCircle} color="bg-success/10 text-success" />
      </div>

      <WorkflowVisualization activeStep={3} />

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Recent Complaints</h2>
        <div className="space-y-3">
          {complaints
            .sort((a, b) => b.upvotes - a.upvotes)
            .map((c, i) => (
              <ComplaintCard key={c.id} complaint={c} index={i} onUpvote={handleUpvote} />
            ))}
        </div>
      </div>

      {/* Most Voted Highlight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-xl p-5 border-l-4 border-l-warning"
      >
        <h3 className="text-sm font-semibold text-foreground mb-1">🔥 Most Voted Issue</h3>
        <p className="text-sm text-muted-foreground">
          {complaints.sort((a, b) => b.upvotes - a.upvotes)[0]?.title} — {complaints.sort((a, b) => b.upvotes - a.upvotes)[0]?.upvotes} votes
        </p>
      </motion.div>
    </div>
  );
}
