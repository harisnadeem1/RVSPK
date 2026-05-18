
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Droplet, Coins, Sparkles, Gem, DollarSign, TrendingUp, Clock, BarChart3, Activity } from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import MarketCard from '@/components/MarketCard.jsx';
import CTASection from '@/components/CTASection.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';

function MarketsPage() {
  const markets = [
    {
      icon: Droplet,
      name: 'Crude Oil',
      description: 'Trade WTI and Brent crude oil futures with competitive spreads and real-time market data.',
      price: '$73.42',
      change: '+1.23',
      changePercent: '+1.7%',
      isPositive: true
    },
    {
      icon: Coins,
      name: 'Gold',
      description: 'Access international gold futures markets with transparent pricing and professional execution.',
      price: '$2,034',
      change: '-8.50',
      changePercent: '-0.4%',
      isPositive: false
    },
    {
      icon: Sparkles,
      name: 'Silver',
      description: 'Trade silver futures with low margins and access to global precious metals markets.',
      price: '$23.67',
      change: '+0.34',
      changePercent: '+1.5%',
      isPositive: true
    },
    {
      icon: Gem,
      name: 'Platinum',
      description: 'Diversify your portfolio with platinum futures trading on international exchanges.',
      price: '$987.50',
      change: '+12.30',
      changePercent: '+1.3%',
      isPositive: true
    },
    {
      icon: DollarSign,
      name: 'USD Index',
      description: 'Trade the dollar index and currency futures with professional market analysis.',
      price: '103.45',
      change: '-0.28',
      changePercent: '-0.3%',
      isPositive: false
    }
  ];

  const marketDetails = [
    {
      name: 'Crude Oil Futures',
      icon: Droplet,
      description: 'Crude oil is one of the most actively traded commodities globally. Right Vision Securities provides access to both WTI (West Texas Intermediate) and Brent crude oil futures contracts.',
      characteristics: [
        'High liquidity with tight spreads',
        'Trading hours: Sunday 5:00 PM to Friday 4:00 PM CT',
        'Contract sizes available for different capital levels',
        'Responsive to geopolitical events and supply data'
      ],
      whyTrade: 'Oil futures offer opportunities for both hedging and speculation, with significant daily price movements driven by global supply-demand dynamics.'
    },
    {
      name: 'Gold Futures',
      icon: Coins,
      description: 'Gold has historically served as a store of value and inflation hedge. Trade gold futures contracts on international exchanges through Right Vision Securities.',
      characteristics: [
        'Safe-haven asset during market volatility',
        'Trading hours: Sunday 5:00 PM to Friday 4:00 PM CT',
        'Multiple contract sizes for flexible position sizing',
        'Correlates inversely with dollar strength'
      ],
      whyTrade: 'Gold futures provide exposure to precious metals markets with leverage, allowing traders to benefit from both upward and downward price movements.'
    },
    {
      name: 'Silver Futures',
      icon: Sparkles,
      description: 'Silver combines industrial and precious metal characteristics, offering unique trading opportunities. Access silver futures with professional support from Right Vision Securities.',
      characteristics: [
        'Higher volatility than gold',
        'Industrial and investment demand drivers',
        'Trading hours: Sunday 5:00 PM to Friday 4:00 PM CT',
        'Accessible contract sizes'
      ],
      whyTrade: 'Silver futures offer greater percentage price movements compared to gold, attracting traders seeking higher volatility opportunities.'
    },
    {
      name: 'Platinum Futures',
      icon: Gem,
      description: 'Platinum is a rare precious metal with significant industrial applications. Trade platinum futures to diversify your commodity portfolio.',
      characteristics: [
        'Primarily driven by automotive industry demand',
        'Limited supply concentrated in few regions',
        'Trading hours: Sunday 5:00 PM to Friday 4:00 PM CT',
        'Higher capital requirements than silver'
      ],
      whyTrade: 'Platinum futures provide exposure to a unique commodity with supply constraints and industrial demand dynamics distinct from gold and silver.'
    },
    {
      name: 'Currency Futures (USD Index)',
      icon: DollarSign,
      description: 'The US Dollar Index measures the dollar\'s value against a basket of major currencies. Trade dollar index futures through Right Vision Securities.',
      characteristics: [
        'Benchmark for dollar strength',
        'Trading hours: Sunday 5:00 PM to Friday 4:00 PM CT',
        'Lower margin requirements than commodities',
        'Influenced by Fed policy and economic data'
      ],
      whyTrade: 'Currency futures allow traders to take positions on dollar strength or weakness, hedging currency risk or speculating on macroeconomic trends.'
    }
  ];

  const comparisonFeatures = [
    {
      feature: 'Liquidity',
      oil: 'Very High',
      gold: 'Very High',
      silver: 'High',
      platinum: 'Moderate',
      dollar: 'Very High'
    },
    {
      feature: 'Volatility',
      oil: 'High',
      gold: 'Moderate',
      silver: 'High',
      platinum: 'High',
      dollar: 'Low-Moderate'
    },
    {
      feature: 'Trading hours',
      oil: '24 hours',
      gold: '24 hours',
      silver: '24 hours',
      platinum: '24 hours',
      dollar: '24 hours'
    },
    {
      feature: 'Typical spreads',
      oil: 'Tight',
      gold: 'Tight',
      silver: 'Moderate',
      platinum: 'Moderate',
      dollar: 'Tight'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Commodity & Futures Markets - Right Vision Securities</title>
        <meta
          name="description"
          content="Trade crude oil, gold, silver, platinum, and currency futures through Right Vision Securities. SECP regulated brokerage with professional market access."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Commodity and futures markets"
        subtitle="Access global commodity and currency futures with professional execution and competitive pricing"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Markets' }
        ]}
      />

      {/* Introduction */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <SectionHeader
              title="Professional market access"
              subtitle="Right Vision Securities provides retail and institutional clients with access to international commodity and futures markets through Pakistan Mercantile Exchange (PMEX)"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our SECP regulated and PMEX licensed brokerage offers transparent pricing, professional execution, and comprehensive market support across crude oil, precious metals, and currency futures trading.
            </p>
          </div>

          {/* Market Snapshot Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {markets.map((market, index) => (
              <motion.div key={index} variants={itemVariants}>
                <MarketCard {...market} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Market Sections */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Market details"
            subtitle="Comprehensive information about each commodity and futures contract"
          />
          <div className="space-y-12">
            {marketDetails.map((market, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="professional-card"
              >
                <div className="flex items-start gap-6">
                  <div className="h-16 w-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <market.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">{market.name}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {market.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Trading characteristics</h4>
                        <ul className="space-y-2">
                          {market.characteristics.map((char, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <Activity className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>{char}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Why trade this market</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {market.whyTrade}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Comparison */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Market comparison"
            subtitle="Compare key features across different commodity and futures contracts"
          />
          <div className="overflow-x-auto">
            <div className="professional-card min-w-[800px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Oil</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Gold</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Silver</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Platinum</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Dollar</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      <td className="py-4 px-4 font-medium text-foreground">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{row.oil}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{row.gold}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{row.silver}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{row.platinum}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{row.dollar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to access these markets?"
        description="Contact Right Vision Securities to open an account and start trading commodity and futures contracts with professional support."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'View reports', href: '/reports' }}
      />

       
      <Footer />
    </>
  );
}

export default MarketsPage;
