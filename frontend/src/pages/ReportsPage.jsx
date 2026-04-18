
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar } from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import ReportCard from '@/components/ReportCard.jsx';
import CTASection from '@/components/CTASection.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { value: 'all', label: 'All Reports' },
    { value: 'market-analysis', label: 'Market Analysis' },
    { value: 'trading-insights', label: 'Trading Insights' },
    { value: 'commodity-report', label: 'Commodity Report' },
    { value: 'monthly-outlook', label: 'Monthly Outlook' }
  ];

  const featuredReports = [
    {
      title: 'Q1 2026 commodity market outlook',
      date: 'March 28, 2026',
      category: 'Market Analysis',
      description: 'Comprehensive analysis of crude oil, gold, and precious metals markets for the first quarter with detailed trading strategies and price forecasts.',
      featured: true
    },
    {
      title: 'Gold price trends and technical analysis',
      date: 'April 12, 2026',
      category: 'Commodity Report',
      description: 'In-depth examination of gold market fundamentals, chart patterns, and price projections for Q2 2026 based on technical and fundamental factors.',
      featured: true
    }
  ];

  const allReports = [
    {
      title: 'Crude oil supply and demand dynamics',
      date: 'April 8, 2026',
      category: 'Trading Insights',
      description: 'Analysis of global oil production, consumption patterns, and their impact on WTI and Brent crude prices in current market conditions.'
    },
    {
      title: 'Silver market fundamentals report',
      date: 'March 24, 2026',
      category: 'Commodity Report',
      description: 'Examination of silver supply constraints, industrial demand trends, and investment flows affecting precious metals markets.'
    },
    {
      title: 'Dollar index technical outlook',
      date: 'March 19, 2026',
      category: 'Market Analysis',
      description: 'Technical analysis of USD index movements with key support and resistance levels for currency futures trading.'
    },
    {
      title: 'Platinum trading opportunities',
      date: 'March 15, 2026',
      category: 'Trading Insights',
      description: 'Identification of platinum futures trading opportunities based on automotive demand recovery and supply dynamics.'
    },
    {
      title: 'March 2026 monthly market review',
      date: 'March 4, 2026',
      category: 'Monthly Outlook',
      description: 'Comprehensive review of commodity market performance in March with outlook for April trading strategies.'
    },
    {
      title: 'Crude oil technical chart patterns',
      date: 'February 27, 2026',
      category: 'Trading Insights',
      description: 'Technical analysis of WTI crude oil futures with identified chart patterns and trading setups for active traders.'
    },
    {
      title: 'Gold and dollar correlation study',
      date: 'February 18, 2026',
      category: 'Market Analysis',
      description: 'Statistical analysis of gold-dollar inverse correlation and implications for multi-asset trading strategies.'
    },
    {
      title: 'February 2026 commodity outlook',
      date: 'February 5, 2026',
      category: 'Monthly Outlook',
      description: 'Monthly outlook covering all major commodities with price forecasts and recommended trading approaches.'
    },
    {
      title: 'Energy markets geopolitical analysis',
      date: 'January 29, 2026',
      category: 'Market Analysis',
      description: 'Examination of geopolitical factors influencing crude oil and natural gas markets with risk assessment.'
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
        <title>Market Reports & Insights - Right Vision Securities</title>
        <meta
          name="description"
          content="Access professional commodity market reports, trading insights, and analysis from Right Vision Securities. Research resources for informed trading decisions."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Market reports and insights"
        subtitle="Professional research and analysis to support your commodity and futures trading decisions"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Reports' }
        ]}
      />

      {/* Search and Filter */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:col-span-5">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reports */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Featured reports"
            subtitle="Latest market analysis and trading insights from our research team"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {featuredReports.map((report, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ReportCard {...report} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Reports */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Recent reports"
            subtitle="Comprehensive archive of market research and analysis"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {allReports.map((report, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ReportCard {...report} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Archive Note */}
      <section className="py-12 bg-muted">
        <div className="container-custom">
          <div className="professional-card text-center max-w-2xl mx-auto">
            <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Need older reports?
            </h3>
            <p className="text-muted-foreground mb-6">
              Looking for historical market reports and analysis? Contact our team to request access to archived research materials.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Request archive access
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        headline="Get exclusive client research"
        description="Open an account with Right Vision Securities to access premium market reports, exclusive trading insights, and personalized research support."
        primaryCTA={{ text: 'Open account', href: '/contact' }}
        secondaryCTA={{ text: 'Client portal', href: '/clients' }}
      />

      <ComplianceStrip />
      <Footer />
    </>
  );
}

export default ReportsPage;
