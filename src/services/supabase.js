import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ohrlvlswrpabhinbxhie.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ocmx2bHN3cnBhYmhpbmJ4aGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2NzMzMTQsImV4cCI6MjAzMTI0OTMxNH0.y-DAnCWT2KD8lp6PibOCS5YDwFr8gePszKRmXFeYCig";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
