import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import SoundStudio from "./pages/SoundStudio";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
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
          <Route path="/soundstudio" element={<SoundStudio />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" theme="dark" />
    </QueryClientProvider>
  );
}

export default App;
