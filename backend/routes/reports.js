import express from 'express';
import multer from 'multer';
import {
  uploadReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
} from '../controllers/reportsController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Multer — store in memory (we stream to Supabase)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

// Public
router.get('/',    getReports);
router.get('/:id', getReport);

// Protected (admin only)
router.post('/',       verifyToken, requireAdmin, upload.single('pdfFile'), uploadReport);
router.put('/:id',     verifyToken, requireAdmin, updateReport);
router.delete('/:id',  verifyToken, requireAdmin, deleteReport);

export default router;