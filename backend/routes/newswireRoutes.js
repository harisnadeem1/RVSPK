import express from 'express';

import {
  subscribeToNewswire,
} from '../controllers/newswireSubscriberController.js';

import {
  getSubscribers,
  addSubscriber,
  updateSubscriberStatus,
  deleteSubscriber,
  sendDailyNewswire,
} from '../controllers/adminNewswireController.js';

import {
  verifyToken,
  requireAdmin,
} from '../middleware/auth.js';

const router = express.Router();


// PUBLIC
router.post(
  '/subscribe',
  subscribeToNewswire
);


// ADMIN
router.get(
  '/admin/subscribers',
  verifyToken,
  requireAdmin,
  getSubscribers
);

router.post(
  '/admin/subscribers',
  verifyToken,
  requireAdmin,
  addSubscriber
);

router.patch(
  '/admin/subscribers/:id/status',
  verifyToken,
  requireAdmin,
  updateSubscriberStatus
);

router.delete(
  '/admin/subscribers/:id',
  verifyToken,
  requireAdmin,
  deleteSubscriber
);

router.post(
  '/admin/subscribers/send',
  verifyToken,
  requireAdmin,
  sendDailyNewswire
);


export default router;