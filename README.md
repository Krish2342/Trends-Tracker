This is live website like :- https://trends-tracker-6m1v.vercel.app/

📍 Project Progress Documentation


✅ Step 1: make a Code from AI

Used AI (like ChatGPT or GitHub Copilot) to generate the initial code for the Google Trends-style website.

Tech stack used: Next.js, Tailwind CSS, React



---

✅ Step 2: Integrated GNews API

Fetched real-time trending news using the GNews API.

Got API Key and added it to .env.local file for security.

Example used: https://gnews.io/api/v4/top-headlines?token=YOUR_API_KEY&lang=en



---

✅ Step 3: Created Database with Supabase

Created a new Supabase project (hosted PostgreSQL database).

Made tables to store trend data (e.g., trends, categories, etc.)



---

✅ Step 4: Learned Schema and Migration

Understood how to define database schema using .sql files or Supabase Studio.

Created migration files using Supabase CLI to track DB changes over time.



---

⚠ Faced Issue: Migration Errors

While pushing migrations to Supabase, some errors came up.

Errors related to database not being accessible or schema problems.



---

🐳 Step 5: Installed Docker Desktop

Installed Docker Desktop to run local PostgreSQL DB.

Ran database locally using Docker, which helped debug migration issues.

Example command:

docker run --name postgres-local -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres



---

✅ Step 6: Fixed Migration Errors

After setting up Docker, the schema and migration worked properly.

Now Supabase is working both locally (via Docker) and online (via Supabase dashboard).



---

✅ Current Status

Site is successfully running.

Real-time trending data is showing.

Backend and database setup is complete.



---

?? Next Steps (Optional Ideas)

Add user authentication (using Supabase Auth or Clerk
