import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import LiveMap from "./pages/LiveMap";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import ComplaintDetail from "./pages/ComplaintDetail";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/submit" element={<AppLayout><SubmitComplaint /></AppLayout>} />
          <Route path="/map" element={<AppLayout><LiveMap /></AppLayout>} />
          <Route path="/admin" element={<AppLayout><AdminDashboard /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
          <Route path="/complaint/:id" element={<AppLayout><ComplaintDetail /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
