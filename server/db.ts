import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('beondt.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS industries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    icon TEXT,
    items TEXT, -- JSON array
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    icon TEXT
  );
  
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    excerpt TEXT,
    content TEXT,
    image TEXT
  );
`);

// Seed Admin User (admin / admin123)
const adminUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminUser) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hash);
}

// Seed Initial Data if empty
const industriesCount = db.prepare('SELECT count(*) as count FROM industries').get() as { count: number };
if (industriesCount.count === 0) {
  const insertIndustry = db.prepare('INSERT INTO industries (title, description, icon, items, image) VALUES (?, ?, ?, ?, ?)');
  
  insertIndustry.run('Industrial Instruments', 'Precision tools, testing instruments, sensors, and measurement systems.', 'Settings', JSON.stringify(["Precision tools", "Testing instruments", "Sensors"]), 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
  insertIndustry.run('Machinery & Equipment', 'Industrial machinery, production lines, agricultural machines.', 'Factory', JSON.stringify(["CNC machines", "Production lines"]), 'https://images.unsplash.com/photo-1531297461136-82af022f0b91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
  insertIndustry.run('Electronics', 'Consumer electronics, industrial electronics, components, and PCBs.', 'Cpu', JSON.stringify(["PCBs", "Components"]), 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
  insertIndustry.run('Building Materials', 'Marble, granite, ceramic tiles, sanitary ware.', 'Layers', JSON.stringify(["Marble", "Granite", "Tiles"]), 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
}

const servicesCount = db.prepare('SELECT count(*) as count FROM services').get() as { count: number };
if (servicesCount.count === 0) {
  const insertService = db.prepare('INSERT INTO services (title, description, icon) VALUES (?, ?, ?)');
  insertService.run('Sourcing & Verification', 'We leverage our extensive database and local network to identify manufacturers that meet your specific quality, capacity, and certification requirements.', 'Search');
  insertService.run('Factory Verification & Audit', 'We conduct on-site audits to verify factory legitimacy, production capabilities, working conditions, and quality management systems (ISO 9001).', 'ShieldCheck');
  insertService.run('Price Negotiation', 'Our local team negotiates directly with factories to secure the best possible pricing and payment terms, overcoming language and cultural barriers.', 'Handshake');
  insertService.run('Sample Development', 'We coordinate the sampling process, ensuring prototypes match your specifications before mass production begins.', 'PenTool');
  insertService.run('Production Monitoring', 'We keep a close eye on production schedules and milestones, providing you with regular updates and photos from the factory floor.', 'Factory');
  insertService.run('Quality Inspection', 'Our engineers perform rigorous inspections at various stages: Pre-production, During Production (DUPRO), and Pre-shipment Inspection (PSI).', 'FileText');
  insertService.run('Export Compliance', 'We handle all necessary export documentation, certificates of origin, and compliance with international trade regulations.', 'Globe');
  insertService.run('Global Logistics', 'From EXW to DDP, we coordinate freight forwarding, customs clearance, and final delivery to your warehouse anywhere in the world.', 'Ship');
}

const blogCount = db.prepare('SELECT count(*) as count FROM blog_posts').get() as { count: number };
if (blogCount.count === 0) {
  const insertBlog = db.prepare('INSERT INTO blog_posts (title, date, excerpt, content, image) VALUES (?, ?, ?, ?, ?)');
  insertBlog.run(
    '5 Common Mistakes When Sourcing Machinery from China',
    'October 15, 2023',
    'Sourcing heavy equipment requires a different approach than consumer goods. Learn the critical pitfalls to avoid.',
    'Full content goes here...',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  );
  insertBlog.run(
    'Understanding Incoterms 2020: A Guide for Importers',
    'September 28, 2023',
    'FOB, EXW, CIF, DDP - what do they mean for your costs and liability? We break down the most common shipping terms.',
    'Full content goes here...',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  );
}

const contentCount = db.prepare('SELECT count(*) as count FROM content').get() as { count: number };
if (contentCount.count === 0) {
  const insertContent = db.prepare('INSERT INTO content (key, value) VALUES (?, ?)');
  insertContent.run('home_hero_title', 'China Industrial Sourcing Made Reliable');
  insertContent.run('home_hero_subtitle', 'End-to-end sourcing, factory verification, quality control, and global logistics for machinery, electronics, agriculture technology, and construction materials.');
  insertContent.run('contact_address', 'No. 90, Innovation Avenue, Hefei, Anhui, China');
  insertContent.run('contact_phone', '+86 0551 6466 2624');
  insertContent.run('contact_email', 'Info@beondt.net');
  insertContent.run('contact_whatsapp_1', '+86 180-5518-2909');
  insertContent.run('contact_whatsapp_2', '+86 157 5518 3636');
}

export default db;
