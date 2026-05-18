import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import TrustBar from '@/components/TrustBar.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import ComplianceStrip from '@/components/ComplianceStrip.jsx'
import PageHero from '@/components/PageHero.jsx'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const DOC_TITLES = {
  'privacy-policy':                'Privacy Policy',
  'customer-grievances-redressal': 'Customer Grievances Redressal Policy',
  'risk-management':               'Risk Management Policy',
  'cdd-kyc':                       'CDD / KYC Policy & Procedure',
  'whistleblowing':                'Whistleblowing Policy & Procedure',
  'conflict-of-interest':          'Conflict of Interest Policy',
  'no-cash-policy':                'No Cash Policy',
  'guidelines-clients':            "Guidelines for Clients — Do's & Don'ts",
  'account-opening-guide':         'Account Opening Guide',
  'dfm-user-manual':               'Direct Funds Model (DFM) User Manual',
  'pmex-guidelines-dfm':           'PMEX Investor Guide',
  'guide-futures-pmex':            'Guide to Futures Trading at PMEX',
  'pmex-fee-criteria':             'PMEX Fee Sheet',
  'commission-structure':          'Commission Structure',
  'complaint-process':             'Client Complaint Process',
  'diagram-redressal':             'Diagram — Grievance Redressal',
}

function PdfViewerPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const containerRef = useRef(null)

  const [numPages, setNumPages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [containerWidth, setContainerWidth] = useState(800)

  const title = DOC_TITLES[slug] || 'Document'
  const pdfUrl = `${import.meta.env.VITE_API_URL}/api/pdf/${slug}`

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth - 48)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setLoading(false)
  }

  const onDocumentLoadError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <>
      <Helmet>
        <title>{title} — Right Vision Securities</title>
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title={title}
        subtitle="Right Vision Securities (Pvt.) Limited — Official Document"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: title },
        ]}
      />

      <section className="section-spacing bg-muted">
        <div className="container-custom">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>

          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60 bg-card">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-accent/10 shrink-0">
                <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">
                  Right Vision Securities (Pvt.) Limited
                  {numPages && (
                    <span className="ml-2 text-accent font-medium">
                      · {numPages} {numPages === 1 ? 'page' : 'pages'}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* PDF scrollable area */}
            <div
              ref={containerRef}
              className="w-full bg-muted overflow-y-auto"
              style={{ maxHeight: '85vh' }}
            >
              {loading && (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <Loader2 className="h-8 w-8 text-accent animate-spin" />
                  <p className="text-sm text-muted-foreground">Loading document...</p>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-destructive/10">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground mb-1">Document unavailable</p>
                    <p className="text-xs text-muted-foreground">Please try again or contact us.</p>
                  </div>
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-accent hover:underline"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Go back
                  </button>
                </div>
              )}

              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading=""
              >
                {numPages && Array.from({ length: numPages }, (_, i) => (
                  <div
                    key={i}
                    className="relative flex justify-center py-3 px-4 sm:px-6"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <Page
                      pageNumber={i + 1}
                      width={containerWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="shadow-xl rounded-lg overflow-hidden"
                    />
                    <div
                      className="absolute inset-0"
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ userSelect: 'none', pointerEvents: 'all' }}
                    />
                  </div>
                ))}
              </Document>
            </div>
          </div>
        </div>
      </section>

       
      <Footer />
    </>
  )
}

export default PdfViewerPage