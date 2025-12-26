-- Add UPDATE policy for service_orders - allow users to cancel their pending orders
CREATE POLICY "Users can cancel their pending orders"
ON public.service_orders
FOR UPDATE
TO authenticated
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid()) AND
  status = 'pending'
)
WITH CHECK (
  status IN ('pending', 'cancelled') AND
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);