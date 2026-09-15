import express from "express";
import { verifyToken, requireAdmin } from '../middleware/auth.js';


import {
  createDemoAccount,
  getDemoAccounts,
  updateDemoAccountStatus,
} from "../controllers/demoAccountController.js";

const router = express.Router();

router.post("/", createDemoAccount);

router.get(
  "/",
  verifyToken,
  requireAdmin,
  getDemoAccounts
);

router.patch(
  "/:id/status",
  verifyToken,
  requireAdmin,
  updateDemoAccountStatus
);


export default router;