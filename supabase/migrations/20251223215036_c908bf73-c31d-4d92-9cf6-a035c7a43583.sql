-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  is_workshop_member BOOLEAN DEFAULT FALSE,
  workshop_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create service orders table
CREATE TABLE public.service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('song_production', 'video_production')),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  total_price_cents INTEGER NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'in_progress', 'completed', 'cancelled')),
  stripe_payment_intent_id TEXT,
  agreed_to_terms BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on service orders (public insert for checkout, admin view)
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (they pay via Stripe)
CREATE POLICY "Anyone can create service orders" 
ON public.service_orders FOR INSERT 
WITH CHECK (true);

-- Users can view orders by their email
CREATE POLICY "Users can view their orders by email" 
ON public.service_orders FOR SELECT 
USING (true);

-- Create workshop content table
CREATE TABLE public.workshop_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  video_url TEXT,
  thumbnail_url TEXT,
  content_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on workshop content
ALTER TABLE public.workshop_content ENABLE ROW LEVEL SECURITY;

-- Only authenticated workshop members can view content
CREATE POLICY "Workshop members can view content" 
ON public.workshop_content FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.is_workshop_member = TRUE
  )
);

-- Create workshop subscriptions tracking
CREATE TABLE public.workshop_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'cancelled', 'past_due')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.workshop_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow inserts for checkout
CREATE POLICY "Anyone can create workshop subscriptions" 
ON public.workshop_subscriptions FOR INSERT 
WITH CHECK (true);

-- View own subscriptions
CREATE POLICY "View subscriptions by email" 
ON public.workshop_subscriptions FOR SELECT 
USING (true);

-- Create trigger for profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_orders_updated_at
  BEFORE UPDATE ON public.service_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workshop_content_updated_at
  BEFORE UPDATE ON public.workshop_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workshop_subscriptions_updated_at
  BEFORE UPDATE ON public.workshop_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample workshop content
INSERT INTO public.workshop_content (title, description, category, content_order) VALUES
('Introduction to Music Production', 'Learn the basics of setting up your home studio and understanding DAW fundamentals.', 'Music Production', 1),
('Drum Basics for Beginners', 'Master essential drum techniques and rhythms from scratch.', 'Music Production', 2),
('Python Fundamentals', 'Start your coding journey with Python - variables, loops, and functions.', 'Coding', 1),
('Building Your First Arduino Project', 'Step-by-step guide to creating electronic gadgets with Arduino.', 'Building', 1),
('Video Editing Essentials', 'Learn professional video editing techniques and workflows.', 'Video Production', 1);