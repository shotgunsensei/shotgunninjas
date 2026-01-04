-- Add admin management policies for workshop_content table
CREATE POLICY "Admins can manage workshop content"
ON public.workshop_content
FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));