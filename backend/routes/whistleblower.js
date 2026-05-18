import express from 'express'
import { submitWhistleblower } from '../controllers/whistleblowerController.js'

const router = express.Router()

router.post('/', submitWhistleblower)

export default router