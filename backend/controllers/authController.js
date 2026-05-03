import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

// POST /api/auth/login
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email.toLowerCase().trim()]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Update last login timestamp
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// GET /api/auth/me
export async function getMe(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, email, role, full_name, last_login, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user: result.rows[0] });
  } catch (err) {
    console.error('getMe error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// POST /api/auth/logout
export async function logout(req, res) {
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}