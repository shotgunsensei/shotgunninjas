import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Trash2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  user_id: string;
  user_email: string;
  user_name: string | null;
  is_pinned: boolean;
  is_locked: boolean;
  created_at: string;
}

interface ForumReply {
  id: string;
  topic_id: string;
  content: string;
  user_id: string;
  user_email: string;
  user_name: string | null;
  created_at: string;
}

interface TopicViewProps {
  topic: ForumTopic;
  onBack: () => void;
  isAdmin: boolean;
}

const TopicView = ({ topic, onBack, isAdmin }: TopicViewProps) => {
  const { user } = useAuth();
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [posting, setPosting] = useState(false);

  const fetchReplies = async () => {
    try {
      const { data, error } = await supabase
        .from('clan_forum_replies')
        .select('*')
        .eq('topic_id', topic.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [topic.id]);

  const handlePostReply = async () => {
    if (!replyContent.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    setPosting(true);
    try {
      const { error } = await supabase
        .from('clan_forum_replies')
        .insert({
          topic_id: topic.id,
          content: replyContent.trim(),
          user_id: user?.id,
          user_email: user?.email || '',
          user_name: user?.user_metadata?.full_name || null,
        });

      if (error) throw error;

      toast.success('Reply posted');
      setReplyContent('');
      fetchReplies();
    } catch (error: any) {
      console.error('Reply error:', error);
      if (error.message?.includes('is_locked')) {
        toast.error('This topic is locked');
      } else {
        toast.error('Failed to post reply');
      }
    } finally {
      setPosting(false);
    }
  };

  const deleteReply = async (reply: ForumReply) => {
    if (!confirm('Delete this reply?')) return;

    try {
      const { error } = await supabase
        .from('clan_forum_replies')
        .delete()
        .eq('id', reply.id);

      if (error) throw error;
      toast.success('Reply deleted');
      fetchReplies();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete reply');
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Forum
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          {topic.is_locked && (
            <Lock className="h-4 w-4 text-yellow-500" />
          )}
          <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          By {topic.user_name || 'Member'} · {new Date(topic.created_at).toLocaleDateString()}
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-foreground whitespace-pre-wrap">{topic.content}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-foreground">
          Replies ({replies.length})
        </h2>

        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : replies.length === 0 ? (
          <p className="text-muted-foreground text-sm">No replies yet</p>
        ) : (
          <div className="space-y-3">
            {replies.map((reply) => (
              <div key={reply.id} className="glass rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">
                        {reply.user_name || 'Member'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(reply.created_at).toLocaleDateString()} at {new Date(reply.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">{reply.content}</p>
                  </div>
                  {(isAdmin || reply.user_id === user?.id) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteReply(reply)}
                      className="text-destructive hover:text-destructive shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!topic.is_locked ? (
          <div className="glass rounded-xl p-4 space-y-4">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={3}
            />
            <Button
              onClick={handlePostReply}
              disabled={posting || !replyContent.trim()}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {posting ? 'Posting...' : 'Post Reply'}
            </Button>
          </div>
        ) : (
          <div className="glass rounded-xl p-4 text-center text-muted-foreground">
            <Lock className="h-5 w-5 mx-auto mb-2" />
            This topic is locked. No new replies can be posted.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicView;
