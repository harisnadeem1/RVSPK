import React from 'react'
import { AlertTriangle } from 'lucide-react'

function ComplianceStrip({ message }) {
  const text =
    message ||
    'Trading in commodity futures involves substantial risk of loss and may not be suitable for all investors. Past performance is not indicative of future results. Please ensure you understand the risks before trading.'

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .compliance-marquee {
            display: flex;
            width: max-content;
            animation: marquee 28s linear infinite;
          }
        `}
      </style>

      <div className="bg-[#79AD14] border-y border-[#52780C] overflow-hidden">
        <div className="w-full px-4 sm:px-6">
          <div className="flex items-center gap-4 py-3">
            {/* Left Side */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffd5d5]">
                <AlertTriangle className="h-5 w-5 text-[#b8071f]" />
              </div>

              <span className="hidden sm:inline whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.14em] text-[#b8071f]">
                Risk Warning
              </span>
            </div>

            {/* Moving Text */}
            <div className="relative flex-1 overflow-hidden">
              <div className="compliance-marquee whitespace-nowrap">
                <p className="pr-16 text-base font-semibold text-[#42409a]">
                  {text}
                </p>

                <p className="pr-16 text-base font-semibold text-[#42409a]">
                  {text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ComplianceStrip