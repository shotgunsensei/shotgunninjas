import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-8xl font-bold text-primary mb-4 font-[var(--font-display)]">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          This page doesn't exist in the system.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
