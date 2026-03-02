import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import db from './db.js';
import bcrypt from 'bcryptjs';

const app = express();
const SECRET_KEY = process.env.JWT_SECRET || 'beondt-secret-key-change-this';

app.use(express.json());
app.use(cookieParser());

// API Routes

// Auth
app.post('/api/auth/login', (req, res) => {
  // Handle Vercel serverless function body parsing
  let body = req.body;
  
  // If body is empty or undefined, default to empty object
  if (!body) {
    body = {};
  } else if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.error('Failed to parse body:', e);
      body = {};
    }
  } else if (Buffer.isBuffer(body)) {
      try {
          body = JSON.parse(body.toString());
      } catch (e) {
          console.error('Failed to parse Buffer body:', e);
          body = {};
      }
  }
  
  const username = body.username;
  const password = body.password;
  
  console.log(`Login attempt for user: ${username}`);
  
  try {
    // ROBUST AUTH STRATEGY:
    // 1. Check environment variables/hardcoded fallback first (Guaranteed access)
    // 2. Check database second (Dynamic users)
    
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Beondt2024!'; // New robust password
    
    let user = null;
    let isMatch = false;

    // Check Hardcoded/Env Admin
    if (username === ADMIN_USER) {
      // Direct string comparison for env var (or use bcrypt if you hash the env var)
      // For simplicity and robustness here, we compare directly if it's the fallback
      if (password === ADMIN_PASS) {
        user = { id: 0, username: ADMIN_USER, role: 'admin' };
        isMatch = true;
      } else {
         // If env var didn't match, check if it's hashed in DB (unlikely for env, but good practice)
         // But here we just fail this check and fall through to DB check
      }
    }

    // If not found via Env, check DB (safely)
    if (!user) {
        try {
          const dbUser = db.get('users', (u: any) => u.username === username);
          if (dbUser) {
              isMatch = bcrypt.compareSync(password, dbUser.password);
              if (isMatch) {
                  user = dbUser;
              }
          }
        } catch (dbError) {
          console.error('Database lookup failed during auth:', dbError);
          // Do not fail the request, just continue. 
          // If env auth failed and DB auth crashed, user remains null and we return 401 below.
        }
    }
    
    if (!user || !isMatch) {
      console.log(`Auth failed for: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(`Auth successful for: ${username}`);
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
    
    // Set cookie
    res.cookie('token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // 'strict' can cause issues with some redirects
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({ success: true, user: { username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Debug endpoint to check users (remove in production if needed, but useful now)
app.get('/api/debug/users', (req, res) => {
  try {
    const users = db.all('users').map((u: any) => ({ ...u, password: '[HIDDEN]' }));
    res.json({ 
      users, 
      dbPath: process.env.VERCEL === '1' ? '/tmp/beondt-data.json' : 'beondt-data.json',
      env: process.env.NODE_ENV
    });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ user: decoded });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Middleware for protected routes
const requireAuth = (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// CRUD Endpoints

// Industries
app.get('/api/industries', (req, res) => {
  try {
    const industries = db.all('industries');
    res.json(industries.map((i: any) => ({ ...i, items: JSON.parse(i.items || '[]') })));
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/industries', requireAuth, (req, res) => {
  const { title, description, icon, items, image } = req.body;
  const info = db.insert('industries', { title, description, icon, items: JSON.stringify(items), image });
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/industries/:id', requireAuth, (req, res) => {
  const { title, description, icon, items, image } = req.body;
  db.update('industries', parseInt(req.params.id), { title, description, icon, items: JSON.stringify(items), image });
  res.json({ success: true });
});

app.delete('/api/industries/:id', requireAuth, (req, res) => {
  db.delete('industries', parseInt(req.params.id));
  res.json({ success: true });
});

// Services
app.get('/api/services', (req, res) => {
  const services = db.all('services');
  res.json(services);
});

app.post('/api/services', requireAuth, (req, res) => {
  const { title, description, icon } = req.body;
  const info = db.insert('services', { title, description, icon });
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/services/:id', requireAuth, (req, res) => {
  const { title, description, icon } = req.body;
  db.update('services', parseInt(req.params.id), { title, description, icon });
  res.json({ success: true });
});

app.delete('/api/services/:id', requireAuth, (req, res) => {
  db.delete('services', parseInt(req.params.id));
  res.json({ success: true });
});

// Blog Posts
app.get('/api/blog', (req, res) => {
  const posts = db.all('blog_posts');
  // Sort by ID desc manually since JSON array order is insertion order
  posts.sort((a: any, b: any) => b.id - a.id);
  res.json(posts);
});

app.post('/api/blog', requireAuth, (req, res) => {
  const { title, date, excerpt, content, image } = req.body;
  const info = db.insert('blog_posts', { title, date, excerpt, content, image });
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/blog/:id', requireAuth, (req, res) => {
  const { title, date, excerpt, content, image } = req.body;
  db.update('blog_posts', parseInt(req.params.id), { title, date, excerpt, content, image });
  res.json({ success: true });
});

app.delete('/api/blog/:id', requireAuth, (req, res) => {
  db.delete('blog_posts', parseInt(req.params.id));
  res.json({ success: true });
});

// General Content
app.get('/api/content', (req, res) => {
  const content = db.all('content');
  const contentMap = content.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
  res.json(contentMap);
});

app.post('/api/content', requireAuth, (req, res) => {
  const { key, value } = req.body;
  const existing = db.get('content', (c: any) => c.key === key);
  if (existing) {
    db.updateWhere('content', (c: any) => c.key === key, { value });
  } else {
    db.insert('content', { key, value });
  }
  res.json({ success: true });
});

// Enquiries
app.get('/api/enquiries', requireAuth, (req, res) => {
  const enquiries = db.all('enquiries') || [];
  // Sort by ID desc (newest first)
  enquiries.sort((a: any, b: any) => b.id - a.id);
  res.json(enquiries);
});

app.post('/api/enquiries', (req, res) => {
  const { name, company, email, phone, message, type = 'contact' } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newEnquiry = {
    name,
    company: company || '',
    email,
    phone: phone || '',
    message,
    type, // 'contact' or 'quote'
    date: new Date().toISOString(),
    status: 'new'
  };

  const info = db.insert('enquiries', newEnquiry);
  res.status(201).json({ id: info.lastInsertRowid, ...newEnquiry });
});

app.put('/api/enquiries/:id', requireAuth, (req, res) => {
  const { status } = req.body;
  if (status) {
    db.update('enquiries', parseInt(req.params.id), { status });
  }
  res.json({ success: true });
});

app.delete('/api/enquiries/:id', requireAuth, (req, res) => {
  db.delete('enquiries', parseInt(req.params.id));
  res.json({ success: true });
});

export default app;
