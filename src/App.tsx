import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Clan from "./pages/Clan";
import OperatorOS from "./pages/OperatorOS";
import TechDeck from "./pages/TechDeck";
import TradeFlow from "./pages/TradeFlow";
import TorqueShed from "./pages/TorqueShed";
import NeonRacer from "./pages/NeonRacer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/clan" element={<Clan />} />
            <Route path="/workshop" element={<Clan />} />
            <Route path="/operatoros" element={<OperatorOS />} />
            <Route path="/techdeck" element={<TechDeck />} />
            <Route path="/tradeflow" element={<TradeFlow />} />
            <Route path="/torqueshed" element={<TorqueShed />} />
            <Route path="/neonracer" element={<NeonRacer />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
