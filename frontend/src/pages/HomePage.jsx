import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Shield,
  Award,
  Users,
  Clock,
  BarChart3,
  Lock,
  Headphones,
  CheckCircle,
  ArrowRight,
  Droplet,
  Coins,
  Gem,
  DollarSign,
  Sparkles
} from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import MarketCard from '@/components/MarketCard.jsx';
import InfoCard from '@/components/InfoCard.jsx';
import ReportCard from '@/components/ReportCard.jsx';
import StatsCard from '@/components/StatsCard.jsx';
import CTASection from '@/components/CTASection.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';
import HowToOpenAccount from '@/components/HowToOpenAccount.jsx';
import { Button } from '@/components/ui/button';

function HomePage() {
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

  const trustIndicators = [
    {
      icon: Shield,
      number: 'SECP',
      label: 'Regulated',
      description: 'Licensed by Securities & Exchange Commission of Pakistan'
    },
    {
      icon: Award,
      number: 'PMEX',
      label: 'Licensed',
      description: 'Authorized member of Pakistan Mercantile Exchange'
    },
    {
      icon: Users,
      number: '2,847',
      label: 'Active Clients',
      description: 'Trusted by traders across Pakistan'
    },
    {
      icon: BarChart3,
      number: '12+',
      label: 'Years Experience',
      description: 'Established track record in commodity trading'
    }
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: 'Professional team',
      description: 'Experienced traders and market analysts dedicated to your success in commodity markets.'
    },
    {
      icon: TrendingUp,
      title: 'Transparent pricing',
      description: 'Clear commission structure with no hidden fees. Competitive spreads on all instruments.'
    },
    {
      icon: Lock,
      title: 'Secure platform',
      description: 'Bank-grade security with encrypted transactions and segregated client accounts.'
    },
    {
      icon: Headphones,
      title: '24/7 support',
      description: 'Dedicated client support team available during all market hours via phone and email.'
    },
    {
      icon: CheckCircle,
      title: 'Regulatory compliance',
      description: 'Fully compliant with SECP and PMEX regulations ensuring investor protection.'
    }
  ];

  const featuredReports = [
    {
      title: 'Q1 2026 commodity market outlook',
      date: 'March 28, 2026',
      category: 'Market Analysis',
      description: 'Comprehensive analysis of crude oil, gold, and precious metals markets for the first quarter with trading strategies.'
    },
    {
      title: 'Gold price trends and forecasts',
      date: 'April 12, 2026',
      category: 'Commodity Report',
      description: 'In-depth examination of gold market fundamentals, technical analysis, and price projections for Q2 2026.'
    },
    {
      title: 'Crude oil supply and demand dynamics',
      date: 'April 8, 2026',
      category: 'Trading Insights',
      description: 'Analysis of global oil production, consumption patterns, and their impact on WTI and Brent crude prices.'
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
        <title>Right Vision Securities - Commodity & Futures Trading in Pakistan</title>
        <meta
          name="description"
          content="SECP regulated and PMEX licensed brokerage firm specializing in commodity and futures trading. Trade crude oil, gold, silver, platinum with professional support."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1640340435016-1964cf4e723b"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/95" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6">
              Professional commodity and futures trading
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed mb-10 max-w-3xl mx-auto">
              Access global commodity markets with confidence. SECP regulated, PMEX licensed brokerage serving traders across Pakistan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg">
                  Get started today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/markets">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-6 text-lg">
                  Explore markets
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Open Account Section */}
      <HowToOpenAccount />

      {/* Market Snapshot */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Live market snapshot"
            subtitle="Real-time pricing for key commodity and futures contracts"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {markets.slice(0, 3).map((market, index) => (
              <motion.div key={index} variants={itemVariants}>
                <MarketCard {...market} />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Link to="/markets">
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                View all markets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Trusted and regulated"
            subtitle="Building confidence through regulatory compliance and professional service"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StatsCard {...indicator} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Markets Overview */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Trade global commodities"
            subtitle="Access international commodity and futures markets with professional execution and competitive pricing"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {markets.map((market, index) => (
              <motion.div key={index} variants={itemVariants}>
                <MarketCard {...market} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Why trade with Right Vision"
            subtitle="Professional service backed by regulatory compliance and market expertise"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whyChooseUs.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <InfoCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reports Preview */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Market reports and insights"
            subtitle="Professional analysis and research to support your trading decisions"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredReports.map((report, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ReportCard {...report} />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Link to="/reports">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                View all reports
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Area Preview */}
      <section className="section-spacing bg-gradient-to-br from-primary via-primary/95 to-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Lock className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Secure client portal
            </h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed mb-8 max-w-2xl mx-auto">
              Access your account information, trading history, reports, and documents through our secure client portal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/clients">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Access client portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Request access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                About Right Vision Securities
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Right Vision Securities is a SECP regulated and PMEX licensed brokerage firm specializing in commodity and futures trading in Pakistan. We provide professional trading services with a commitment to transparency, regulatory compliance, and client success.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                With over a decade of experience in commodity markets, our team of professional traders and market analysts helps clients navigate global commodity markets with confidence.
              </p>
              <Link to="/about">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Learn more about us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1662062656486-2bffb88aafa3"
                alt="Right Vision Securities office"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to start trading?"
        description="Open an account with Right Vision Securities and access global commodity markets with professional support and regulatory protection."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'Learn about markets', href: '/markets' }}
      />

      <ComplianceStrip />
      <Footer />
    </>
  );
}

export default HomePage;