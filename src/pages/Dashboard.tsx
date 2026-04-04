import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, AlertTriangle, PlusCircle, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { mockComplaints } from "@/lib/mock-data";
import StatsCard from "@/components/StatsCard";
import ComplaintCard from "@/components/ComplaintCard";
import WorkflowVisualization from "@/components/WorkflowVisualization";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { profile } = useAuth();
  const [complaints, setComplaints] = useState(mockComplaints);

  const firstName = profile?.full_name?.split(" ")[0] || "User";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

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

  const sortedByVotes = [...complaints].sort((a, b) => b.upvotes - a.upvotes);
  const topIssue = sortedByVotes[0];

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-display gradient-text"
          >
            {greeting}, {firstName} 👋
          </motion.h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening in your community</p>
        </div>
        <Link to="/submit">
          <Button className="bg-gradient-to-r from-neon-purple to-neon-teal border-0 text-primary-foreground glow-purple hover:opacity-90">
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Report Issue
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard label="Total Issues" value={stats.total} icon={FileText} trend="+12% this week" gradientFrom="from-neon-purple/20" gradientTo="to-neon-blue/10" />
        <StatsCard label="Reported" value={stats.reported} icon={AlertTriangle} gradientFrom="from-warning/20" gradientTo="to-warning/5" />
        <StatsCard label="In Progress" value={stats.inProgress} icon={Clock} gradientFrom="from-neon-blue/20" gradientTo="to-neon-blue/5" />
        <StatsCard label="Resolved" value={stats.resolved} icon={CheckCircle} gradientFrom="from-success/20" gradientTo="to-success/5" />
      </div>

      {/* Activity summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5 neu-raised"
      >
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-neon-teal" />
          <h3 className="text-sm font-semibold font-display text-foreground">Activity Summary</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Response Time", value: "2.4h", sub: "avg this week" },
            { label: "Resolution Rate", value: "87%", sub: "+5% vs last month" },
            { label: "Community Score", value: "4.6", sub: "out of 5.0" },
          ].map((item, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-secondary/30">
              <p className="text-xl font-bold font-display gradient-text">{item.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{item.label}</p>
              <p className="text-[10px] text-success mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <WorkflowVisualization activeStep={3} />

      {/* Trending issue */}
      {topIssue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-4 gradient-border glow-pink neu-raised"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-neon-pink" />
            <span className="text-xs font-bold uppercase tracking-wider text-neon-pink">Trending Issue</span>
          </div>
          <p className="text-sm font-semibold text-foreground">{topIssue.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{topIssue.upvotes} community votes — {topIssue.location.address}</p>
        </motion.div>
      )}

      {/* Complaint list */}
      <div>
        <h2 className="text-sm font-semibold font-display text-foreground mb-3">Community Issues</h2>
        <div className="space-y-3">
          {sortedByVotes.map((c, i) => (
            <ComplaintCard
              key={c.id}
              complaint={c}
              index={i}
              onUpvote={handleUpvote}
              trending={i === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
