import express from "express";
import { verifyToken, requireAdmin } from '../middleware/auth.js';


import {
    createDemoAccount,getDemoAccounts
} from "../controllers/demoAccountController.js";

const router = express.Router();

router.post("/", createDemoAccount);
router.get("/",verifyToken, requireAdmin, getDemoAccounts);


export default router;