-- Fix service_orders SELECT policy - restrict to authenticated users viewing their own orders
DROP POLICY IF EXISTS "Users can view their orders by email" ON public.service_orders;

CREATE POLICY "Users can view their own orders"
ON public.service_orders
FOR SELECT
TO authenticated
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Fix workshop_subscriptions SELECT policy - restrict to authenticated users viewing their own subscriptions
DROP POLICY IF EXISTS "View subscriptions by email" ON public.workshop_subscriptions;

CREATE POLICY "Users can view their own subscriptions"
ON public.workshop_subscriptions
FOR SELECT
TO authenticated
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));