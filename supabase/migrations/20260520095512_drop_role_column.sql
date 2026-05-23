-- Migration to completely drop the role column from the users table.
ALTER TABLE IF EXISTS public.users DROP COLUMN IF EXISTS role;
