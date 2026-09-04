import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { brokeredPreviewStorage } from './previewAuthStorage';

// SENSOR DATA CLIENT - New Supabase project with smart_bloom_data table (ESP32 sensor readings)
const SENSOR_SUPABASE_URL = "https://nynciqqkmavfazabkgud.supabase.co";
const SENSOR_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55bmNpcXFrbWF2ZmF6YWJrZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTc3MjYsImV4cCI6MjA4NTg3MzcyNn0.RFqZaAdUTCadYwi_bFAsP3LavSabYuQPemO2SNUfS4o";

// CHATBOT/FARM DATA CLIENT - Old Supabase project with edge functions and farm tables
const CHATBOT_SUPABASE_URL = "https://ghghfxiumxqlkxdsyvov.supabase.co";
const CHATBOT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZ2hmeGl1bXhxbGt4ZHN5dm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNzcyMDcsImV4cCI6MjA4NTg1MzIwN30.A9dAktKGDH_4sqkUdUy5GiceNB9IYY9QSEaVmrKrhlc";

// Default client for general use (farm data, auth, etc.) - uses old project
export const supabase = createClient<Database>(CHATBOT_SUPABASE_URL, CHATBOT_SUPABASE_ANON_KEY, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Sensor data client for ESP32 realtime readings - uses new project
export const sensorSupabase = createClient<Database>(SENSOR_SUPABASE_URL, SENSOR_SUPABASE_ANON_KEY, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  }
});
