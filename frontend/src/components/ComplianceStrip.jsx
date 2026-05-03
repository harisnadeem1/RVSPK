import React from 'react';
import { AlertTriangle } from 'lucide-react';

function ComplianceStrip({ message }) {
  return (
    <div className="bg-yellow-500/8 border-t border-b border-yellow-500/20 py-3 sm:py-3.5">
      <div className="container-custom px-4 sm:px-6">
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">

          {/* Icon */}
          <div className="shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-yellow-500/15 mt-0.5 sm:mt-0">
            <AlertTriangle className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
          </div>

          {/* Label + message */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 min-w-0">
            <span className="shrink-0 text-[10px] font-bold tracking-[0.15em] uppercase text-yellow-600 dark:text-yellow-400 leading-none">
              Risk Warning
            </span>
            <span className="hidden sm:block h-3 w-px bg-yellow-500/30 shrink-0" />
            <p className="text-[11px] sm:text-xs text-foreground/70 leading-relaxed">
              {message ||
                'Trading in commodity futures involves substantial risk of loss and may not be suitable for all investors. Past performance is not indicative of future results. Please ensure you understand the risks before trading.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ComplianceStrip;