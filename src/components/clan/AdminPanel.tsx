import { useState } from 'react';
import { Shield, Upload, Users, FileText, Video, Trash2, Ban, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentUpload from './DocumentUpload';
import BannedUsersPanel from './BannedUsersPanel';
import ContentManager from './ContentManager';

const AdminPanel = () => {
  return (
    <div className="glass-strong rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="content" className="gap-2">
            <Video className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContentManager />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentUpload />
        </TabsContent>

        <TabsContent value="users">
          <BannedUsersPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
