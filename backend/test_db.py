from database import supabase

all_scans = supabase.table("scans").select("*").execute()
print(all_scans.data)