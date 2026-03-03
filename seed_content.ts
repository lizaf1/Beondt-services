import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://zpuqyadmuzrqlkmpqoaa.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_-ek7V9jB6ETYDQmO-stmWw_ltRZbfqp';

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultContent = {
  logo_url: '/logo.png',
  footer_about_text: 'BEONDT Sourcing is your trusted partner for industrial and commercial procurement in China. We bridge the gap between global buyers and top-tier Chinese manufacturers.',
  home_hero_title: 'China Industrial Sourcing \n<span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-lime-400">Made Reliable</span>',
  home_hero_subtitle: 'End-to-end sourcing, factory verification, quality control, and global logistics for machinery, electronics, agriculture technology, and construction materials.',
  home_about_title: 'Why Choose BEONDT?',
  home_about_subtitle: 'Your Bridge to China\'s Best Manufacturers',
  home_about_text: 'With over a decade of experience on the ground in China, we eliminate the risks associated with international procurement. Our team of engineers, negotiators, and logistics experts ensure you get exactly what you ordered, on time, and at the right price.',
  services_header_title: 'Our Services',
  services_header_subtitle: 'Comprehensive procurement solutions designed to minimize risk and maximize value.',
  industries_header_title: 'Industries We Serve',
  industries_header_subtitle: 'Specialized sourcing expertise across key industrial and commercial sectors.',
  blog_header_title: 'Sourcing Insights',
  blog_header_subtitle: 'Expert advice, market trends, and guides for importing from China.',
  contact_header_title: 'Contact Us',
  contact_header_subtitle: 'Get in touch with our team to discuss your sourcing requirements.',
  contact_address: 'No. 90, Innovation Avenue, Hefei\nAnhui, China',
  contact_phone: '+86 0551 6466 2624',
  contact_whatsapp_1: '+86 180-5518-2909',
  contact_whatsapp_2: '',
  contact_email: 'Info@beondt.net',
  quote_header_title: 'Request a Quote',
  quote_header_subtitle: 'Tell us about your project requirements, and we\'ll provide a detailed proposal.'
};

async function seedContent() {
  console.log('Seeding content...');
  for (const [key, value] of Object.entries(defaultContent)) {
    const { error } = await supabase.from('content').upsert({ key, value }, { onConflict: 'key' });
    if (error) console.error(`Error upserting content ${key}:`, error);
  }
  console.log('Content seeding complete!');
}

seedContent();
