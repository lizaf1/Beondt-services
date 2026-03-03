import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://zpuqyadmuzrqlkmpqoaa.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_-ek7V9jB6ETYDQmO-stmWw_ltRZbfqp';

export const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  all: async (table: string) => {
    const { data, error } = await supabase.from(table).select('*').order('id', { ascending: true });
    if (error) {
      console.error(`Error fetching all from ${table}:`, error);
      return [];
    }
    return data || [];
  },
  get: async (table: string, match: object) => {
    const { data, error } = await supabase.from(table).select('*').match(match).maybeSingle();
    if (error) {
      console.error(`Error getting from ${table}:`, error);
      return null;
    }
    return data;
  },
  insert: async (table: string, record: any) => {
    const { data, error } = await supabase.from(table).insert(record).select().single();
    if (error) {
      console.error(`Error inserting into ${table}:`, error);
      throw error;
    }
    return { lastInsertRowid: data.id, ...data };
  },
  update: async (table: string, id: number, record: any) => {
    const { data, error } = await supabase.from(table).update(record).eq('id', id).select().single();
    if (error) {
      console.error(`Error updating ${table}:`, error);
      throw error;
    }
    return data;
  },
  updateWhere: async (table: string, match: object, record: any) => {
    const { data, error } = await supabase.from(table).update(record).match(match).select();
    if (error) {
      console.error(`Error updateWhere in ${table}:`, error);
      throw error;
    }
    return data;
  },
  delete: async (table: string, id: number) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      console.error(`Error deleting from ${table}:`, error);
      throw error;
    }
    return true;
  }
};
