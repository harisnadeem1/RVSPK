import React from 'react'

function TrustBar() {
  const items = [
    'Trade with Right Vision',
    'Regulated entity',
    'SECP Licensed',
    'PMEX Regulated',
    'Lahore Office',
    'Dedicated Client Support',
  ]

  const tickerItems = [...items, ...items, ...items]

  return (
    <div className="bg-primary text-primary-foreground border-b border-primary-foreground/10 overflow-hidden">
      <div className="relative">

        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-primary to-transparent sm:w-20" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-primary to-transparent sm:w-20" />

        <div className="flex items-center py-2.5 sm:py-3">
          <div
            className="flex w-max items-center will-change-transform"
            style={{
              animation: 'trustbar-marquee 28s linear infinite',
            }}
          >
            {tickerItems.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex shrink-0 items-center"
              >
                <span className="whitespace-nowrap px-8 text-[10px] font-medium tracking-[0.18em] uppercase text-primary-foreground/90 sm:px-10 sm:text-[11px] lg:px-12">
                  {item}
                </span>
                <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-primary-foreground/40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes trustbar-marquee {
            from { transform: translate3d(0, 0, 0); }
            to   { transform: translate3d(-33.3333%, 0, 0); }
          }

          @media (max-width: 640px) {
            div[style*="trustbar-marquee"] {
              animation-duration: 20s !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            div[style*="trustbar-marquee"] {
              animation: none !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default TrustBar