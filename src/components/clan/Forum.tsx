import { useState, useEffect } from 'react';
import { MessageSquare, Plus, Pin, Lock, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import TopicView from './TopicView';

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
  reply_count?: number;
}

const Forum = () => {
  const { user } = useAuth();
  const { isAdmin } = useAdminStatus();
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchTopics = async () => {
    try {
      const { data: topicsData, error: topicsError } = await supabase
        .from('clan_forum_topics')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (topicsError) throw topicsError;

      // Get reply counts
      const topicIds = topicsData?.map(t => t.id) || [];
      const { data: replyCounts, error: replyError } = await supabase
        .from('clan_forum_replies')
        .select('topic_id')
        .in('topic_id', topicIds);

      if (replyError) throw replyError;

      const countMap: Record<string, number> = {};
      replyCounts?.forEach(r => {
        countMap[r.topic_id] = (countMap[r.topic_id] || 0) + 1;
      });

      const topicsWithCounts = topicsData?.map(t => ({
        ...t,
        reply_count: countMap[t.id] || 0,
      })) || [];

      setTopics(topicsWithCounts);
    } catch (error) {
      console.error('Error fetching topics:', error);
      toast.error('Failed to load forum topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleCreateTopic = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setCreating(true);
    try {
      const { error } = await supabase
        .from('clan_forum_topics')
        .insert({
          title: title.trim(),
          content: content.trim(),
          user_id: user?.id,
          user_email: user?.email || '',
          user_name: user?.user_metadata?.full_name || null,
        });

      if (error) throw error;

      toast.success('Topic created');
      setTitle('');
      setContent('');
      setShowNewTopic(false);
      fetchTopics();
    } catch (error) {
      console.error('Create error:', error);
      toast.error('Failed to create topic');
    } finally {
      setCreating(false);
    }
  };

  const togglePin = async (topic: ForumTopic) => {
    try {
      const { error } = await supabase
        .from('clan_forum_topics')
        .update({ is_pinned: !topic.is_pinned })
        .eq('id', topic.id);

      if (error) throw error;
      toast.success(topic.is_pinned ? 'Topic unpinned' : 'Topic pinned');
      fetchTopics();
    } catch (error) {
      console.error('Pin error:', error);
      toast.error('Failed to update topic');
    }
  };

  const toggleLock = async (topic: ForumTopic) => {
    try {
      const { error } = await supabase
        .from('clan_forum_topics')
        .update({ is_locked: !topic.is_locked })
        .eq('id', topic.id);

      if (error) throw error;
      toast.success(topic.is_locked ? 'Topic unlocked' : 'Topic locked');
      fetchTopics();
    } catch (error) {
      console.error('Lock error:', error);
      toast.error('Failed to update topic');
    }
  };

  const deleteTopic = async (topic: ForumTopic) => {
    if (!confirm('Delete this topic and all its replies?')) return;

    try {
      const { error } = await supabase
        .from('clan_forum_topics')
        .delete()
        .eq('id', topic.id);

      if (error) throw error;
      toast.success('Topic deleted');
      fetchTopics();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete topic');
    }
  };

  if (selectedTopic) {
    return (
      <TopicView
        topic={selectedTopic}
        onBack={() => {
          setSelectedTopic(null);
          fetchTopics();
        }}
        isAdmin={isAdmin}
      />
    );
  }

  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Discussion Forum</h2>
        </div>
        <Button
          onClick={() => setShowNewTopic(!showNewTopic)}
          variant={showNewTopic ? 'outline' : 'default'}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          New Topic
        </Button>
      </div>

      {showNewTopic && (
        <div className="glass rounded-xl p-4 mb-6 space-y-4">
          <Input
            placeholder="Topic title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleCreateTopic}
              disabled={creating || !title.trim() || !content.trim()}
            >
              {creating ? 'Posting...' : 'Post Topic'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowNewTopic(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No topics yet. Be the first to start a discussion!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="glass rounded-xl p-4 hover:shadow-glow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedTopic(topic)}>
                  <div className="flex items-center gap-2 mb-1">
                    {topic.is_pinned && (
                      <Pin className="h-4 w-4 text-primary shrink-0" />
                    )}
                    {topic.is_locked && (
                      <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <h3 className="font-semibold text-foreground truncate">{topic.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {topic.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{topic.user_name || topic.user_email.split('@')[0]}</span>
                    <span>{new Date(topic.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {topic.reply_count || 0} replies
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isAdmin && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(topic);
                        }}
                        title={topic.is_pinned ? 'Unpin' : 'Pin'}
                      >
                        <Pin className={`h-4 w-4 ${topic.is_pinned ? 'text-primary' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLock(topic);
                        }}
                        title={topic.is_locked ? 'Unlock' : 'Lock'}
                      >
                        <Lock className={`h-4 w-4 ${topic.is_locked ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTopic(topic);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {(topic.user_id === user?.id && !isAdmin) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTopic(topic);
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forum;
