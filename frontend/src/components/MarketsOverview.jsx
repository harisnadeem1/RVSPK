import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { INDEX_SYMBOLS } from '@/data/marketSymbols'

// ── Indices Watchlist ─────────────────────────────────────────
function IndicesWatchlist() {
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
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      colorTheme: 'light',
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      width: '100%',
      height: '100%',
      largeChartUrl: '',
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
      plotLineColorFalling: 'rgba(41, 98, 255, 1)',
      gridLineColor: 'rgba(240, 243, 250, 0)',
      scaleFontColor: 'rgba(106, 109, 120, 1)',
      belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
      belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
      symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
      tabs: [
        {
          title: 'Indices',
          symbols: INDEX_SYMBOLS.map(s => ({
            s: s.proName,
            d: s.shortName,
          })),
          originalTitle: 'Indices',
        },
      ],
    })

    wrapper.appendChild(script)
    container.appendChild(wrapper)
    return () => { container.innerHTML = '' }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '550px' }} />
  )
}

// ── Markets Overview ─────────────────────────────────────────
function MarketsOverview() {
  return (
    <section className="section-spacing bg-card">
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

        {/* Watchlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden border border-border/60 bg-card shadow-sm"
        >
          <IndicesWatchlist />
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] sm:text-xs text-muted-foreground/60 mt-4">
          Market data provided by TradingView. Prices are for reference only and may be delayed.
        </p>

        {/* CTA */}
        <div className="text-center mt-6 sm:mt-8">
          <Link to="/markets">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 transition-all hover:-translate-y-0.5"
            >
              View all markets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default MarketsOverview