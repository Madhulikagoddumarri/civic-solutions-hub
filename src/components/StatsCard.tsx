import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  glowColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function StatsCard({
  label, value, icon: Icon, trend,
  glowColor = "glow-purple",
  gradientFrom = "from-neon-purple/20",
  gradientTo = "to-neon-blue/10",
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`glass rounded-2xl p-5 neu-raised cursor-pointer group transition-all duration-300 hover:${glowColor}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold font-display mt-2 gradient-text">{value}</p>
          {trend && (
            <p className="text-[11px] text-success font-medium mt-1.5 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-success inline-block" />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-foreground/70" />
        </div>
      </div>
    </motion.div>
  );
}
