import express from 'express';
import {
  getAdmins,
  createAdmin,
  toggleAdminStatus,
  deleteAdmin,
} from '../controllers/usersController.js';
import { verifyToken, requireSuperAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes — super admin only
router.use(verifyToken, requireSuperAdmin);

router.get('/admins',              getAdmins);
router.post('/admins',             createAdmin);
router.patch('/admins/:id/toggle', toggleAdminStatus);
router.delete('/admins/:id',       deleteAdmin);

export default router;