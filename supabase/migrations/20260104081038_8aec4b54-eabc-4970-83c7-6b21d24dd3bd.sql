-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.is_admin(auth.uid()));

-- Create clan_forum_topics table
CREATE TABLE public.clan_forum_topics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    user_email TEXT NOT NULL,
    user_name TEXT,
    is_pinned BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.clan_forum_topics ENABLE ROW LEVEL SECURITY;

-- Create clan_forum_replies table
CREATE TABLE public.clan_forum_replies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id uuid REFERENCES public.clan_forum_topics(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    user_email TEXT NOT NULL,
    user_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.clan_forum_replies ENABLE ROW LEVEL SECURITY;

-- Create banned_users table
CREATE TABLE public.banned_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    banned_by uuid REFERENCES auth.users(id) NOT NULL,
    reason TEXT,
    banned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE -- NULL means permanent
);

ALTER TABLE public.banned_users ENABLE ROW LEVEL SECURITY;

-- Create clan_documents table for uploaded files
CREATE TABLE public.clan_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    category TEXT NOT NULL DEFAULT 'document',
    uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.clan_documents ENABLE ROW LEVEL SECURITY;

-- Function to check if user is banned
CREATE OR REPLACE FUNCTION public.is_banned(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.banned_users
    WHERE user_id = _user_id
      AND (expires_at IS NULL OR expires_at > now())
  )
$$;

-- RLS policies for clan_forum_topics
CREATE POLICY "Workshop members can view topics"
ON public.clan_forum_topics
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.is_workshop_member = true
  )
  AND NOT public.is_banned(auth.uid())
);

CREATE POLICY "Workshop members can create topics"
ON public.clan_forum_topics
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.is_workshop_member = true
  )
  AND NOT public.is_banned(auth.uid())
);

CREATE POLICY "Users can update own topics"
ON public.clan_forum_topics
FOR UPDATE
USING (
  auth.uid() = user_id
  AND NOT public.is_banned(auth.uid())
);

CREATE POLICY "Users can delete own topics"
ON public.clan_forum_topics
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all topics"
ON public.clan_forum_topics
FOR ALL
USING (public.is_admin(auth.uid()));

-- RLS policies for clan_forum_replies
CREATE POLICY "Workshop members can view replies"
ON public.clan_forum_replies
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.is_workshop_member = true
  )
  AND NOT public.is_banned(auth.uid())
);

CREATE POLICY "Workshop members can create replies"
ON public.clan_forum_replies
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.is_workshop_member = true
  )
  AND NOT public.is_banned(auth.uid())
  AND NOT EXISTS (
    SELECT 1 FROM clan_forum_topics
    WHERE id = topic_id AND is_locked = true
  )
);

CREATE POLICY "Users can update own replies"
ON public.clan_forum_replies
FOR UPDATE
USING (
  auth.uid() = user_id
  AND NOT public.is_banned(auth.uid())
);

CREATE POLICY "Users can delete own replies"
ON public.clan_forum_replies
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all replies"
ON public.clan_forum_replies
FOR ALL
USING (public.is_admin(auth.uid()));

-- RLS policies for banned_users
CREATE POLICY "Admins can view banned users"
ON public.banned_users
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage bans"
ON public.banned_users
FOR ALL
USING (public.is_admin(auth.uid()));

-- RLS policies for clan_documents
CREATE POLICY "Workshop members can view documents"
ON public.clan_documents
FOR SELECT
USING (
  is_published = true
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.is_workshop_member = true
  )
);

CREATE POLICY "Admins can manage documents"
ON public.clan_documents
FOR ALL
USING (public.is_admin(auth.uid()));

-- Create trigger for updated_at on new tables
CREATE TRIGGER update_clan_forum_topics_updated_at
BEFORE UPDATE ON public.clan_forum_topics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clan_forum_replies_updated_at
BEFORE UPDATE ON public.clan_forum_replies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clan_documents_updated_at
BEFORE UPDATE ON public.clan_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for clan files
INSERT INTO storage.buckets (id, name, public) VALUES ('clan-files', 'clan-files', true);

-- Storage policies for clan-files bucket
CREATE POLICY "Admins can upload clan files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'clan-files' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can update clan files"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'clan-files' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete clan files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'clan-files' AND public.is_admin(auth.uid()));

CREATE POLICY "Anyone can view clan files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'clan-files');

-- Function to auto-assign admin role for specific emails
CREATE OR REPLACE FUNCTION public.auto_assign_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IN ('john@shotgunninjas.com', 'johntwms355@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to auto-assign admin on user creation
CREATE TRIGGER on_auth_user_created_assign_admin
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.auto_assign_admin_role();