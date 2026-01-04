import { useState, useEffect } from 'react';
import { FileText, Video, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface ClanDocument {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string;
  category: string;
  created_at: string;
}

const DocumentsSection = () => {
  const [documents, setDocuments] = useState<ClanDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data, error } = await supabase
          .from('clan_documents')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDocuments(data || []);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const categories = ['all', ...new Set(documents.map(d => d.category))];
  const filteredDocs = selectedCategory === 'all' 
    ? documents 
    : documents.filter(d => d.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="glass-strong rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Resources & Documents</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="capitalize"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="glass rounded-xl p-4 hover:shadow-glow-sm transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              {doc.file_type.startsWith('video/') ? (
                <Video className="h-8 w-8 text-primary shrink-0" />
              ) : (
                <FileText className="h-8 w-8 text-primary shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">{doc.title}</h3>
                {doc.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {doc.description}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground capitalize px-2 py-1 bg-muted rounded">
                    {doc.category}
                  </span>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                  >
                    {doc.file_type.startsWith('video/') ? (
                      <>
                        <ExternalLink className="h-3 w-3" />
                        Watch
                      </>
                    ) : (
                      <>
                        <Download className="h-3 w-3" />
                        Download
                      </>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsSection;
