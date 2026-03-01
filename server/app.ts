import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import db from './db';
import bcrypt from 'bcryptjs';

const app = express();
const SECRET_KEY = process.env.JWT_SECRET || 'beondt-secret-key-change-this';

app.use(express.json());
app.use(cookieParser());

// API Routes

// Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  try {
    const user = db.get('users', (u: any) => u.username === username);
    
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ success: true, user: { username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
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

export default app;
