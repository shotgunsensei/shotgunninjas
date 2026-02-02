import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Clan from "./pages/Clan";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import IndoorGadgets from "./pages/IndoorGadgets";
import OutdoorGadgets from "./pages/OutdoorGadgets";
import ElectricVehicles from "./pages/ElectricVehicles";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TorqueShed from "./pages/TorqueShed";
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
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/indoor-gadgets" element={<IndoorGadgets />} />
            <Route path="/outdoor-gadgets" element={<OutdoorGadgets />} />
            <Route path="/electric-vehicles" element={<ElectricVehicles />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/torqueshed" element={<TorqueShed />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
