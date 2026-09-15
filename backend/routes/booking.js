import express from 'express';

import {
  sendBookingEmail,
  getBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';

import {
  verifyToken,
  requireAdmin,
} from '../middleware/auth.js';

const router = express.Router();


// Public booking submission
router.post(
  '/',
  sendBookingEmail
);


// Admin - get all bookings
router.get(
  '/',
  verifyToken,
  requireAdmin,
  getBookings
);


// Admin - update booking
router.patch(
  '/:id/status',
  verifyToken,
  requireAdmin,
  updateBookingStatus
);


export default router;