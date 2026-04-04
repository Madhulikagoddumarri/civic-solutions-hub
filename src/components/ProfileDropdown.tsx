import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, Settings, LogOut, Trophy, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { label: "My Profile", icon: User, path: "/profile" },
  { label: "My Complaints", icon: FileText, path: "/profile" },
  { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
  { label: "Settings", icon: Settings, path: "/profile" },
];

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    navigate("/");
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-purple to-neon-teal p-[2px] glow-purple transition-all group-hover:shadow-[0_0_25px_hsl(var(--neon-purple)/0.4)]">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-xs font-bold text-foreground">
              {initials}
            </div>
          )}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-56 glass-strong rounded-2xl overflow-hidden shadow-2xl z-50"
          >
            <div className="p-4 border-b border-border/30">
              <p className="text-sm font-semibold text-foreground">{profile?.full_name || "User"}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{profile?.email}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple font-medium">{profile?.points || 0} pts</span>
              </div>
            </div>

            <div className="py-1">
              {menuItems.map(item => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-border/30 py-1">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
