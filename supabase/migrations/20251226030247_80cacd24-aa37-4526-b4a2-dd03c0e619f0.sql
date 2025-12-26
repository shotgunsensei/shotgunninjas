-- Fix: Explicitly deny anonymous access to profiles table (defense in depth)
-- Drop existing SELECT policy and recreate with explicit role targeting

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create SELECT policy targeting only authenticated role
CREATE POLICY "Authenticated users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Explicitly deny anonymous access (defense in depth)
CREATE POLICY "Deny anonymous profile access"
ON public.profiles
FOR SELECT
TO anon
USING (false);