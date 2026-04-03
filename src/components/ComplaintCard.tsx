import { motion } from "framer-motion";
import { MapPin, ThumbsUp, Clock } from "lucide-react";
import { Complaint, issueTypeIcons } from "@/lib/mock-data";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

interface Props {
  complaint: Complaint;
  index?: number;
  onUpvote?: (id: string) => void;
}

export default function ComplaintCard({ complaint, index = 0, onUpvote }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-0.5">{issueTypeIcons[complaint.issueType]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground truncate">{complaint.title}</h3>
          </div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{complaint.description}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {complaint.location.address}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(complaint.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onUpvote?.(complaint.id); }}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ThumbsUp className={`w-4 h-4 ${complaint.userHasUpvoted ? "text-primary fill-primary" : "text-muted-foreground"}`} />
          <span className="text-xs font-semibold text-foreground">{complaint.upvotes}</span>
        </button>
      </div>
    </motion.div>
  );
}
