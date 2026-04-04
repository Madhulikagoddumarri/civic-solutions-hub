import { motion } from "framer-motion";
import { MapPin, ThumbsUp, Clock, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Complaint, issueTypeIcons } from "@/lib/mock-data";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

interface Props {
  complaint: Complaint;
  index?: number;
  onUpvote?: (id: string) => void;
  trending?: boolean;
}

export default function ComplaintCard({ complaint, index = 0, onUpvote, trending }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -2 }}
      className={`glass rounded-2xl p-4 neu-raised cursor-pointer transition-all duration-300 group ${
        trending ? "gradient-border glow-purple" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg flex-shrink-0">
          {issueTypeIcons[complaint.issueType]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground truncate">{complaint.title}</h3>
            {trending && <Flame className="w-3.5 h-3.5 text-neon-pink flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{complaint.description}</p>
          <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
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
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onUpvote?.(complaint.id); }}
          className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 ${
            complaint.userHasUpvoted
              ? "bg-neon-purple/20 glow-purple"
              : "hover:bg-secondary neu-inset"
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${complaint.userHasUpvoted ? "text-neon-purple fill-neon-purple" : "text-muted-foreground"}`} />
          <span className={`text-xs font-bold ${complaint.userHasUpvoted ? "text-neon-purple" : "text-foreground"}`}>{complaint.upvotes}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
