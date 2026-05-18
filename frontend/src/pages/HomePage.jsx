import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Shield,
  Users,
  Lock,
  Headphones,
  CheckCircle,
  ArrowRight,
  Droplet,
  Coins,
  Gem,
  DollarSign,
  Sparkles,
  Droplets, CircleDot, Monitor
} from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import CTASection from '@/components/CTASection.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';
import HowToOpenAccount from '@/components/HowToOpenAccount.jsx';
import { Button } from '@/components/ui/button';
import MarketsOverview from '@/components/MarketsOverview'
import TickerTape from '@/components/TickerTape'
import ReportsList from '@/components/ReportsList.jsx';
import FAQSection from '@/components/FAQItem';
import TradeSafelySection from '@/components/TradeSafely.jsx';


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
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">

        {/* Background image + overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/home/hero_banner.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/65 to-secondary/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10 px-5 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center"
          >

            {/* Sub-heading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs sm:text-base font-semibold tracking-[0.2em] uppercase text-primary-foreground/80 mb-3"
            >
              Invest with
            </motion.p>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] tracking-tight mb-5 sm:mb-6"
            >
              Right Vision
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-sm sm:text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto"
            >
              Trade Oil, Gold, Silver, Platinum, Dollar like other international markets- fully regulated and licensed. Join international trading now!
            </motion.p>

            {/* CTA buttons — equal width on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center"
            >
              <a
                href="https://www.aof.com.pk/?ODc0NTQ4NDE4Nzc3NzU3Mjc0ODU4MzIzNDY4NDcyNzM3MTI3NzQ4OQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg shadow-accent/25 transition-all hover:shadow-accent/40 hover:-translate-y-0.5"
                >
                  Open Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              
            </motion.div>

            {/* Market pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              {[
                { label: 'Gold', Icon: Coins },
                { label: 'Silver', Icon: CircleDot },
                { label: 'Platinum', Icon: Gem },
                { label: 'Crude Oil', Icon: Droplets },
                { label: 'Dollar', Icon: DollarSign },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 + i * 0.08 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2"
                >
                  <item.Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary-foreground/80 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-primary-foreground/90 whitespace-nowrap">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/30 to-transparent pointer-events-none z-10" />
      </section>

      <TickerTape />

      {/* Company Intro */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
                Who We Are
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">
                Pakistan's trusted commodity & futures brokerage
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
  Right Vision Securities (Private) Limited is a Future Brokerage Company registered
  with PMEX and licensed under SECP as a Future Broker — an associated company of the
  Right Vision Group, which has been serving Pakistan since 2007.
</p>
<p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
  We are committed to providing 24/7 efficient, transparent, and reliable brokerage
  services across multi-asset classes, with the lowest brokerage commission and a
  unique Daily Newswire to keep our clients informed on market current affairs.
</p>
              <Link to="/about">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                >
                  Learn more about us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Right — stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                {
                  value: 'Global',
                  label: 'Market Access',
                  description: 'Trade international commodity markets directly from Pakistan',
                },
                {
                  value: 'Real-Time',
                  label: 'Market Data',
                  description: 'Live price feeds and up-to-date market intelligence',
                },
                {
                  value: 'Expert',
                  label: 'Advisory Team',
                  description: 'Seasoned analysts guiding every trading decision',
                },
                {
                  value: 'Direct',
                  label: 'Fund Management',
                  description: 'Transparent DFM model — your funds stay in your control',
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="text-base sm:text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground mb-1.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
     <section className="section-spacing bg-card">
  <div className="container-custom px-4 sm:px-6">

    {/* Section header */}
    <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
        Why Choose Us
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
        Why trade with Right Vision
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
        The first and foremost key factor for selection of a broker is the ability of the
        brokerage house to provide easy access to a trustworthy and secure trading
        environment in all asset classes.
      </p>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
    >
      {[
        {
          icon: Shield,
          title: 'Regulated & Licensed Entity',
          description:
            'RVSPL is a regulated entity registered with PMEX as a Universal Trading Broker licensed under SECP — strictly adhering to the regulatory framework set by Front-line and Apex Regulatory Bodies.',
        },
        {
          icon: TrendingUp,
          title: 'Agri & Non-Agri Commodity Futures',
          description:
            'Channelize your hard-earned savings into an income stream by investing in a diversified wide array of Futures Contracts in Local and International Soft and Hard Commodities.',
        },
        {
          icon: Monitor,
          title: 'Robust Electronic Trading Platform',
          description:
            "Trade on PMEX's robust, secure, and user-friendly Electronic Trading Platform where investors can place orders for seamless execution in a swift and efficient manner under R&D team guidance.",
        },
        {
          icon: Lock,
          title: 'Investor Protection & Compliance',
          description:
            'RVSPL strictly adheres to all regulatory compliance frameworks for the protection of its investors, ensuring your hard-earned savings remain secure at all times.',
        },
        {
          icon: Headphones,
          title: 'Responsive Multi-Channel Support',
          description:
            "RVSPL provides excellent, responsive, and timely support to its clients for resolution of their queries over multiple channels — so you're never left without guidance.",
        },
        {
          icon: Users,
          title: 'Investor Awareness Programs',
          description:
            'RVSPL is determined to conduct awareness programs for investors of the Commodity Market in collaboration with stakeholders, empowering clients to make informed trading decisions.',
        },
      ].map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-muted rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors duration-300">
            <feature.icon className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 leading-snug">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>


      {/* Trust Indicators */}
      <section className="section-spacing bg-muted">
  <div className="container-custom px-4 sm:px-6">

    {/* Section header */}
    <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
        Our Credentials
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
        Trusted and regulated
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Building confidence through regulatory compliance and professional service
      </p>
    </div>

    {/* 2-column grid */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
    >

      {/* LEFT — SECP */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col gap-5"
      >
        {/* Logo + title */}
        <div className="flex items-center gap-4">
          <div className="shrink-0 flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white p-2 border border-border/40 shadow-sm">
            <img
              src="/company_logo/secp.png"
              alt="SECP"
              className="h-full w-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full text-accent"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>'
              }}
            />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-foreground leading-tight mb-0.5">
              SECP Licensed
            </div>
            <div className="text-xs text-accent font-medium">
              Est. 1999 · Government of Pakistan
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          The Securities & Exchange Commission of Pakistan (SECP) is the primary corporate
          and financial regulatory authority of Pakistan — overseeing capital markets,
          corporate governance, insurance, and non-banking financial companies.
        </p>

        {/* Facts */}
        {/* <div className="grid grid-cols-2 gap-2">
          {[
            'Established in 1999',
            'Regulates capital markets',
            'Investor protection mandate',
            '9 offices nationwide',
          ].map((fact, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
              <span className="text-xs text-muted-foreground leading-snug">{fact}</span>
            </div>
          ))}
        </div>

        {/* Licence image */}
        <div className="relative w-full mt-1">
          <div className="absolute inset-0 rounded-2xl bg-accent/10 blur-2xl scale-95 pointer-events-none" />
          <div className="relative rounded-xl overflow-hidden border border-border/60 shadow-md">
            <img
              src="/documents/licence/secp_licence.jpg"
              alt="SECP Licence — Right Vision Securities"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/70 to-transparent" />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card border border-border/60 rounded-full px-4 py-1.5 shadow-lg whitespace-nowrap">
            <span className="text-xs font-semibold text-foreground">SECP Licence</span>
          </div>
        </div>
      </motion.div>

      {/* RIGHT — PMEX */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col gap-5"
      >
        {/* Logo + title */}
        <div className="flex items-center gap-4">
          <div className="shrink-0 flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white p-2 border border-border/40 shadow-sm">
            <img
              src="/company_logo/pmex.svg"
              alt="PMEX"
              className="h-full w-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full text-accent"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></div>'
              }}
            />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-foreground leading-tight mb-0.5">
              PMEX Registered
            </div>
            <div className="text-xs text-accent font-medium">
              Est. 2007 · Pakistan's Only Commodity Exchange
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Pakistan Mercantile Exchange (PMEX) is Pakistan's first and only
          multi-commodity futures exchange licensed by SECP — offering metals,
          agriculture, energy, and financial futures on a fully electronic platform.
        </p>

        {/* Facts */}
        {/* <div className="grid grid-cols-2 gap-2">
          {[
            'Founded in 2007',
            'Metals, Agri & Energy futures',
            'MT5 & WebTrade platforms',
            'Member of FIA (USA) & AFM',
          ].map((fact, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
              <span className="text-xs text-muted-foreground leading-snug">{fact}</span>
            </div>
          ))}
        </div> */}

        {/* Licence image */}
        <div className="relative w-full mt-1">
          <div className="absolute inset-0 rounded-2xl bg-accent/10 blur-2xl scale-95 pointer-events-none" />
          <div className="relative rounded-xl overflow-hidden border border-border/60 shadow-md">
            <img
              src="/documents/licence/pmex_licence.jpg"
              alt="PMEX Licence — Right Vision Securities"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/70 to-transparent" />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card border border-border/60 rounded-full px-4 py-1.5 shadow-lg whitespace-nowrap">
            <span className="text-xs font-semibold text-foreground">PMEX Licence</span>
          </div>
        </div>
      </motion.div>

    </motion.div>
  </div>
</section>

<TradeSafelySection />


      <MarketsOverview markets={markets} />


      {/* How to Open Account Section */}
      <HowToOpenAccount />



      {/* Reports Preview */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Market reports and insights"
            subtitle="Professional analysis and research to support your trading decisions"
          />
          <ReportsList
            limit={3}
            columns={3}
            emptyMessage="Reports coming soon. Check back shortly."
          />
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

      <FAQSection />

      {/* CTA Section */}
      <CTASection
        headline="Ready to start trading?"
        description="Open an account with Right Vision Securities and access global commodity markets with professional support and regulatory protection."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'Open account now', href: '/contact' }}
      />

      <Footer />
    </>
  );
}

export default HomePage;