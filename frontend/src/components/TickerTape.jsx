import React, { useEffect, useRef } from 'react'
import { TICKER_SYMBOLS } from '@/data/marketSymbols'

function TickerTape() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'tradingview-widget-container'

    const inner = document.createElement('div')
    inner.className = 'tradingview-widget-container__widget'
    wrapper.appendChild(inner)

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: TICKER_SYMBOLS,
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'light',
      locale: 'en',
    })

    wrapper.appendChild(script)
    container.appendChild(wrapper)

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden relative">

      {/* Click blocker overlay */}
      <div className="absolute inset-0 z-10 pointer-events-auto" />

      {/* Responsive wrapper */}
      <div
        ref={containerRef}
        className="
          w-full
          h-[72px] sm:h-[72px] md:h-[45px]
        "
      />
    </div>
  )
}

export default TickerTape