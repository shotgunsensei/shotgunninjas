
-- 1. Drop user_email from forum tables (no longer needed, not displayed)
ALTER TABLE public.clan_forum_topics DROP COLUMN user_email;
ALTER TABLE public.clan_forum_replies DROP COLUMN user_email;

-- 2. Add length validation triggers for forum content
CREATE OR REPLACE FUNCTION public.validate_forum_topic()
RETURNS TRIGGER AS $$
BEGIN
  IF LENGTH(NEW.title) > 200 THEN
    RAISE EXCEPTION 'Topic title must be 200 characters or less';
  END IF;
  IF LENGTH(NEW.content) > 10000 THEN
    RAISE EXCEPTION 'Topic content must be 10,000 characters or less';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_forum_topic_trigger
BEFORE INSERT OR UPDATE ON public.clan_forum_topics
FOR EACH ROW EXECUTE FUNCTION public.validate_forum_topic();

CREATE OR REPLACE FUNCTION public.validate_forum_reply()
RETURNS TRIGGER AS $$
BEGIN
  IF LENGTH(NEW.content) > 10000 THEN
    RAISE EXCEPTION 'Reply content must be 10,000 characters or less';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_forum_reply_trigger
BEFORE INSERT OR UPDATE ON public.clan_forum_replies
FOR EACH ROW EXECUTE FUNCTION public.validate_forum_reply();

-- 3. Fix profiles policies: convert from RESTRICTIVE to PERMISSIVE, scoped to authenticated
DROP POLICY IF EXISTS "Deny anonymous profile access" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Recreate as PERMISSIVE (default) with TO authenticated
CREATE POLICY "Authenticated users can view own profile" ON public.profiles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  (auth.uid() = user_id)
  AND (NOT (is_workshop_member IS DISTINCT FROM (SELECT p.is_workshop_member FROM profiles p WHERE p.user_id = auth.uid())))
  AND (NOT (workshop_subscription_id IS DISTINCT FROM (SELECT p.workshop_subscription_id FROM profiles p WHERE p.user_id = auth.uid())))
);
