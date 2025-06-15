import psycopg2
import os
import traceback

os.environ['DATABASE_URL'] = "postgresql://postgres:CelebrateItVvFsmMNuCevBEkTC@db.fbkiuzuduvokbvwqxdnv.supabase.co:5432/postgres"

try:
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    print("Connection successful!")
except Exception as e:
    print("Connection failed:")
    traceback.print_exc()
