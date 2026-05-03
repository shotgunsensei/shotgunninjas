import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Send, Eye, Lock, Loader2, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSEO } from "@/hooks/useSEO";
import {
  broadcastNewsletter,
  getNewsletterStats,
  type NewsletterStats,
} from "@/lib/api";

const STORAGE_KEY = "sn_newsletter_admin_pw";

export default function NewsletterAdmin() {
  useSEO({
    title: "Newsletter Admin",
    description: "Compose and send newsletter broadcasts.",
  });

  const [adminPassword, setAdminPassword] = useState<string>(
    () => sessionStorage.getItem(STORAGE_KEY) ?? "",
  );
  const [unlocked, setUnlocked] = useState(false);
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState(
    "<p>Hey ninjas,</p>\n<p>Quick drop from the dojo...</p>\n<p>— John</p>",
  );
  const [testEmail, setTestEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!adminPassword) return;
    setUnlocking(true);
    try {
      const s = await getNewsletterStats(adminPassword);
      setStats(s);
      setUnlocked(true);
      sessionStorage.setItem(STORAGE_KEY, adminPassword);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid password");
    } finally {
      setUnlocking(false);
    }
  }

  useEffect(() => {
    if (!unlocked && adminPassword) {
      // Try auto-unlock from session storage
      getNewsletterStats(adminPassword)
        .then((s) => {
          setStats(s);
          setUnlocked(true);
        })
        .catch(() => {
          sessionStorage.removeItem(STORAGE_KEY);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSendTest() {
    if (!testEmail.trim()) {
      toast.error("Enter a test email address.");
      return;
    }
    if (!subject.trim() || !html.trim()) {
      toast.error("Subject and content are required.");
      return;
    }
    setSendingTest(true);
    try {
      const r = await broadcastNewsletter({
        subject,
        html,
        adminPassword,
        testEmail: testEmail.trim(),
      });
      toast.success(r.message);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send test");
    } finally {
      setSendingTest(false);
    }
  }

  async function handleBroadcast() {
    if (!subject.trim() || !html.trim()) {
      toast.error("Subject and content are required.");
      return;
    }
    if (
      !window.confirm(
        `Send "${subject}" to ${stats?.active ?? "all"} active subscribers? This cannot be undone.`,
      )
    ) {
      return;
    }
    setSending(true);
    try {
      const r = await broadcastNewsletter({
        subject,
        html,
        adminPassword,
      });
      toast.success(r.message);
      // Refresh stats after sending
      try {
        const s = await getNewsletterStats(adminPassword);
        setStats(s);
      } catch {
        // ignore
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send broadcast");
    } finally {
      setSending(false);
    }
  }

  const previewSrcDoc = useMemo(
    () => `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;padding:0;background:#0b0b0f;color:#e7e7ea;font-family:-apple-system,Segoe UI,Roboto,sans-serif;}
      .wrap{max-width:600px;margin:24px auto;background:#15151c;border-radius:8px;overflow:hidden;}
      .body{padding:24px 28px;font-size:15px;line-height:1.6;}
      .footer{padding:18px 28px;border-top:1px solid #2a2a35;font-size:12px;color:#9999a5;}
      a{color:#9999a5;}
    </style></head><body>
      <div class="wrap">
        <div class="body">${html}</div>
        <div class="footer">You're receiving this because you subscribed to the Shotgun Ninjas Productions newsletter.<br><a href="#">Unsubscribe</a></div>
      </div>
    </body></html>`,
    [html],
  );

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto max-w-md px-4 py-24">
          <div className="rounded-lg border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <h1 className="text-2xl font-bold">Newsletter Admin</h1>
            </div>
            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <Label htmlFor="pw">Admin password</Label>
                <Input
                  id="pw"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  autoFocus
                  data-testid="input-admin-password"
                />
              </div>
              <Button
                type="submit"
                disabled={unlocking || !adminPassword}
                className="w-full"
                data-testid="button-unlock"
              >
                {unlocking ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Unlock
              </Button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Newsletter Broadcast</h1>
          {stats && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span data-testid="text-subscriber-count">
                {stats.active} active / {stats.total} total
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Compose</h2>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Latest drop from the dojo"
                data-testid="input-subject"
              />
            </div>
            <div>
              <Label htmlFor="html">Body (HTML)</Label>
              <Textarea
                id="html"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                rows={14}
                className="font-mono text-sm"
                data-testid="input-html"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Plain HTML. The wrapper, footer, and unsubscribe link are added automatically.
              </p>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <Label htmlFor="testEmail">Send a test first</Label>
              <div className="flex gap-2">
                <Input
                  id="testEmail"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="you@example.com"
                  data-testid="input-test-email"
                />
                <Button
                  variant="outline"
                  onClick={handleSendTest}
                  disabled={sendingTest || sending}
                  data-testid="button-send-test"
                >
                  {sendingTest ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  Send test
                </Button>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <Button
                onClick={handleBroadcast}
                disabled={sending || sendingTest}
                className="w-full"
                data-testid="button-send-broadcast"
              >
                {sending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Send to {stats?.active ?? 0} subscribers
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Sending is rate-limited (max 5 broadcasts per hour) and throttled per email.
              </p>
            </div>
          </section>

          <section className="space-y-2 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Preview</h2>
            <iframe
              title="Email preview"
              srcDoc={previewSrcDoc}
              className="h-[640px] w-full rounded border border-border bg-background"
              data-testid="iframe-preview"
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
