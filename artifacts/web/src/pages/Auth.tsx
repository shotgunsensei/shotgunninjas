import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signup, signin, useAuth } from "@/lib/auth";

export default function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!displayName.trim()) {
          toast.error("Display name is required");
          return;
        }
        const result = await signup({ email, password, displayName });
        setUser(result.user);
        toast.success("Account created! Welcome to Shotgun Ninjas.");
      } else {
        const result = await signin({ email, password });
        setUser(result.user);
        toast.success(`Welcome back, ${result.user.displayName}!`);
      }
      navigate("/clan");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              {mode === "signin" ? "Welcome Back" : "Join the Ninjas"}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {mode === "signin" ? (
                <>
                  Sign <span className="text-gradient">In</span>
                </>
              ) : (
                <>
                  Create <span className="text-gradient">Account</span>
                </>
              )}
            </h1>
            <p className="text-muted-foreground">
              {mode === "signin"
                ? "Sign in to access the Clan member area."
                : "Create your account to join the Clan."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-8 space-y-5"
          >
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Your display name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {mode === "signin" ? (
                <>
                  <LogIn className="h-4 w-4" />
                  {loading ? "Signing in..." : "Sign In"}
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  {loading ? "Creating account..." : "Create Account"}
                </>
              )}
            </button>

            <div className="text-center pt-2">
              {mode === "signin" ? (
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
