import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vrczzcqxayqtzmwsozbm.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyY3p6Y3F4YXlxdHptd3NvemJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDAyMDEsImV4cCI6MjA5NTg3NjIwMX0.i73tiN87YtYl6ZbyjnAhPyiW8NHZnd4dmc7eqfr6Lxc'

// Create Supabase client using project credentials with fallback to ensure
// Google OAuth, login, and signup work reliably both locally and in production (e.g. Vercel)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
