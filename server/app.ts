import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { supabase } from './db.js';

const app = express();
const SECRET_KEY = process.env.JWT_SECRET || 'beondt-secret-key-change-this';

app.use(express.json());
app.use(cookieParser());

// Multer setup for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const file = req.file;
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { data, error } = await supabase.storage
      .from('images') // Ensure you have a bucket named 'images' in Supabase
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: error.message });
    }

    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    res.json({ url: publicUrlData.publicUrl });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Auth
app.post('/api/auth/login', async (req, res) => {
  let body = req.body;
  if (!body) body = {};
  else if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  } else if (Buffer.isBuffer(body)) {
    try { body = JSON.parse(body.toString()); } catch (e) { body = {}; }
  }
  
  const username = body.username;
  const password = body.password;
  
  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Beondt2024!';
  
  let user = null;
  let isMatch = false;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    user = { id: 0, username: ADMIN_USER, role: 'admin' };
    isMatch = true;
  }

  if (!user) {
    try {
      const { data: dbUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
        
      if (dbUser && !error) {
        isMatch = bcrypt.compareSync(password, dbUser.password);
        if (isMatch) user = dbUser;
      }
    } catch (dbError) {
      console.error('Database lookup failed during auth:', dbError);
    }
  }
  
  if (!user || !isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
  
  res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
  });
  
  res.json({ success: true, user: { username: user.username } });
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

// Industries
app.get('/api/industries', async (req, res) => {
  const { data, error } = await supabase.from('industries').select('*').order('id', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json((data || []).map((i: any) => ({ ...i, items: i.items ? JSON.parse(i.items) : [] })));
});

app.post('/api/industries', requireAuth, async (req, res) => {
  const { title, description, icon, items, image } = req.body;
  const { data, error } = await supabase.from('industries').insert([{ title, description, icon, items: JSON.stringify(items), image }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ id: data[0].id });
});

app.put('/api/industries/:id', requireAuth, async (req, res) => {
  const { title, description, icon, items, image } = req.body;
  const { error } = await supabase.from('industries').update({ title, description, icon, items: JSON.stringify(items), image }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.delete('/api/industries/:id', requireAuth, async (req, res) => {
  const { error } = await supabase.from('industries').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// Services
app.get('/api/services', async (req, res) => {
  const { data, error } = await supabase.from('services').select('*').order('id', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

app.post('/api/services', requireAuth, async (req, res) => {
  const { title, description, icon } = req.body;
  const { data, error } = await supabase.from('services').insert([{ title, description, icon }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ id: data[0].id });
});

app.put('/api/services/:id', requireAuth, async (req, res) => {
  const { title, description, icon } = req.body;
  const { error } = await supabase.from('services').update({ title, description, icon }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.delete('/api/services/:id', requireAuth, async (req, res) => {
  const { error } = await supabase.from('services').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// Blog Posts
app.get('/api/blog', async (req, res) => {
  const { data, error } = await supabase.from('blog_posts').select('*').order('id', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

app.post('/api/blog', requireAuth, async (req, res) => {
  const { title, date, excerpt, content, image } = req.body;
  const { data, error } = await supabase.from('blog_posts').insert([{ title, date, excerpt, content, image }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ id: data[0].id });
});

app.put('/api/blog/:id', requireAuth, async (req, res) => {
  const { title, date, excerpt, content, image } = req.body;
  const { error } = await supabase.from('blog_posts').update({ title, date, excerpt, content, image }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.delete('/api/blog/:id', requireAuth, async (req, res) => {
  const { error } = await supabase.from('blog_posts').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// General Content
app.get('/api/content', async (req, res) => {
  const { data, error } = await supabase.from('content').select('*');
  if (error) return res.status(500).json({ error: error.message });
  const contentMap = (data || []).reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
  res.json(contentMap);
});

app.post('/api/content', requireAuth, async (req, res) => {
  const { key, value } = req.body;
  const { data: existing } = await supabase.from('content').select('*').eq('key', key).single();
  
  if (existing) {
    const { error } = await supabase.from('content').update({ value }).eq('key', key);
    if (error) return res.status(500).json({ error: error.message });
  } else {
    const { error } = await supabase.from('content').insert([{ key, value }]);
    if (error) return res.status(500).json({ error: error.message });
  }
  res.json({ success: true });
});

// Enquiries
app.get('/api/enquiries', requireAuth, async (req, res) => {
  const { data, error } = await supabase.from('enquiries').select('*').order('id', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

app.post('/api/enquiries', async (req, res) => {
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
    type,
    date: new Date().toISOString(),
    status: 'new'
  };

  const { data, error } = await supabase.from('enquiries').insert([newEnquiry]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ id: data[0].id, ...newEnquiry });
});

app.put('/api/enquiries/:id', requireAuth, async (req, res) => {
  const { status } = req.body;
  if (status) {
    const { error } = await supabase.from('enquiries').update({ status }).eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
  }
  res.json({ success: true });
});

app.delete('/api/enquiries/:id', requireAuth, async (req, res) => {
  const { error } = await supabase.from('enquiries').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default app;
