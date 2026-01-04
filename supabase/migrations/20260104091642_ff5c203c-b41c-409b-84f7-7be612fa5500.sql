-- Update handle_new_user function to validate user metadata input
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_full_name TEXT;
BEGIN
  -- Trim and validate the full_name from user metadata
  user_full_name := TRIM(new.raw_user_meta_data ->> 'full_name');
  
  -- Validate length if name is provided
  IF user_full_name IS NOT NULL AND user_full_name != '' THEN
    IF LENGTH(user_full_name) < 2 OR LENGTH(user_full_name) > 100 THEN
      -- Set to NULL if validation fails rather than raising error
      -- This prevents blocking user signup for name validation issues
      user_full_name := NULL;
    END IF;
  ELSE
    user_full_name := NULL;
  END IF;
  
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (new.id, new.email, user_full_name);
  
  RETURN new;
END;
$$;