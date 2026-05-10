import express from 'express'
import { streamPdf } from '../controllers/pdfController.js'

const router = express.Router()

router.get('/:slug', streamPdf)

export default router