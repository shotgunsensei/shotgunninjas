-- Fix privilege escalation: Prevent users from modifying subscription-related fields
-- Drop existing UPDATE policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create new UPDATE policy that prevents modification of sensitive subscription fields
-- Users can update their profile BUT is_workshop_member and workshop_subscription_id must remain unchanged
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND
  is_workshop_member IS NOT DISTINCT FROM (SELECT p.is_workshop_member FROM public.profiles p WHERE p.user_id = auth.uid()) AND
  workshop_subscription_id IS NOT DISTINCT FROM (SELECT p.workshop_subscription_id FROM public.profiles p WHERE p.user_id = auth.uid())
);