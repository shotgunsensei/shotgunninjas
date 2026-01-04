import { useState, useEffect } from 'react';
import { Upload, FileText, Video, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ClanDocument {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string;
  file_size: number | null;
  category: string;
  is_published: boolean;
  created_at: string;
}

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<ClanDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('document');
  const [file, setFile] = useState<File | null>(null);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('clan_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast.error('Please provide a title and select a file');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('clan-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Store the file path (not a public URL) - signed URLs will be generated on access

      const { error: dbError } = await supabase
        .from('clan_documents')
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          file_url: filePath,
          file_type: file.type,
          file_size: file.size,
          category,
        });

      if (dbError) throw dbError;

      toast.success('Document uploaded successfully');
      setTitle('');
      setDescription('');
      setFile(null);
      fetchDocuments();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const togglePublished = async (doc: ClanDocument) => {
    try {
      const { error } = await supabase
        .from('clan_documents')
        .update({ is_published: !doc.is_published })
        .eq('id', doc.id);

      if (error) throw error;
      toast.success(doc.is_published ? 'Document hidden' : 'Document published');
      fetchDocuments();
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Failed to update document');
    }
  };

  const deleteDocument = async (doc: ClanDocument) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      // Extract file path from URL
      const urlParts = doc.file_url.split('/clan-files/');
      if (urlParts[1]) {
        await supabase.storage.from('clan-files').remove([urlParts[1]]);
      }

      const { error } = await supabase
        .from('clan_documents')
        .delete()
        .eq('id', doc.id);

      if (error) throw error;
      toast.success('Document deleted');
      fetchDocuments();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete document');
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-4 space-y-4">
        <h3 className="font-semibold text-foreground">Upload New Content</h3>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="document">Document</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="tutorial">Tutorial</SelectItem>
            <SelectItem value="guide">Guide</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept=".pdf,.doc,.docx,.mp4,.mov,.avi,.mkv,.jpg,.jpeg,.png,.gif"
        />
        <Button
          onClick={handleUpload}
          disabled={uploading || !file || !title.trim()}
          className="w-full gap-2"
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Uploaded Content</h3>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : documents.length === 0 ? (
          <p className="text-muted-foreground text-sm">No documents uploaded yet</p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="glass rounded-lg p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {doc.file_type.startsWith('video/') ? (
                    <Video className="h-5 w-5 text-primary shrink-0" />
                  ) : (
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">{doc.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePublished(doc)}
                    title={doc.is_published ? 'Hide' : 'Publish'}
                  >
                    {doc.is_published ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteDocument(doc)}
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

export default DocumentUpload;
