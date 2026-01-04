-- Fix storage bucket security: Make clan-files bucket private and update policies

-- 1. Make bucket private
UPDATE storage.buckets SET public = false WHERE id = 'clan-files';

-- 2. Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view clan files" ON storage.objects;

-- 3. Create proper policy for workshop members to view files
CREATE POLICY "Workshop members can view clan files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'clan-files' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.is_workshop_member = true
  )
);