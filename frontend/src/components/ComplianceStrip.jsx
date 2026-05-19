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

      <div className="bg-green-100 border-t border-b border-green-300 overflow-hidden">
        <div className="w-full px-4 sm:px-6">

          <div className="flex items-center gap-4 py-2.5">

            {/* Left Side */}
            <div className="flex items-center gap-2.5 shrink-0">

  <div className="shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-red-100">
    <AlertTriangle className="h-4 w-4 text-red-600" />
  </div>

  <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-red-600 whitespace-nowrap">
    Risk Warning
  </span>

</div>

            {/* Moving Text */}
            <div className="relative overflow-hidden flex-1">

              <div className="compliance-marquee whitespace-nowrap">

                <p className="text-[12px] sm:text-[13px] font-medium text-[#0B1F3A]/90 pr-16">
                  {text}
                </p>

                <p className="text-[12px] sm:text-[13px] font-medium text-[#0B1F3A]/90 pr-16">
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