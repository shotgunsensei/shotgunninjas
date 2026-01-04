import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// Allowed origins for CORS - restrict to specific domains and ports
const getAllowedOrigin = (requestOrigin: string | null): string => {
  const allowedOrigins = [
    Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '.lovableproject.com') || '',
    'https://lovable.dev',
    'http://localhost:5173',
    'http://localhost:8080',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8080',
  ].filter(Boolean);
  
  return allowedOrigins.includes(requestOrigin || '') ? requestOrigin! : allowedOrigins[0] || '';
};

const getCorsHeaders = (req: Request) => ({
  "Access-Control-Allow-Origin": getAllowedOrigin(req.headers.get("origin")),
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Credentials": "true",
});

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

// Map internal errors to safe user-facing messages
const getSafeErrorResponse = (error: unknown): { message: string; status: number } => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  if (errorMessage.includes('not authenticated') || errorMessage.includes('authorization')) {
    return { message: 'Authentication required. Please sign in again.', status: 401 };
  }
  if (errorMessage.includes('STRIPE_SECRET_KEY')) {
    return { message: 'Service configuration error. Please contact support.', status: 500 };
  }
  
  return { message: 'An error occurred. Please try again later.', status: 500 };
};

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found");
      // Update profile to not subscribed
      await supabaseClient
        .from('profiles')
        .update({ is_workshop_member: false, workshop_subscription_id: null })
        .eq('user_id', user.id);
      
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    
    const hasActiveSub = subscriptions.data.length > 0;
    let subscriptionEnd = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      logStep("Active subscription found", { subscriptionId: subscription.id, endDate: subscriptionEnd });
      
      // Update profile to subscribed
      await supabaseClient
        .from('profiles')
        .update({ 
          is_workshop_member: true, 
          workshop_subscription_id: subscription.id 
        })
        .eq('user_id', user.id);
    } else {
      logStep("No active subscription found");
      // Update profile to not subscribed
      await supabaseClient
        .from('profiles')
        .update({ is_workshop_member: false, workshop_subscription_id: null })
        .eq('user_id', user.id);
    }

    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_end: subscriptionEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage, stack: error instanceof Error ? error.stack : undefined });
    
    const safeError = getSafeErrorResponse(error);
    return new Response(JSON.stringify({ error: safeError.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: safeError.status,
    });
  }
});
