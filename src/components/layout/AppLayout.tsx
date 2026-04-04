import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, PlusCircle, Map, Shield, Bell, Menu, X, LogOut, ChevronRight, Zap, Trophy
} from "lucide-react";
import { notifications } from "@/lib/mock-data";
import ProfileDropdown from "@/components/ProfileDropdown";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/submit", label: "Report Issue", icon: PlusCircle },
  { path: "/map", label: "Live Map", icon: Map },
  { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { path: "/admin", label: "Admin Panel", icon: Shield },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex bg-mesh">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass-strong flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-teal flex items-center justify-center glow-purple"
          >
            <Zap className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <span className="text-lg font-bold font-display gradient-text">CivicTrack</span>
          <button className="ml-auto lg:hidden text-foreground/70" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl glass glow-purple"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <item.icon className={`w-4 h-4 ${active ? "text-neon-purple" : ""}`} />
                  {item.label}
                </span>
                {active && <ChevronRight className="w-4 h-4 ml-auto relative z-10 text-neon-purple" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/30">
          <div className="glass rounded-xl p-3 mb-3">
            <p className="text-xs text-muted-foreground">System Status</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-success animate-glow-pulse" />
              <span className="text-xs text-success font-medium">All Systems Operational</span>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass-strong h-14 flex items-center px-4 lg:px-6 gap-3">
          <button className="lg:hidden text-foreground/70" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl hover:bg-secondary transition-colors group"
            >
              <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              {unread > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-neon-pink glow-pink"
                />
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 top-12 w-80 glass-strong rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="p-4 border-b border-border/30 flex items-center justify-between">
                    <span className="text-sm font-semibold font-display">Notifications</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple font-medium">{unread} new</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto scrollbar-thin">
                    {notifications.map((n, i) => (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`px-4 py-3 border-b border-border/20 text-sm transition-colors hover:bg-secondary/50 ${
                          !n.read ? "border-l-2 border-l-neon-purple" : ""
                        }`}
                      >
                        <p className="text-foreground/90 text-xs">{n.message}</p>
                        <span className="text-[10px] text-muted-foreground mt-1 block">{n.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-teal flex items-center justify-center text-primary-foreground text-xs font-bold glow-purple">
            JD
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
