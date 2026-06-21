import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OperatorOS from "./pages/OperatorOS";
import TechDeck from "./pages/TechDeck";
import TradeFlow from "./pages/TradeFlow";
import TorqueShed from "./pages/TorqueShed";
import NeonRacer from "./pages/NeonRacer";
import Ninjamation from "./pages/Ninjamation";
import LabyrinthRonin from "./pages/LabyrinthRonin";
import SnpoolHall from "./pages/SnpoolHall";
import PlayPackPilot from "./pages/PlayPackPilot";
import BrandForgeOS from "./pages/BrandForgeOS";
import SnapProofOS from "./pages/SnapProofOS";
import PulseDesk from "./pages/PulseDesk";
import FaultlineLab from "./pages/FaultlineLab";
import ControversyArchive from "./pages/ControversyArchive";
import SoundStudio from "./pages/SoundStudio";
import FileRepository from "./pages/FileRepository";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Unsubscribe from "./pages/Unsubscribe";
import AdminAnalytics from "./pages/AdminAnalytics";
import NewsletterAdmin from "./pages/NewsletterAdmin";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/operatoros" element={<OperatorOS />} />
          <Route path="/techdeck" element={<TechDeck />} />
          <Route path="/tradeflow" element={<TradeFlow />} />
          <Route path="/torqueshed" element={<TorqueShed />} />
          <Route path="/neonracer" element={<NeonRacer />} />
          <Route path="/ninjamation" element={<Ninjamation />} />
          <Route path="/labyrinthronin" element={<LabyrinthRonin />} />
          <Route path="/snpoolhall" element={<SnpoolHall />} />
          <Route path="/playpackpilot" element={<PlayPackPilot />} />
          <Route path="/brandforgeos" element={<BrandForgeOS />} />
          <Route path="/snapproof-os" element={<SnapProofOS />} />
          <Route path="/pulsedesk" element={<PulseDesk />} />
          <Route path="/faultline-lab" element={<FaultlineLab />} />
          <Route path="/controversy-archive" element={<ControversyArchive />} />
          <Route path="/soundstudio" element={<SoundStudio />} />
          <Route path="/repository" element={<FileRepository />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/newsletter" element={<NewsletterAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" theme="dark" />
    </QueryClientProvider>
  );
}

export default App;
