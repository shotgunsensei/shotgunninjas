import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WorkshopContent {
  id: string;
  title: string;
  description: string | null;
  category: string;
  video_url: string | null;
  thumbnail_url: string | null;
  content_order: number;
  is_published: boolean;
}

const ContentManager = () => {
  const [content, setContent] = useState<WorkshopContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('tutorial');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('workshop_content')
        .select('*')
        .order('content_order', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      const maxOrder = content.reduce((max, c) => Math.max(max, c.content_order), 0);

      const { error } = await supabase
        .from('workshop_content')
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          category,
          video_url: videoUrl.trim() || null,
          thumbnail_url: thumbnailUrl.trim() || null,
          content_order: maxOrder + 1,
        });

      if (error) throw error;

      toast.success('Content added successfully');
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailUrl('');
      fetchContent();
    } catch (error) {
      console.error('Add error:', error);
      toast.error('Failed to add content');
    }
  };

  const togglePublished = async (item: WorkshopContent) => {
    try {
      const { error } = await supabase
        .from('workshop_content')
        .update({ is_published: !item.is_published })
        .eq('id', item.id);

      if (error) throw error;
      toast.success(item.is_published ? 'Content hidden' : 'Content published');
      fetchContent();
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Failed to update content');
    }
  };

  const deleteContent = async (item: WorkshopContent) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      const { error } = await supabase
        .from('workshop_content')
        .delete()
        .eq('id', item.id);

      if (error) throw error;
      toast.success('Content deleted');
      fetchContent();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete content');
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-4 space-y-4">
        <h3 className="font-semibold text-foreground">Add Workshop Content</h3>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tutorial">Tutorial</SelectItem>
            <SelectItem value="build">Build Guide</SelectItem>
            <SelectItem value="code">Code & Scripts</SelectItem>
            <SelectItem value="knowledge">Knowledge Drop</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Video URL (YouTube, Vimeo, etc.)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <Input
          placeholder="Thumbnail URL"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
        <Button
          onClick={handleAdd}
          disabled={!title.trim()}
          className="w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Content
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Workshop Content</h3>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : content.length === 0 ? (
          <p className="text-muted-foreground text-sm">No content yet</p>
        ) : (
          <div className="space-y-2">
            {content.map((item) => (
              <div key={item.id} className="glass rounded-lg p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Video className="h-5 w-5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePublished(item)}
                    title={item.is_published ? 'Hide' : 'Publish'}
                  >
                    {item.is_published ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteContent(item)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManager;
