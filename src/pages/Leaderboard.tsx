import { motion } from "framer-motion";
import { Trophy, Medal, TrendingUp, Star, Award, ThumbsUp } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Sarah Chen", points: 3420, reports: 48, resolved: 42, avatar: "SC" },
  { rank: 2, name: "John Doe", points: 1250, reports: 24, resolved: 18, avatar: "JD" },
  { rank: 3, name: "Maria Garcia", points: 980, reports: 19, resolved: 15, avatar: "MG" },
  { rank: 4, name: "Alex Johnson", points: 870, reports: 16, resolved: 12, avatar: "AJ" },
  { rank: 5, name: "Priya Patel", points: 720, reports: 14, resolved: 11, avatar: "PP" },
  { rank: 6, name: "James Wilson", points: 650, reports: 12, resolved: 9, avatar: "JW" },
  { rank: 7, name: "Emily Brown", points: 580, reports: 11, resolved: 8, avatar: "EB" },
  { rank: 8, name: "David Kim", points: 490, reports: 9, resolved: 7, avatar: "DK" },
];

const rankStyles: Record<number, { gradient: string; glow: string; icon: React.ReactNode }> = {
  1: { gradient: "from-yellow-400 to-amber-500", glow: "shadow-[0_0_20px_rgba(251,191,36,0.3)]", icon: <Trophy className="w-5 h-5 text-yellow-400" /> },
  2: { gradient: "from-gray-300 to-gray-400", glow: "shadow-[0_0_15px_rgba(156,163,175,0.2)]", icon: <Medal className="w-5 h-5 text-gray-300" /> },
  3: { gradient: "from-amber-600 to-amber-700", glow: "shadow-[0_0_15px_rgba(180,83,9,0.2)]", icon: <Medal className="w-5 h-5 text-amber-600" /> },
};

export default function Leaderboard() {
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold font-display gradient-text"
        >
          Community Leaderboard
        </motion.h1>
        <p className="text-sm text-muted-foreground mt-1">Top contributors making a difference</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 items-end">
        {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((user, i) => {
          const heights = ["h-32", "h-40", "h-28"];
          const rank = user.rank;
          const style = rankStyles[rank];
          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${style.gradient} p-[2px] ${style.glow} mb-2`}>
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-sm font-bold font-display gradient-text">
                  {user.avatar}
                </div>
              </div>
              <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-[10px] text-muted-foreground">{user.points.toLocaleString()} pts</p>
              <div className={`${heights[i]} glass rounded-t-2xl mt-2 flex flex-col items-center justify-end pb-3 neu-raised ${rank === 1 ? "gradient-border glow-purple" : ""}`}>
                {style.icon}
                <span className="text-lg font-bold font-display gradient-text mt-1">#{rank}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full list */}
      <div className="glass rounded-2xl neu-raised overflow-hidden">
        <div className="p-4 border-b border-border/30 flex items-center gap-2">
          <Award className="w-4 h-4 text-neon-teal" />
          <span className="text-sm font-semibold font-display text-foreground">All Rankings</span>
        </div>
        {leaderboardData.map((user, i) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 p-3 px-4 border-b border-border/10 hover:bg-secondary/30 transition-colors ${
              user.name === "John Doe" ? "bg-neon-purple/5" : ""
            }`}
          >
            <span className={`w-7 text-center font-bold text-sm ${
              user.rank <= 3 ? "gradient-text" : "text-muted-foreground"
            }`}>
              {user.rank}
            </span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-purple to-neon-teal p-[2px] flex-shrink-0">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-[10px] font-bold text-foreground">
                {user.avatar}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.name}
                {user.name === "John Doe" && <span className="text-[10px] ml-1.5 text-neon-purple">(You)</span>}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-0.5">
                <span className="flex items-center gap-0.5"><ThumbsUp className="w-2.5 h-2.5" />{user.reports} reports</span>
                <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5" />{user.resolved} resolved</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold gradient-text">{user.points.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">points</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
