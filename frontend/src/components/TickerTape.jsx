import React, { useEffect, useRef } from 'react'
import { TICKER_SYMBOLS } from '@/data/marketSymbols'  // ← uses its own list now

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
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: TICKER_SYMBOLS,   // ← dedicated ticker list
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'light',
      locale: 'en',
    })

    wrapper.appendChild(script)
    container.appendChild(wrapper)
    return () => { container.innerHTML = '' }
  }, [])

  return (
    <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden relative">
      {/* Overlay blocks clicks to TradingView */}
      <div className="absolute inset-0 z-10" style={{ pointerEvents: 'all', cursor: 'default' }} />
      <div ref={containerRef} style={{ width: '100%', height: '56px' }} />
    </div>
  )
}

export default TickerTape