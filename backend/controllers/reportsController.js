import pool from '../config/db.js';
import supabase from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const BUCKET = process.env.SUPABASE_BUCKET;

// ── Upload Report ─────────────────────────────────────────────
export async function uploadReport(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const {
      reportType,
      documentName,
      description,
      tagText,
      reportDate,
      reportMonth,
    } = req.body;

    if (!reportType) {
      return res.status(400).json({ error: 'Report type is required' });
    }

    if (reportType === 'daily' && !reportDate) {
      return res.status(400).json({ error: 'Report date is required for daily reports' });
    }

    if (reportType === 'monthly' && !reportMonth) {
      return res.status(400).json({ error: 'Report month is required for monthly reports' });
    }

    // ── Upload file to Supabase Storage ──
    const fileExt = 'pdf';
    const uniqueFileName = `${uuidv4()}.${fileExt}`;
    const storagePath = `${reportType}/${uniqueFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file.buffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return res.status(500).json({ error: 'Failed to upload file to storage' });
    }

    // ── Get public URL ──
    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    const fileUrl = urlData.publicUrl;

    // ── Save metadata to PostgreSQL ──
    const docName = documentName || file.originalname.replace('.pdf', '');

    const result = await pool.query(
      `INSERT INTO reports
        (document_name, description, tag_text, report_type, report_date, report_month, file_url, file_name, file_size, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        docName,
        description || null,
        tagText || 'PMEX Report',
        reportType,
        reportType === 'daily' ? reportDate : null,
        reportType === 'monthly' ? reportMonth : null,
        fileUrl,
        file.originalname,
        file.size,
        req.user.id,
      ]
    );

    return res.status(201).json({
      success: true,
      report: result.rows[0],
    });
  } catch (err) {
    console.error('uploadReport error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ── Get All Reports (public) ──────────────────────────────────
export async function getReports(req, res) {
  try {
    const { type, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `SELECT * FROM reports`;
    const params = [];

    if (type) {
      query += ` WHERE report_type = $1`;
      params.push(type);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = `SELECT COUNT(*) FROM reports`;
    const countParams = [];
    if (type) {
      countQuery += ` WHERE report_type = $1`;
      countParams.push(type);
    }
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    return res.status(200).json({
      reports: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('getReports error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ── Get Single Report ─────────────────────────────────────────
export async function getReport(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM reports WHERE id = $1',
      [id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Report not found' });
    }

    return res.status(200).json({ report: result.rows[0] });
  } catch (err) {
    console.error('getReport error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ── Update Report (metadata only) ────────────────────────────
export async function updateReport(req, res) {
  try {
    const { id } = req.params;
    const { documentName, description, tagText, reportDate, reportMonth } = req.body;

    const existing = await pool.query(
      'SELECT * FROM reports WHERE id = $1',
      [id]
    );

    if (!existing.rows[0]) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const result = await pool.query(
      `UPDATE reports SET
        document_name = COALESCE($1, document_name),
        description   = COALESCE($2, description),
        tag_text      = COALESCE($3, tag_text),
        report_date   = COALESCE($4, report_date),
        report_month  = COALESCE($5, report_month)
       WHERE id = $6
       RETURNING *`,
      [
        documentName || null,
        description || null,
        tagText || null,
        reportDate || null,
        reportMonth || null,
        id,
      ]
    );

    return res.status(200).json({
      success: true,
      report: result.rows[0],
    });
  } catch (err) {
    console.error('updateReport error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ── Delete Report ─────────────────────────────────────────────
export async function deleteReport(req, res) {
  try {
    const { id } = req.params;

    const existing = await pool.query(
      'SELECT * FROM reports WHERE id = $1',
      [id]
    );

    if (!existing.rows[0]) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = existing.rows[0];

    // ── Delete from Supabase Storage ──
    // Extract storage path from public URL
    const urlParts = report.file_url.split(`${BUCKET}/`);
    const storagePath = urlParts[1];

    const { error: deleteError } = await supabase.storage
      .from(BUCKET)
      .remove([storagePath]);

    if (deleteError) {
      console.error('Supabase delete error:', deleteError);
      // Continue to delete DB record even if storage delete fails
    }

    // ── Delete from PostgreSQL ──
    await pool.query('DELETE FROM reports WHERE id = $1', [id]);

    return res.status(200).json({
      success: true,
      message: 'Report deleted successfully',
    });
  } catch (err) {
    console.error('deleteReport error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}