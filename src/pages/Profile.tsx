import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, MapPin, Calendar, Award, Star, TrendingUp,
  FileText, CheckCircle, Clock, AlertTriangle, Edit2, Camera
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockComplaints, issueTypeIcons } from "@/lib/mock-data";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const badges = [
  { name: "First Report", icon: "🏆", earned: true, desc: "Submitted first complaint" },
  { name: "Community Hero", icon: "🦸", earned: true, desc: "50+ upvotes received" },
  { name: "Quick Reporter", icon: "⚡", earned: true, desc: "5 reports in a week" },
  { name: "Watchdog", icon: "👁️", earned: false, desc: "Follow 10 issues" },
  { name: "Resolver", icon: "✅", earned: false, desc: "10 resolved issues" },
  { name: "Top Voter", icon: "👍", earned: false, desc: "Vote on 100 issues" },
];

const activityTimeline = [
  { action: "Reported", issue: "Water main leak flooding street", time: "2 hours ago", icon: FileText },
  { action: "Upvoted", issue: "Large pothole on Main Street", time: "5 hours ago", icon: TrendingUp },
  { action: "Resolved", issue: "Broken streetlight on residential road", time: "1 day ago", icon: CheckCircle },
  { action: "Commented", issue: "Illegal garbage dump in park", time: "2 days ago", icon: Star },
];

export default function Profile() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("complaints");
  const userComplaints = mockComplaints.slice(0, 4);

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-6 neu-raised gradient-border relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-60 h-60 bg-neon-purple/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-neon-teal/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple via-neon-blue to-neon-teal p-[3px] glow-purple">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-3xl font-bold font-display gradient-text">
                  {initials}
                </div>
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-3.5 h-3.5 text-foreground" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl font-bold font-display text-foreground">{profile?.full_name || "User"}</h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm text-muted-foreground">
              <Mail className="w-3.5 h-3.5" />
              {profile?.email || "No email"}
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              Downtown District
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              Member since March 2024
            </div>
          </div>

          <Button size="sm" className="rounded-xl glass border-border/30 text-foreground hover:bg-secondary/50">
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            Edit Profile
          </Button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Reports", value: "24", icon: FileText, color: "neon-purple" },
          { label: "Resolved", value: "18", icon: CheckCircle, color: "success" },
          { label: "Points Earned", value: "1,250", icon: Award, color: "neon-teal" },
          { label: "Avg Rating", value: "4.8", icon: Star, color: "warning" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-4 neu-raised text-center"
          >
            <stat.icon className={`w-5 h-5 mx-auto text-${stat.color} mb-2`} />
            <p className="text-xl font-bold font-display gradient-text">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5 neu-raised"
      >
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-neon-teal" />
          <h3 className="text-sm font-semibold font-display text-foreground">Badges & Achievements</h3>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className={`text-center p-3 rounded-xl transition-all ${
                badge.earned
                  ? "glass glow-purple"
                  : "bg-secondary/20 opacity-40"
              }`}
            >
              <span className="text-2xl block">{badge.icon}</span>
              <p className="text-[10px] font-medium text-foreground mt-1.5">{badge.name}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass rounded-xl p-1 w-full">
          <TabsTrigger value="complaints" className="flex-1 rounded-lg text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-teal data-[state=active]:text-primary-foreground">
            My Complaints
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex-1 rounded-lg text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-teal data-[state=active]:text-primary-foreground">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="complaints" className="mt-4 space-y-3">
          {userComplaints.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-4 neu-raised flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg flex-shrink-0">
                {issueTypeIcons[c.issueType]}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">{c.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={c.status} />
                  <span className="text-[10px] text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold gradient-text">{c.upvotes}</span>
                <p className="text-[10px] text-muted-foreground">votes</p>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <div className="space-y-1">
            {activityTimeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-3"
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full glass flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-neon-purple" />
                  </div>
                  {i < activityTimeline.length - 1 && (
                    <div className="w-px h-8 bg-border/30 mt-1" />
                  )}
                </div>
                <div className="pt-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold text-neon-purple">{item.action}</span>{" "}
                    {item.issue}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
