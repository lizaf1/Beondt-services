import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://zpuqyadmuzrqlkmpqoaa.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_-ek7V9jB6ETYDQmO-stmWw_ltRZbfqp';

export const supabase = createClient(supabaseUrl, supabaseKey);
