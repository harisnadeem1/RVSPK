import React, { useState, useEffect } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)
  // ✅ REMOVE the <1 | 2> generic in .jsx
  const [step, setStep] = useState(1)

  useEffect(() => {
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted')
    if (!disclaimerAccepted) {
      setIsOpen(true)
      setStep(1)
      setIsAgreed(false)
    }
  }, [])

  const handleAccept = () => {
    if (isAgreed) {
      localStorage.setItem('disclaimerAccepted', 'true')
      setIsOpen(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-card rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Close disclaimer"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-7 w-7 text-gold" />
            </div>
            <div>
              <h2
                id="disclaimer-title"
                className="text-2xl md:text-3xl font-bold text-foreground mb-1"
              >
                Important disclaimer
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Please read carefully before proceeding
              </p>
            </div>
          </div>

          {/* STEP 1 – Image / branding disclaimer */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Image / branding card */}
              <div className="rounded-xl overflow-hidden border border-border">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 px-6 py-10 text-center">
                  <div className="max-w-xl mx-auto">
                    <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      {/* Replace this span with your logo <img> if you want */}
                      <span className="text-primary font-bold text-3xl">RV</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      Right Vision Securities
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      SECP Regulated &nbsp;|&nbsp; PMEX Licensed
                    </p>
                  </div>
                </div>
              </div>

              {/* Short intro text */}
              <div className="bg-muted rounded-xl p-5">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Trading in commodity futures and derivatives involves a high level of risk.
                  In the next step you will see a detailed risk disclaimer explaining these
                  risks and your responsibilities as a client.
                </p>
              </div>

              {/* Step 1 actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 py-4 text-sm md:text-base font-medium"
                >
                  Continue to full disclaimer
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="sm:w-auto border-border text-foreground hover:bg-muted py-4 text-sm md:text-base"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 – Full text disclaimer */}
          {step === 2 && (
            <>
              {/* Disclaimer content */}
              <div className="space-y-5 mb-6">
                <div className="bg-gold/10 border border-gold/20 rounded-xl p-5">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                    Risk warning
                  </h3>
                  <p className="text-sm md:text-base text-foreground leading-relaxed mb-3">
                    Trading in commodity futures and derivatives involves substantial risk of
                    loss and may not be suitable for all investors. You should carefully
                    consider whether trading is appropriate for you in light of your
                    experience, objectives, financial resources, and other relevant
                    circumstances.
                  </p>
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    The high degree of leverage that is often obtainable in commodity
                    futures trading can work against you as well as for you. The use of
                    leverage can lead to large losses as well as gains. Past performance is
                    not indicative of future results.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Key risks
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1 flex-shrink-0">•</span>
                      <span>
                        <strong className="text-foreground">Market risk:</strong> Commodity
                        prices can fluctuate rapidly and substantially due to economic,
                        political, and market conditions.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1 flex-shrink-0">•</span>
                      <span>
                        <strong className="text-foreground">Leverage risk:</strong> Trading on
                        margin means you can lose more than your initial investment.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1 flex-shrink-0">•</span>
                      <span>
                        <strong className="text-foreground">Liquidity risk:</strong> Certain
                        contracts may be difficult to liquidate at favorable prices during
                        volatile conditions.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1 flex-shrink-0">•</span>
                      <span>
                        <strong className="text-foreground">Operational risk:</strong> Technical
                        failures, system errors, or communication disruptions may affect
                        trading.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted rounded-xl p-5 space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Regulatory information
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Right Vision Securities (Private) Limited is regulated by the Securities
                    and Exchange Commission of Pakistan (SECP) under registration number
                    SEC/TREC-034/2015 and is an authorized trading member of Pakistan
                    Mercantile Exchange Limited (PMEX).
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    While we maintain strict compliance with all applicable regulations,
                    regulatory oversight does not eliminate trading risks or guarantee
                    profits. All trading decisions are made independently by clients at
                    their own risk.
                  </p>
                </div>

                <div className="bg-muted rounded-xl p-5">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                    No investment advice
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Right Vision Securities provides execution services and market
                    information but does not provide investment advice or recommendations.
                    All information provided is for educational purposes only and should
                    not be construed as a solicitation to trade. We recommend consulting
                    with qualified financial advisors before engaging in commodity futures
                    trading.
                  </p>
                </div>
              </div>

              {/* Acknowledgement checkbox */}
              <div className="bg-card border-2 border-border rounded-xl p-5 mb-5">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="disclaimer-agree"
                    checked={isAgreed}
                    onCheckedChange={(value) => setIsAgreed(Boolean(value))}
                    className="mt-1"
                  />
                  <label
                    htmlFor="disclaimer-agree"
                    className="text-sm md:text-base text-foreground leading-relaxed cursor-pointer select-none"
                  >
                    I/We fully understand and agree with the contents of the above
                    disclaimer. I/We assure not to hold the company, directors, and
                    employees responsible for any loss or damage.
                  </label>
                </div>
              </div>

              {/* Step 2 actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAccept}
                  disabled={!isAgreed}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed py-4 text-sm md:text-base font-medium"
                >
                  Agree and continue
                </Button>
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="sm:w-auto border-border text-foreground hover:bg-muted py-4 text-sm md:text-base"
                >
                  Back
                </Button>
              </div>

              {/* Footer note */}
              <p className="text-xs md:text-sm text-muted-foreground text-center mt-4">
                By clicking &quot;Agree and continue&quot;, you acknowledge that you have
                read, understood, and agree to the terms outlined in this disclaimer.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DisclaimerModal