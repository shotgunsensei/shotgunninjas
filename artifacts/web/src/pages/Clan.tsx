import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  Video,
  Code,
  BookOpen,
  Users,
  Wrench,
  Zap,
  Lock,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  FileText,
  Plus,
  Send,
  Trash2,
  Pin,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth, signout } from "@/lib/auth";
import {
  listTopics,
  createTopic,
  deleteTopic,
  listReplies,
  createReply,
  listDocuments,
  type ForumTopic,
  type ForumReply,
  type ClanDocument,
} from "@/lib/clan-api";

const benefits = [
  { icon: Wrench, title: "Build Vault", description: "Step-by-step gadget builds, schematics, and parts lists." },
  { icon: Video, title: "Video Library", description: "Music production, programming, networking, and hardware project tutorials." },
  { icon: Code, title: "Code & Automation Vault", description: "Scripts, templates, configurations, and automation recipes." },
  { icon: BookOpen, title: "Knowledge Drops", description: 'Monthly deep-dives, technical breakdowns, and "Why this failed" post-mortems.' },
];

const faq = [
  { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no guilt trips. Cancel whenever you want." },
  { q: "What kind of content is included?", a: "Build guides, video tutorials, automation scripts, templates, and monthly deep-dive articles." },
  { q: "Is there a community aspect?", a: "Yes. Clan members get access to a private discussion forum to connect with other builders." },
  { q: "Do I need to be technical?", a: "Some content is advanced, but we design everything to be approachable." },
];

function ClanLanding() {
  return (
    <>
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider border border-primary/30 mb-6">
          <Lock className="h-3.5 w-3.5" />
          MEMBERS ONLY
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          The Shotgun Ninja <span className="text-gradient">Clan</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
          This is where we stop selling and start teaching.
        </p>
        <p className="text-muted-foreground max-w-xl mx-auto">
          The Clan is a private community for builders who want to go deeper.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 text-center mb-16">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2 font-[var(--font-display)]">$20</h2>
        <p className="text-muted-foreground mb-6">per month</p>
        <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
          {["Full access to the Build Vault", "Complete Video Library", "Code & Automation templates", "Monthly Knowledge Drops", "Private discussion forum", "Cancel anytime — no contracts"].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm text-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <Link to="/auth" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
          Join the Clan
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-12 font-[var(--font-display)]">What You Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <b.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-[var(--font-display)]">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 font-[var(--font-display)]">
          <HelpCircle className="inline h-6 w-6 mr-2 text-primary" />FAQ
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-sm mb-2 text-foreground">{item.q}</h3>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ClanMemberArea() {
  const { user, setUser } = useAuth();
  const [tab, setTab] = useState<"forum" | "documents">("forum");
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [documents, setDocuments] = useState<ClanDocument[]>([]);
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newReply, setNewReply] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTopics = useCallback(async () => {
    try {
      setTopics(await listTopics());
    } catch {
      toast.error("Failed to load forum topics");
    }
  }, []);

  const fetchDocuments = useCallback(async () => {
    try {
      setDocuments(await listDocuments());
    } catch {
      toast.error("Failed to load documents");
    }
  }, []);

  useEffect(() => {
    fetchTopics();
    fetchDocuments();
  }, [fetchTopics, fetchDocuments]);

  const handleCreateTopic = async () => {
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;
    setSubmitting(true);
    try {
      await createTopic({ title: newTopicTitle, content: newTopicContent });
      setNewTopicTitle("");
      setNewTopicContent("");
      setShowNewTopic(false);
      fetchTopics();
      toast.success("Topic created");
    } catch {
      toast.error("Failed to create topic");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTopic = async (id: number) => {
    if (!confirm("Delete this topic and all replies?")) return;
    try {
      await deleteTopic(id);
      if (selectedTopic?.id === id) setSelectedTopic(null);
      fetchTopics();
      toast.success("Topic deleted");
    } catch {
      toast.error("Failed to delete topic");
    }
  };

  const openTopic = async (topic: ForumTopic) => {
    setSelectedTopic(topic);
    try {
      setReplies(await listReplies(topic.id));
    } catch {
      toast.error("Failed to load replies");
    }
  };

  const handleReply = async () => {
    if (!selectedTopic || !newReply.trim()) return;
    setSubmitting(true);
    try {
      await createReply(selectedTopic.id, newReply);
      setNewReply("");
      setReplies(await listReplies(selectedTopic.id));
      toast.success("Reply posted");
    } catch {
      toast.error("Failed to post reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signout();
    setUser(null);
    toast.info("Signed out");
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-[var(--font-display)]">Clan Dashboard</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/30">
              <Shield className="h-3 w-3" /> Clan Member
            </span>
            {user?.isAdmin && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Admin
              </span>
            )}
            <span className="text-sm text-muted-foreground">{user?.displayName}</span>
          </div>
        </div>
        <button onClick={handleSignOut} className="px-4 py-2 text-sm border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          Sign Out
        </button>
      </div>

      <div className="flex gap-2 mb-8">
        <button onClick={() => { setTab("forum"); setSelectedTopic(null); }} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "forum" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
          <MessageSquare className="h-4 w-4" /> Forum
        </button>
        <button onClick={() => setTab("documents")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "documents" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
          <FileText className="h-4 w-4" /> Documents
        </button>
      </div>

      {tab === "forum" && !selectedTopic && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-[var(--font-display)]">Discussion Forum</h2>
            <button onClick={() => setShowNewTopic(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">
              <Plus className="h-4 w-4" /> New Topic
            </button>
          </div>

          {showNewTopic && (
            <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
              <input value={newTopicTitle} onChange={(e) => setNewTopicTitle(e.target.value)} placeholder="Topic title" className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <textarea value={newTopicContent} onChange={(e) => setNewTopicContent(e.target.value)} placeholder="What's on your mind?" rows={4} className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              <div className="flex gap-2">
                <button onClick={handleCreateTopic} disabled={submitting} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50">
                  {submitting ? "Posting..." : "Post Topic"}
                </button>
                <button onClick={() => { setShowNewTopic(false); setNewTopicTitle(""); setNewTopicContent(""); }} className="px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {topics.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No topics yet. Start the conversation!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {topics.map((topic) => (
                <div key={topic.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/20 transition-colors cursor-pointer" onClick={() => openTopic(topic)}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {topic.isPinned && <Pin className="h-3.5 w-3.5 text-primary" />}
                        <h3 className="font-bold text-sm truncate">{topic.title}</h3>
                        {topic.isLocked && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        by {topic.authorName || "Unknown"} &middot; {formatDate(topic.createdAt)}
                      </p>
                    </div>
                    {user?.isAdmin && (
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteTopic(topic.id); }} className="p-1.5 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "forum" && selectedTopic && (
        <div>
          <button onClick={() => setSelectedTopic(null)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="h-4 w-4" /> Back to topics
          </button>

          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              {selectedTopic.isPinned && <Pin className="h-4 w-4 text-primary" />}
              <h2 className="text-xl font-bold font-[var(--font-display)]">{selectedTopic.title}</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              by {selectedTopic.authorName || "Unknown"} &middot; {formatDate(selectedTopic.createdAt)}
            </p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{selectedTopic.content}</p>
          </div>

          <h3 className="text-sm font-bold text-muted-foreground mb-4">
            {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
          </h3>

          <div className="space-y-3 mb-6">
            {replies.map((reply) => (
              <div key={reply.id} className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-foreground whitespace-pre-wrap mb-2">{reply.content}</p>
                <p className="text-xs text-muted-foreground">
                  {reply.authorName || "Unknown"} &middot; {formatDate(reply.createdAt)}
                </p>
              </div>
            ))}
          </div>

          {!selectedTopic.isLocked && (
            <div className="flex gap-2">
              <input value={newReply} onChange={(e) => setNewReply(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleReply()} placeholder="Write a reply..." className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <button onClick={handleReply} disabled={submitting || !newReply.trim()} className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "documents" && (
        <div>
          <h2 className="text-xl font-bold font-[var(--font-display)] mb-6">Resources & Documents</h2>
          {documents.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No documents available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-primary uppercase">{doc.category}</span>
                      <h3 className="font-bold text-sm mt-1">{doc.title}</h3>
                      {doc.description && <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>}
                      <p className="text-xs text-muted-foreground mt-2">
                        by {doc.uploaderName || "Unknown"} &middot; {formatDate(doc.createdAt)}
                      </p>
                    </div>
                    {user?.isAdmin && (
                      <button onClick={async () => { if (confirm("Delete this document?")) { try { const { deleteDocument: del } = await import("@/lib/clan-api"); await del(doc.id); fetchDocuments(); toast.success("Document deleted"); } catch { toast.error("Failed to delete"); } }}} className="p-1.5 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function Clan() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : user ? (
            <ClanMemberArea />
          ) : (
            <ClanLanding />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
