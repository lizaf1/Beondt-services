import { createClient } from '@supabase/supabase-js';
import { defaultIndustries, defaultServices, defaultBlogPosts } from './src/lib/defaultData.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://zpuqyadmuzrqlkmpqoaa.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_-ek7V9jB6ETYDQmO-stmWw_ltRZbfqp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding industries...');
  for (const ind of defaultIndustries) {
    const { id, ...rest } = ind;
    const { error } = await supabase.from('industries').insert({ ...rest, items: JSON.stringify(rest.items) });
    if (error) console.error('Error inserting industry:', error);
  }

  console.log('Seeding services...');
  for (const srv of defaultServices) {
    const { id, ...rest } = srv;
    const { error } = await supabase.from('services').insert(rest);
    if (error) console.error('Error inserting service:', error);
  }

  console.log('Seeding blog posts...');
  for (const post of defaultBlogPosts) {
    const { id, ...rest } = post;
    const { error } = await supabase.from('blog_posts').insert(rest);
    if (error) console.error('Error inserting blog post:', error);
  }

  console.log('Seeding complete!');
}

seed();
