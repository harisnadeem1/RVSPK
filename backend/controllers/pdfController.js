import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ALLOWED_PDFS = {
  // Policies
  'privacy-policy':                  { folder: 'policies', file: 'privacy-policy.pdf' },
  'customer-grievances-redressal':   { folder: 'policies', file: 'customer-grievances-redressal.pdf' },
  'risk-management':                 { folder: 'policies', file: 'risk-management.pdf' },
  'cdd-kyc':                         { folder: 'policies', file: 'cdd-kyc.pdf' },
  'whistleblowing':                  { folder: 'policies', file: 'whistleblowing.pdf' },
  'conflict-of-interest':            { folder: 'policies', file: 'conflict-of-interest.pdf' },

  // Clients Area
  'no-cash-policy':                  { folder: 'clients', file: 'no-cash-policy.pdf' },
  'guidelines-clients':              { folder: 'clients', file: 'guidelines-clients.pdf' },
  'account-opening-guide':           { folder: 'clients', file: 'account-opening-guide.pdf' },
  'dfm-user-manual':                 { folder: 'clients', file: 'dfm-user-manual.pdf' },
  'pmex-guidelines-dfm':             { folder: 'clients', file: 'pmex-guidelines-dfm.pdf' },
  'guide-futures-pmex':              { folder: 'clients', file: 'guide-futures-pmex.pdf' },
  'pmex-fee-criteria':               { folder: 'clients', file: 'pmex-fee-criteria.pdf' },
  'commission-structure':            { folder: 'clients', file: 'commission-structure.pdf' },
  'complaint-process':               { folder: 'clients', file: 'complaint-process.pdf' },
  'diagram-redressal':               { folder: 'clients', file: 'diagram-redressal.pdf' },
  'model-funds-transfer':            { folder: 'clients', file: 'model-funds-transfer.pdf' },

}

export const streamPdf = (req, res) => {
  const { slug } = req.params
  const entry = ALLOWED_PDFS[slug]

  if (!entry) {
    return res.status(404).json({ error: 'Document not found.' })
  }

  const filePath = path.join(__dirname, '../private/pdfs', entry.folder, entry.file)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found on server.' })
  }

  res.setHeader('Content-Type', 'application/pdf')
res.setHeader('Content-Disposition', 'inline')
res.setHeader('Cache-Control', 'no-store')
res.setHeader('X-Content-Type-Options', 'nosniff')

  const stream = fs.createReadStream(filePath)
  stream.pipe(res)
}