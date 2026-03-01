import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

// Determine if running on Vercel or production environment where root might be read-only
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
const dbPath = isProduction ? '/tmp/beondt-data.json' : path.resolve('beondt-data.json');

console.log(`Initializing JSON database at: ${dbPath}`);

interface DB {
  users: any[];
  content: any[];
  industries: any[];
  services: any[];
  blog_posts: any[];
}

const defaultData: DB = {
  users: [],
  content: [],
  industries: [],
  services: [],
  blog_posts: []
};

class JsonDB {
  private data: DB;

  constructor() {
    if (fs.existsSync(dbPath)) {
      try {
        this.data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      } catch (e) {
        console.error('Error reading DB, resetting:', e);
        this.data = { ...defaultData };
      }
    } else {
      this.data = { ...defaultData };
      this.save();
    }
    this.seed();
  }

  private save() {
    fs.writeFileSync(dbPath, JSON.stringify(this.data, null, 2));
  }

  private seed() {
    // Seed Admin User
    const adminUser = this.data.users.find(u => u.username === 'admin');
    const adminHash = bcrypt.hashSync('admin123', 10);

    if (!adminUser) {
      console.log('Creating admin user');
      this.data.users.push({ id: 1, username: 'admin', password: adminHash });
      this.save();
    } else {
      // Reset password just in case
      console.log('Resetting admin password');
      adminUser.password = adminHash;
      this.save();
    }

    // Seed Initial Data if empty
    if (this.data.industries.length === 0) {
      this.data.industries.push(
        { id: 1, title: 'Industrial Instruments', description: 'Precision tools, testing instruments, sensors, and measurement systems.', icon: 'Settings', items: JSON.stringify(["Precision tools", "Testing instruments", "Sensors"]), image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Machinery & Equipment', description: 'Industrial machinery, production lines, agricultural machines.', icon: 'Factory', items: JSON.stringify(["CNC machines", "Production lines"]), image: 'https://images.unsplash.com/photo-1531297461136-82af022f0b91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'Electronics', description: 'Consumer electronics, industrial electronics, components, and PCBs.', icon: 'Cpu', items: JSON.stringify(["PCBs", "Components"]), image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 4, title: 'Building Materials', description: 'Marble, granite, ceramic tiles, sanitary ware.', icon: 'Layers', items: JSON.stringify(["Marble", "Granite", "Tiles"]), image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
      );
      this.save();
    }

    if (this.data.services.length === 0) {
      this.data.services.push(
        { id: 1, title: 'Sourcing & Verification', description: 'We leverage our extensive database and local network to identify manufacturers that meet your specific quality, capacity, and certification requirements.', icon: 'Search' },
        { id: 2, title: 'Factory Verification & Audit', description: 'We conduct on-site audits to verify factory legitimacy, production capabilities, working conditions, and quality management systems (ISO 9001).', icon: 'ShieldCheck' },
        { id: 3, title: 'Price Negotiation', description: 'Our local team negotiates directly with factories to secure the best possible pricing and payment terms, overcoming language and cultural barriers.', icon: 'Handshake' },
        { id: 4, title: 'Sample Development', description: 'We coordinate the sampling process, ensuring prototypes match your specifications before mass production begins.', icon: 'PenTool' },
        { id: 5, title: 'Production Monitoring', description: 'We keep a close eye on production schedules and milestones, providing you with regular updates and photos from the factory floor.', icon: 'Factory' },
        { id: 6, title: 'Quality Inspection', description: 'Our engineers perform rigorous inspections at various stages: Pre-production, During Production (DUPRO), and Pre-shipment Inspection (PSI).', icon: 'FileText' },
        { id: 7, title: 'Export Compliance', description: 'We handle all necessary export documentation, certificates of origin, and compliance with international trade regulations.', icon: 'Globe' },
        { id: 8, title: 'Global Logistics', description: 'From EXW to DDP, we coordinate freight forwarding, customs clearance, and final delivery to your warehouse anywhere in the world.', icon: 'Ship' }
      );
      this.save();
    }

    if (this.data.blog_posts.length === 0) {
      this.data.blog_posts.push(
        { id: 1, title: '5 Common Mistakes When Sourcing Machinery from China', date: 'October 15, 2023', excerpt: 'Sourcing heavy equipment requires a different approach than consumer goods. Learn the critical pitfalls to avoid.', content: 'Full content goes here...', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Understanding Incoterms 2020: A Guide for Importers', date: 'September 28, 2023', excerpt: 'FOB, EXW, CIF, DDP - what do they mean for your costs and liability? We break down the most common shipping terms.', content: 'Full content goes here...', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
      );
      this.save();
    }

    if (this.data.content.length === 0) {
      this.data.content.push(
        { id: 1, key: 'home_hero_title', value: 'China Industrial Sourcing Made Reliable' },
        { id: 2, key: 'home_hero_subtitle', value: 'End-to-end sourcing, factory verification, quality control, and global logistics for machinery, electronics, agriculture technology, and construction materials.' },
        { id: 3, key: 'contact_address', value: '128 Wanshui Road, Hefei, Anhui, China' },
        { id: 4, key: 'contact_phone', value: '+86 0551 6466 2624' },
        { id: 5, key: 'contact_email', value: 'Info@beondt.net' },
        { id: 6, key: 'contact_whatsapp_1', value: '+86 180-5518-2909' },
        { id: 7, key: 'contact_whatsapp_2', value: '+86 157 5518 3636' }
      );
      this.save();
    }
  }

  // Helper methods to mimic better-sqlite3 somewhat, but simplified for JSON
  get(table: keyof DB, where?: (item: any) => boolean) {
    if (where) {
      return this.data[table].find(where);
    }
    return this.data[table];
  }

  all(table: keyof DB, where?: (item: any) => boolean) {
    if (where) {
      return this.data[table].filter(where);
    }
    // Return a copy to avoid mutation issues if not intended
    return [...this.data[table]];
  }

  insert(table: keyof DB, item: any) {
    const newId = (this.data[table].length > 0 ? Math.max(...this.data[table].map(i => i.id)) : 0) + 1;
    const newItem = { ...item, id: newId };
    this.data[table].push(newItem);
    this.save();
    return { lastInsertRowid: newId };
  }

  update(table: keyof DB, id: number, updates: any) {
    const index = this.data[table].findIndex(i => i.id == id);
    if (index !== -1) {
      this.data[table][index] = { ...this.data[table][index], ...updates };
      this.save();
      return { changes: 1 };
    }
    return { changes: 0 };
  }
  
  updateWhere(table: keyof DB, where: (item: any) => boolean, updates: any) {
      const index = this.data[table].findIndex(where);
      if (index !== -1) {
          this.data[table][index] = { ...this.data[table][index], ...updates };
          this.save();
          return { changes: 1 };
      }
      return { changes: 0 };
  }

  delete(table: keyof DB, id: number) {
    const initialLength = this.data[table].length;
    this.data[table] = this.data[table].filter(i => i.id != id);
    if (this.data[table].length !== initialLength) {
      this.save();
      return { changes: 1 };
    }
    return { changes: 0 };
  }
}

const db = new JsonDB();
export default db;
