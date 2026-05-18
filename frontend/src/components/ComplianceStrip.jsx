import React from 'react'
import { AlertTriangle } from 'lucide-react'

function ComplianceStrip({ message }) {
  const text =
    message ||
    'Trading in commodity futures involves substantial risk of loss and may not be suitable for all investors. Past performance is not indicative of future results. Please ensure you understand the risks before trading.'

  return (
    <>
      {/* Local animation styles */}
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

      <div className="bg-yellow-500/8 border-t border-b border-yellow-500/20 overflow-hidden">
        <div className="container-custom px-4 sm:px-6">
          
          <div className="flex items-center gap-4 py-3 sm:py-3.5">

            {/* Fixed Left Side */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">

              <div className="shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-yellow-500/15">
                <AlertTriangle className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
              </div>

              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-yellow-600 dark:text-yellow-400 whitespace-nowrap">
                Risk Warning
              </span>

            </div>

            {/* Moving Text Area */}
            <div className="relative overflow-hidden flex-1">
              
              <div className="compliance-marquee whitespace-nowrap">

                <p className="text-[11px] sm:text-xs text-foreground/70 pr-16">
                  {text}
                </p>

                {/* Duplicate text for smooth infinite loop */}
                <p className="text-[11px] sm:text-xs text-foreground/70 pr-16">
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