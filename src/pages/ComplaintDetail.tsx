import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Clock, ThumbsUp, Eye, MessageSquare,
  Bell, Share2, CheckCircle, AlertTriangle, FileText
} from "lucide-react";
import { mockComplaints, issueTypeIcons, issueTypeLabels } from "@/lib/mock-data";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import StarRating from "@/components/StarRating";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const timelineSteps = [
  { label: "Reported", time: "Mar 15, 10:30 AM", done: true, icon: FileText },
  { label: "Reviewed", time: "Mar 15, 2:00 PM", done: true, icon: Eye },
  { label: "Assigned", time: "Mar 16, 9:00 AM", done: true, icon: AlertTriangle },
  { label: "In Progress", time: "Mar 18, 11:00 AM", done: true, icon: Clock },
  { label: "Resolved", time: "Pending", done: false, icon: CheckCircle },
];

const comments = [
  { user: "Sarah C.", avatar: "SC", text: "I pass by this area daily. Please fix soon!", time: "2 hours ago" },
  { user: "Admin", avatar: "🔧", text: "Team has been dispatched. Expected fix by Friday.", time: "1 hour ago", isAdmin: true },
];

export default function ComplaintDetail() {
  const { id } = useParams();
  const complaint = mockComplaints.find(c => c.id === id) || mockComplaints[0];
  const [following, setFollowing] = useState(false);
  const [upvoted, setUpvoted] = useState(complaint.userHasUpvoted || false);
  const [upvotes, setUpvotes] = useState(complaint.upvotes);
  const [rating, setRating] = useState(0);

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    setUpvotes(prev => upvoted ? prev - 1 : prev + 1);
  };

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-5 neu-raised gradient-border"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
            {issueTypeIcons[complaint.issueType]}
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold font-display text-foreground">{complaint.title}</h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
              <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded bg-secondary/50">
                {issueTypeLabels[complaint.issueType]}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">{complaint.description}</p>

        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{complaint.location.address}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(complaint.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30">
          <Button
            size="sm"
            onClick={handleUpvote}
            className={`rounded-xl text-xs ${upvoted ? "bg-neon-purple/20 text-neon-purple glow-purple border-0" : "glass border-border/30 text-foreground"}`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 mr-1 ${upvoted ? "fill-neon-purple" : ""}`} />
            {upvotes}
          </Button>
          <Button
            size="sm"
            onClick={() => setFollowing(!following)}
            className={`rounded-xl text-xs ${following ? "bg-neon-teal/20 text-neon-teal border-0" : "glass border-border/30 text-foreground"}`}
          >
            <Bell className={`w-3.5 h-3.5 mr-1 ${following ? "fill-neon-teal" : ""}`} />
            {following ? "Following" : "Follow"}
          </Button>
          <Button size="sm" className="rounded-xl text-xs glass border-border/30 text-foreground ml-auto">
            <Share2 className="w-3.5 h-3.5 mr-1" />
            Share
          </Button>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5 neu-raised"
      >
        <h3 className="text-sm font-semibold font-display text-foreground mb-4">Tracking Timeline</h3>
        <div className="space-y-0">
          {timelineSteps.map((step, i) => (
            <div key={step.label} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.done
                      ? "bg-gradient-to-br from-neon-purple to-neon-teal glow-purple"
                      : "glass border border-border/30"
                  }`}
                >
                  <step.icon className={`w-3.5 h-3.5 ${step.done ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </motion.div>
                {i < timelineSteps.length - 1 && (
                  <div className={`w-px h-8 ${step.done ? "bg-neon-purple/30" : "bg-border/30"}`} />
                )}
              </div>
              <div className="pt-1">
                <p className={`text-sm font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                <p className="text-[10px] text-muted-foreground">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Before & After */}
      {complaint.status === "resolved" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-sm font-semibold font-display text-foreground mb-3">Resolution Proof</h3>
          <BeforeAfterSlider />
        </motion.div>
      )}

      {/* Comments */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl p-5 neu-raised"
      >
        <h3 className="text-sm font-semibold font-display text-foreground mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-neon-teal" />
          Comments ({comments.length})
        </h3>
        <div className="space-y-3 mb-4">
          {comments.map((c, i) => (
            <div key={i} className={`p-3 rounded-xl ${c.isAdmin ? "glass gradient-border" : "bg-secondary/30"}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  c.isAdmin ? "bg-gradient-to-br from-neon-purple to-neon-teal text-primary-foreground" : "bg-secondary text-foreground"
                }`}>
                  {c.avatar}
                </div>
                <span className="text-xs font-medium text-foreground">{c.user}</span>
                {c.isAdmin && <span className="text-[9px] px-1.5 py-0.5 rounded bg-neon-purple/20 text-neon-purple font-bold">ADMIN</span>}
                <span className="text-[10px] text-muted-foreground ml-auto">{c.time}</span>
              </div>
              <p className="text-xs text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Textarea placeholder="Add a comment..." rows={2} className="bg-secondary/50 border-border/30 rounded-xl text-sm flex-1" />
          <Button size="sm" className="self-end rounded-xl bg-gradient-to-r from-neon-purple to-neon-teal border-0 text-primary-foreground glow-purple hover:opacity-90">
            Post
          </Button>
        </div>
      </motion.div>

      {/* Feedback */}
      {complaint.status === "resolved" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5 neu-raised"
        >
          <h3 className="text-sm font-semibold font-display text-foreground mb-3">Rate Resolution</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-muted-foreground">Your rating:</span>
            <StarRating rating={rating} onChange={setRating} />
          </div>
          <Textarea placeholder="How was the resolution handled?" rows={2} className="bg-secondary/50 border-border/30 rounded-xl mb-3" />
          <Button size="sm" className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-teal border-0 text-primary-foreground glow-purple hover:opacity-90">
            Submit Feedback
          </Button>
        </motion.div>
      )}
    </div>
  );
}
