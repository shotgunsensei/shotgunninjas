import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OperatorOS from "./pages/OperatorOS";
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
          {/* Legacy module routes — modules are now owned by OperatorOS.net */}
          <Route path="/techdeck" element={<Navigate to="/operatoros" replace />} />
          <Route path="/tradeflow" element={<Navigate to="/operatoros" replace />} />
          <Route path="/torqueshed" element={<Navigate to="/operatoros" replace />} />
          <Route path="/ninjamation" element={<Navigate to="/operatoros" replace />} />
          <Route path="/playpackpilot" element={<Navigate to="/operatoros" replace />} />
          <Route path="/brandforgeos" element={<Navigate to="/operatoros" replace />} />
          <Route path="/snapproof-os" element={<Navigate to="/operatoros" replace />} />
          <Route path="/pulsedesk" element={<Navigate to="/operatoros" replace />} />
          <Route path="/faultline-lab" element={<Navigate to="/operatoros" replace />} />
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
