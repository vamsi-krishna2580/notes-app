import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ibqynreniwpcpzofspnb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicXlucmVuaXdwY3B6b2ZzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzA3MTEsImV4cCI6MjA4ODcwNjcxMX0.oRyRS7cBRYk0SSEaIL1x1aW-G_-wjZtBiPMbhK18tp0'

export const supabase = createClient(supabaseUrl, supabaseKey)