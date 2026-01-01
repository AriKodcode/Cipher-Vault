import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

let db;
async function connectToSupebase() {
  if (db) {
    return db;
  }
  db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  console.log('connected to supabase');
  return db;
}

export default connectToSupebase;
