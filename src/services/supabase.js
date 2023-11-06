import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wobjcazvecgdprslnehj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYmpjYXp2ZWNnZHByc2xuZWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1OTk2MjcsImV4cCI6MjAxNDE3NTYyN30._I1fA-710NkZM6zkReO_xNg2qChFVD6GD0iZ3MIdZJI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
