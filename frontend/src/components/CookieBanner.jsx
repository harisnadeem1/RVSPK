import React, { useState } from 'react'
import { Cookie, Settings, X } from 'lucide-react'

const COOKIE_CONSENT_KEY = 'rvspk_cookie_consent'

const saveConsent = (preferences) => {
  const consent = {
    ...preferences,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))

  window.dispatchEvent(
    new CustomEvent('cookie-consent-updated', {
      detail: consent,
    })
  )
}

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem(COOKIE_CONSENT_KEY)
  })

  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [marketingEnabled, setMarketingEnabled] = useState(false)

  if (!isVisible) {
    return null
  }

  const closeBanner = () => {
    setIsVisible(false)
  }

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    })

    closeBanner()
  }

  const rejectOptional = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    })

    closeBanner()
  }

  const savePreferences = () => {
    saveConsent({
      necessary: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    })

    closeBanner()
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[50] p-2 sm:p-4">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-[#79AB19]/25 bg-card shadow-2xl sm:rounded-2xl">
        <div className="h-1 w-full bg-[#79AB19]" />

        <div className="max-h-[calc(100vh-1rem)] overflow-y-auto p-4 sm:p-5">
          {!showPreferences ? (
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Content */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#79AB19]/10 sm:h-10 sm:w-10">
                  <Cookie className="h-4 w-4 text-[#79AB19] sm:h-5 sm:w-5" />
                </div>

                <div className="min-w-0">
                  <h2 className="mb-1 text-sm font-bold text-foreground sm:text-base">
                    We use cookies
                  </h2>

                  <p className="max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    We use essential cookies for website functionality. Optional
                    cookies help us improve your experience.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E8410] transition-colors hover:text-[#79AB19]"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    Manage preferences
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-2 md:flex md:shrink-0">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="min-h-10 rounded-lg border border-[#79AB19]/35 px-3 py-2 text-xs font-semibold text-[#5E8410] transition-colors hover:bg-[#79AB19]/10 sm:px-4 sm:text-sm"
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={acceptAll}
                  className="min-h-10 rounded-lg bg-[#79AB19] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5E8410] sm:px-4 sm:text-sm"
                >
                  Accept all
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Preferences header */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#79AB19]/10 sm:h-10 sm:w-10">
                    <Cookie className="h-4 w-4 text-[#79AB19] sm:h-5 sm:w-5" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-foreground sm:text-base">
                      Cookie preferences
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Select optional cookie categories.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  aria-label="Close preferences"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Preferences list */}
              <div className="mb-4 space-y-2.5">
                {/* Necessary */}
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/50 p-3 sm:p-4">
                  <div>
                    <h3 className="text-xs font-semibold text-foreground sm:text-sm">
                      Necessary
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                      Required for security and basic website features.
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#79AB19]/15 px-2.5 py-1 text-[10px] font-semibold text-[#5E8410] sm:text-xs">
                    Active
                  </span>
                </div>

                {/* Analytics */}
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border/60 bg-card p-3 transition-colors hover:border-[#79AB19]/30 sm:p-4">
                  <div>
                    <h3 className="text-xs font-semibold text-foreground sm:text-sm">
                      Analytics
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                      Helps us improve website performance.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(event) =>
                      setAnalyticsEnabled(event.target.checked)
                    }
                    className="h-4 w-4 shrink-0 accent-[#79AB19]"
                  />
                </label>

                {/* Marketing */}
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border/60 bg-card p-3 transition-colors hover:border-[#79AB19]/30 sm:p-4">
                  <div>
                    <h3 className="text-xs font-semibold text-foreground sm:text-sm">
                      Marketing
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                      Helps measure marketing campaigns.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={marketingEnabled}
                    onChange={(event) =>
                      setMarketingEnabled(event.target.checked)
                    }
                    className="h-4 w-4 shrink-0 accent-[#79AB19]"
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="min-h-10 rounded-lg border border-[#79AB19]/35 px-3 py-2 text-xs font-semibold text-[#5E8410] transition-colors hover:bg-[#79AB19]/10 sm:px-4 sm:text-sm"
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={savePreferences}
                  className="min-h-10 rounded-lg bg-[#79AB19] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5E8410] sm:px-4 sm:text-sm"
                >
                  Save choices
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CookieBanner