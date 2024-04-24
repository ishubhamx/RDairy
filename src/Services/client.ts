import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://svbxgqoqdymyezgiivxd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YnhncW9xZHlteWV6Z2lpdnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3MTI0MDcsImV4cCI6MTk4OTI4ODQwN30.KD5tXKBrkIwN5veCj17tcxFDbpYurEPUEPd0O1lg_2E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})