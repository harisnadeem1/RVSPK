import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pool from './config/db.js';
import authRoutes from './routes/auth.js';
import reportsRoutes from './routes/reports.js';
import usersRoutes from './routes/users.js';
import contactRoutes from './routes/contact.js';
import pdfRoutes from './routes/pdf.js'  


dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/pdf', pdfRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Seed Super Admin on first run ────────────────────────────
async function seedSuperAdmin() {
  try {
    const existing = await pool.query(
      'SELECT id FROM users WHERE role = $1 LIMIT 1',
      ['super_admin']
    );

    if (existing.rows.length > 0) {
      console.log('Super admin already exists — skipping seed');
      return;
    }

    const hash = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 12);

    await pool.query(
      `INSERT INTO users (email, password_hash, role, full_name)
       VALUES ($1, $2, 'super_admin', $3)`,
      [
        process.env.SUPER_ADMIN_EMAIL,
        hash,
        process.env.SUPER_ADMIN_NAME,
      ]
    );

    console.log('Super admin seeded successfully');
    console.log(`   Email: ${process.env.SUPER_ADMIN_EMAIL}`);
  } catch (err) {
    console.error('Seed error:', err);
  }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedSuperAdmin();
});