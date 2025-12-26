import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Wrench, Video, Code, Brain, Crown, Settings, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkshopContent {
  id: string;
  title: string;
  description: string | null;
  category: string;
  video_url: string | null;
  thumbnail_url: string | null;
  content_order: number;
}

const memberBenefits = [
  {
    icon: Wrench,
    title: "Build Vault",
    items: ["Step-by-step gadget builds", "Mods, upgrades, and variants", "Parts lists and schematics", "Real-world troubleshooting notes"],
  },
  {
    icon: Video,
    title: "Video Library",
    items: ["Music production techniques", "Video editing workflows", "Programming and automation", "Networking and security", "Homelab and hardware projects"],
  },
  {
    icon: Code,
    title: "Code & Automation Vault",
    items: ["Ready-to-use scripts", "Templates and configs", "Explained line-by-line", "Real-world use cases"],
  },
  {
    icon: Brain,
    title: "Knowledge Drops",
    items: ["Monthly deep-dive topics", "Lessons learned from real builds", "\"Why this failed\" breakdowns", "Design philosophy insights"],
  },
];

const faqs = [
  { q: "Do I need to be an expert to join the Clan?", a: "No — but you should be curious and willing to learn. This is not beginner-only content." },
  { q: "Are the build guides beginner friendly?", a: "They are clear, not dumbed down. We explain why things work, not just what to click." },
  { q: "Can I cancel the Clan subscription?", a: "Yes. Anytime. No lock-ins." },
  { q: "Do you sell my data?", a: "No. Ever." },
];

const Clan = () => {
  const { user, session, subscription, loading, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState<WorkshopContent[]>([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Welcome to the Shotgun Ninja Clan!');
      checkSubscription();
    } else if (searchParams.get('canceled') === 'true') {
      toast.info('Checkout was canceled.');
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchContent = async () => {
      if (!subscription.subscribed) {
        setContentLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('workshop_content')
          .select('*')
          .eq('is_published', true)
          .order('content_order', { ascending: true });

        if (error) throw error;
        setContent(data || []);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setContentLoading(false);
      }
    };

    if (!subscription.loading) {
      fetchContent();
    }
  }, [subscription.subscribed, subscription.loading]);

  const handleCheckout = async () => {
    if (!session) return;

    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!session) return;

    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Portal error:', error);
      toast.error('Failed to open subscription management. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading || subscription.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, WorkshopContent[]>);

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-glow opacity-20" />
      
      <div className="relative container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-4 uppercase">
            Members Only
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            The Shotgun Ninja Clan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The Clan is where builders go deeper. This is where we stop selling — and start teaching.
          </p>
        </div>

        {!subscription.subscribed ? (
          <div className="max-w-4xl mx-auto">
            {/* Pricing Card */}
            <div className="glass-strong rounded-2xl p-8 text-center mb-12">
              <Crown className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Join the Shotgun Ninja Clan
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                A members-only knowledge vault with full build instructions, advanced DIY projects, instructional videos, code, scripts, and lessons learned from real-world failures.
              </p>
              
              <div className="bg-card rounded-xl p-6 mb-6 inline-block">
                <div className="text-4xl font-bold text-gradient mb-2">$20</div>
                <div className="text-muted-foreground">per month · cancel anytime</div>
              </div>

              <div className="mb-8">
                <Button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6 px-12"
                  size="lg"
                >
                  {checkoutLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Join the Clan'
                  )}
                </Button>
              </div>
            </div>

            {/* Member Benefits */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">What Members Get</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {memberBenefits.map((benefit) => (
                  <div key={benefit.title} className="glass rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary p-2">
                        <benefit.icon className="w-full h-full text-primary-foreground" />
                      </div>
                      <h4 className="font-display font-bold text-foreground">{benefit.title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {benefit.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It's For */}
            <div className="glass rounded-xl p-8 mb-12 text-center">
              <h3 className="text-xl font-bold text-foreground mb-4">Who the Clan Is For</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["Makers and builders", "DIY technologists", "Creators who want technical leverage", "IT professionals and power users", "Privacy-conscious homeowners"].map((item) => (
                  <span key={item} className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h3>
              <div className="space-y-4 max-w-2xl mx-auto">
                {faqs.map((faq, index) => (
                  <div key={index} className="glass rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="font-semibold text-foreground">{faq.q}</span>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-4 pb-4 text-muted-foreground">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="text-center text-sm text-muted-foreground max-w-xl mx-auto">
              <p className="mb-2 font-semibold text-foreground">Plain-English Terms:</p>
              <ul className="space-y-1">
                <li>• Membership grants access to private content while subscribed</li>
                <li>• Content is for personal use only</li>
                <li>• Redistribution or resale of Clan material is not allowed</li>
                <li>• Builds and scripts are provided "as-is" — you are responsible for implementation</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 glass rounded-xl">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-primary" />
                <span className="text-foreground font-medium">Clan Member</span>
                {subscription.subscriptionEnd && (
                  <span className="text-muted-foreground text-sm">
                    · Renews {new Date(subscription.subscriptionEnd).toLocaleDateString()}
                  </span>
                )}
              </div>
              <Button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                variant="outline"
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                {portalLoading ? 'Loading...' : 'Manage Subscription'}
              </Button>
            </div>

            {contentLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : content.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No content available yet. Check back soon!</p>
              </div>
            ) : (
              Object.entries(groupedContent).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-foreground mb-4 capitalize">{category}</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="glass rounded-xl overflow-hidden group hover:shadow-glow-sm transition-all duration-300"
                      >
                        <div className="aspect-video bg-card relative">
                          {item.thumbnail_url ? (
                            <img
                              src={item.thumbnail_url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Video className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Video className="h-16 w-16 text-primary" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Clan;
