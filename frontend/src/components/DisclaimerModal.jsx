import React, { useState, useEffect } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)
  const [step, setStep] = useState(1)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
  const disclaimerAccepted = localStorage.getItem('disclaimerAccepted')
  if (!disclaimerAccepted) {
    setIsOpen(true)
    setStep(1)
    setIsAgreed(false)

    // ✅ PRELOAD IMAGE (important fix)
    const img = new Image()
    img.src = "/documents/secp_disclamir.png"
  }
}, [])

  const handleAccept = () => {
    if (isAgreed) {
      localStorage.setItem('disclaimerAccepted', 'true')
      setIsOpen(false)
    }
  }

  // ✅ Smart close: Step 1 → advance to Step 2, Step 2 → close modal
  const handleClose = () => {
    if (step === 1) {
      setStep(2)
    } else {
      setIsOpen(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Close disclaimer"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-border">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step >= s
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
              {s < 2 && (
                <div
                  className={`h-0.5 w-10 rounded transition-all duration-300 ${
                    step > s ? 'bg-accent' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
          <span className="ml-2 text-xs text-muted-foreground">
            {step === 1 ? 'SECP' : 'Website Disclaimer'  }
          </span>
        </div>

        {/* ──────────────── STEP 1 – RV Disclaimer IMAGE ──────────────── */}
        {step === 1 && (
         <div className="flex flex-col flex-1 overflow-hidden">
  <div className="flex items-center justify-center bg-white px-4 py-4 flex-1 relative">
  
  {/* Loader overlay (put ABOVE image) */}
  {!imgLoaded && (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-sm text-muted-foreground animate-pulse">
        Loading disclaimer...
      </div>
    </div>
  )}

  {/* Image */}
  <img
    src="/documents/secp_disclamir.png"
    alt="Right Vision Securities Website Disclaimer"
    onLoad={() => setImgLoaded(true)}
    className={`w-auto max-w-full max-h-[55vh] object-contain rounded-lg transition-opacity duration-500 ${
      imgLoaded ? "opacity-100" : "opacity-0"
    }`}
  />
</div>

  <div className="border-t border-border bg-card px-5 py-4 flex flex-col sm:flex-row gap-3">
    <Button
      onClick={() => setStep(2)}
      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-sm md:text-base font-medium"
    >
      Continue →
    </Button>
    <Button
      onClick={handleClose}
      variant="outline"
      className="sm:w-auto border-border text-foreground hover:bg-muted py-3 text-sm md:text-base"
    >
      Close
    </Button>
  </div>
</div>
        )}

        {/* ──────────────── STEP 2 – SECP Caution FULL TEXT ──────────────── */}
        {step === 2 && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 md:px-8 py-5 space-y-5">

              {/* Header */}
              <div className="flex items-center gap-3">
  <div className="h-11 w-11 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
    <AlertTriangle className="h-6 w-6 text-red-600" />
  </div>

  <div>
    <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-0.5">
      Website Disclaimer
    </p>
  </div>
</div>

              {/* Paragraph 1 — exact text from image */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 text-sm md:text-base text-foreground leading-relaxed">
                <p>
                 This website is operated and maintained by Right vision Securities (Pvt.) Limited (hereinafter referred as "The
Company"/"RVSPL"). The visitors of the website www.rvspk.com are informed that the information provided by Right Vision
Securities (Pvt.) Limited should be considered for general information, knowledge and education purpose only though all
information on this website are provided in good faith after due authenticity of the source and knowledge. However, the
company does not provide warranty or makes no representation of any kind in respect of accuracy, legitimacy consistency or
entirety of any information on this website. The Company shall continue to do at its best to provide authentic, relevant, precise
and accurate information for its visitors/users of this website. The visitors should understand that reliance on any information
provided at this website is solely at their own risk and consequences. The company shall not own or take responsibility for any
loss or damage of any kind incurred by using of this website. In order to avoid such situation, the visitors are advised to consult
professional advisor prior to take any decision or action based upon such information as the company does not provide any
professional financial advisory services. Resultantly, it is the sole responsibility of the users of the information contained on this
website for any loss or damage at their own risk and consequences.
                </p>
              </div>

              {/* Paragraph 2 — exact text from image */}
              <div className="bg-muted rounded-xl p-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Further stated that any opinion, statistical data, explanation, research, analysis contained on the website of Right Vision
Securities (Pvt.) Limited (RVSPL) have been provided for sole purpose of general market commentary which should not be
necessarily constitute investment advice for the readers and investors. Hence, the use and reliance of such information doesn't
establish the liability of RVSPL for any loss or damage of your additional investment, loss of profit and the principal amount
invested in commodities and/or any other financial products. However, the RVSPL at its utmost efforts has taken reliable and
reasonable measures to ensure the accuracy
time to time without prior notice.
                </p>
              </div>

              {/* Paragraph 3 — exact text from image */}
              <div className="bg-muted rounded-xl p-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  There is possibility of linkage of external links integrated with the website that may have contents belonging to or originating
from third parties for which accuracy, reliability, validity or completeness are not investigated, monitored or checked by the
Company. Hence, such information offered by the third parties are not warranted, endorsed and the company does not assume
responsibility for its accuracy and reliability. Further, neither the RVSPL nor its employees endorse the links to the Company's
website from a third party websites. The same applied for the products and services offered on a third party website linked to
the RVSPL are not offered or owned by the Company unless indicated, the accuracy of such information posted at third party
websites cannot be attested by the Company.
                </p>
              </div>


              {/* Paragraph 4 — exact text from image */}
              <div className="bg-muted rounded-xl p-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                The users of the company's products and/or services may submit or provide testimonials at this website which reflect their own
experiences and opinions that may be different from user to user as individual results may vary. Hence, such views and opinions
contained in the testimonials are solely belong to individual user and should not consider it the company's views and opinions.
Further advised, the testimonials regarding past performance are not necessarily be taken as a guarantee or an indicative of
future results and may not be representative of the experience of all other investors. Rules and Regulations applied to the
Commodity Exchange are subject to change and also the commissions or other charges of the brokerage house as well.
                </p>
              </div>

              {/* Paragraph 5 — exact text from image */}
              <div className="bg-muted rounded-xl p-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
               Despite every attempt to ensure authenticity of the information from reliable sources, the company shall not take responsibility
for any errors or omissions. Further, the results obtained from the usage of the information are the sole responsibility of the
users of the services and/or products provided at the website as there is no guarantee of completeness, accuracy or validity of
such information, hence no damages or loss are claimable.
                </p>
              </div>

               {/* Paragraph 6 — exact text from image */}
              <div className="bg-muted rounded-xl p-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
              Should you have any query, complaints, comments, feedback, suggestions, requests for technical support or other inquiries,
please don't hesitate to contact the company by email: hello@RVSPL.com or at Phone numbers:042-35191194, 042-351911.
                </p>
              </div>

            </div>

            {/* ── PINNED BOTTOM — always visible ── */}
            <div className="border-t border-border bg-card px-5 md:px-8 py-4 space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="disclaimer-agree"
                  checked={isAgreed}
                  onCheckedChange={(value) => setIsAgreed(Boolean(value))}
                  className="mt-1 flex-shrink-0"
                />
                <label
                  htmlFor="disclaimer-agree"
                  className="text-xs md:text-sm text-foreground leading-relaxed cursor-pointer select-none"
                >
                  I/We fully understand and agree with the contents of the above mentioned
                  disclaimer. I/We assure not to hold the company, directors, and employees
                  responsible for any loss or damage.
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAccept}
                  disabled={!isAgreed}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-sm md:text-base font-medium"
                >
                  Agree and continue
                </Button>
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="sm:w-auto border-border text-foreground hover:bg-muted py-3 text-sm md:text-base"
                >
                  ← Back
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                By clicking &quot;Agree and continue&quot; you acknowledge you have read and
                understood this disclaimer.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DisclaimerModal