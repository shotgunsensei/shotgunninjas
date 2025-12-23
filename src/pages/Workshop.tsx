import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Play, Lock, Crown, Settings, ArrowLeft } from 'lucide-react';
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

const Workshop = () => {
  const { user, session, subscription, loading, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState<WorkshopContent[]>([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Subscription successful! Welcome to the Workshop.');
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
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Ninja Workshop
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exclusive training content for dedicated ninjas
          </p>
        </div>

        {!subscription.subscribed ? (
          <div className="max-w-xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 text-center">
              <Crown className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Unlock Premium Content
              </h2>
              <p className="text-muted-foreground mb-6">
                Get access to exclusive training videos, live sessions, and advanced techniques with our monthly membership.
              </p>
              
              <div className="bg-card rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-gradient mb-2">$20</div>
                <div className="text-muted-foreground">per month</div>
              </div>

              <ul className="text-left space-y-3 mb-8">
                {['Full access to all training videos', 'Live Q&A sessions', 'Exclusive technique breakdowns', 'Community access'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6"
              >
                {checkoutLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Subscribe Now'
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 glass rounded-xl">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-primary" />
                <span className="text-foreground font-medium">Active Member</span>
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
                              <Play className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="h-16 w-16 text-primary" />
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

export default Workshop;
