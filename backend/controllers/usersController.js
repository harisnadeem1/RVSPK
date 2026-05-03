import bcrypt from 'bcrypt';
import pool from '../config/db.js';

// GET /api/users/admins — list all admins
export async function getAdmins(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, email, full_name, role, is_active, last_login, created_at
       FROM users
       WHERE role = 'admin'
       ORDER BY created_at DESC`
    );

    return res.status(200).json({ admins: result.rows });
  } catch (err) {
    console.error('getAdmins error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// POST /api/users/admins — create new admin
export async function createAdmin(req, res) {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Email, password, and full name are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  try {
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const hash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash, role, full_name)
       VALUES ($1, $2, 'admin', $3)
       RETURNING id, email, full_name, role, is_active, created_at`,
      [email.toLowerCase().trim(), hash, fullName]
    );

    return res.status(201).json({
      success: true,
      admin: result.rows[0],
    });
  } catch (err) {
    console.error('createAdmin error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// PATCH /api/users/admins/:id/toggle — activate/deactivate
export async function toggleAdminStatus(req, res) {
  const { id } = req.params;

  try {
    const existing = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND role = $2',
      [id, 'admin']
    );

    if (!existing.rows[0]) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const result = await pool.query(
      `UPDATE users SET is_active = NOT is_active
       WHERE id = $1
       RETURNING id, email, full_name, role, is_active`,
      [id]
    );

    return res.status(200).json({
      success: true,
      admin: result.rows[0],
    });
  } catch (err) {
    console.error('toggleAdminStatus error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE /api/users/admins/:id
export async function deleteAdmin(req, res) {
  const { id } = req.params;

  // Prevent super admin from deleting themselves
  if (id === req.user.id) {
    return res.status(400).json({ error: 'You cannot delete your own account' });
  }

  try {
    const existing = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND role = $2',
      [id, 'admin']
    );

    if (!existing.rows[0]) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    await pool.query('DELETE FROM users WHERE id = $1', [id]);

    return res.status(200).json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (err) {
    console.error('deleteAdmin error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}