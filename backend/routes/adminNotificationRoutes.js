import express from 'express';
import multer from 'multer';

import {
  replaceDailyNewswire,
} from '../controllers/notificationPdfController.js';

import {
  verifyToken,
  requireAdmin,
} from '../middleware/auth.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 20 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

router.post(
  '/daily-newswire',
  verifyToken,
  requireAdmin,
  upload.single('pdfFile'),
  replaceDailyNewswire
);

export default router;