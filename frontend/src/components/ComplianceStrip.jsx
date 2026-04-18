
import React from 'react';
import { AlertTriangle } from 'lucide-react';

function ComplianceStrip({ message }) {
  return (
    <div className="bg-gold/10 border-t border-b border-gold/20 py-3">
      <div className="container-custom">
        <div className="flex items-start gap-3 text-sm">
          <AlertTriangle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
          <p className="text-foreground/80 leading-relaxed">
            {message || 'Trading in commodity futures involves substantial risk of loss and may not be suitable for all investors. Past performance is not indicative of future results. Please ensure you understand the risks before trading.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComplianceStrip;
