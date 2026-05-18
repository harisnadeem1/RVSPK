import express from 'express'
import multer from 'multer'
import { submitGrievance } from '../controllers/grievanceController.js'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/jpg']
    cb(null, allowed.includes(file.mimetype))
  }
})

const router = express.Router()

router.post('/', upload.array('files', 5), submitGrievance)

export default router