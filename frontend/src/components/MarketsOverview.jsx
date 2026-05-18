import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { INDEX_SYMBOLS } from '@/data/marketSymbols'

// ── Market Quotes Widget ─────────────────────────────────────
function MarketQuotes() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'tradingview-widget-container'
    wrapper.style.height = '100%'
    wrapper.style.width = '100%'

    const inner = document.createElement('div')
    inner.className = 'tradingview-widget-container__widget'
    inner.style.height = 'calc(100% - 32px)'
    inner.style.width = '100%'
    wrapper.appendChild(inner)

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: '100%',
      symbolsGroups: [
        {
          name: 'Americas',
          symbols: [
            { name: 'FOREXCOM:SPXUSD',  displayName: 'S&P 500'    },
            { name: 'FOREXCOM:NSXUSD',  displayName: 'NASDAQ 100' },
            { name: 'FOREXCOM:DJI',     displayName: 'Dow Jones'  },
          ],
        },
        // {
        //   name: 'European',
        //   symbols: [
        //     { name: 'INDEX:DAX',        displayName: 'DAX 40'     },
        //     { name: 'FOREXCOM:UKXGBP',  displayName: 'FTSE 100'   },
        //     { name: 'INDEX:CAC40',      displayName: 'CAC 40'     },
        //   ],
        // },
        // {
        //   name: 'Asian & Pacific',
        //   symbols: [
        //     { name: 'INDEX:NKY',        displayName: 'Nikkei 225' },
        //     { name: 'INDEX:HSI',        displayName: 'Hang Seng'  },
        //     { name: 'BSE:SENSEX',       displayName: 'SENSEX'     },
        //   ],
        // },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      colorTheme: 'light',
      locale: 'en',
    })

    wrapper.appendChild(script)
    container.appendChild(wrapper)
    return () => { container.innerHTML = '' }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '160px' }}>
      {/* Blocks all clicks to prevent navigation to TradingView */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'default' }}
        aria-hidden="true"
      />
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

// ── Markets Overview ─────────────────────────────────────────
function MarketsOverview() {
  return (
    <section className="section-spacing bg-muted">
      <div className="container-custom px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Our Markets
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Trade global indices
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Live market data for world indices — trade the same instruments
            through Right Vision Securities
          </p>
        </div>

        {/* Quotes Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden border border-border/60 bg-card shadow-sm"
        >
          <MarketQuotes />
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] sm:text-xs text-muted-foreground/60 mt-4">
          Prices are for reference only and may be delayed.
        </p>

      </div>
    </section>
  )
}

export default MarketsOverview