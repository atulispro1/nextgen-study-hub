import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lryyihefzqpjiedtrdeg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeXlpaGVmenFwamllZHRyZGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwOTM1NzYsImV4cCI6MjA4NzY2OTU3Nn0.WZITUsfaf0UqdK4w4clhlr6bR7gpE_9xP1vPNc_AAuI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

if (typeof window !== "undefined") {
  window.supabase = supabase
}
