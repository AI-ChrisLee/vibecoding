import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://hrfdkcjdjqcifxksrstd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyZmRrY2pkanFjaWZ4a3Nyc3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MTY1NDksImV4cCI6MjA2NTA5MjU0OX0.Gc_iJW__UpFCbPzjfD1ETQFkxBO37A3NKj_Dbt1krac'
);
