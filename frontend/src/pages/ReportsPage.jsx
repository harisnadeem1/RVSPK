import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calendar, CalendarDays, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
import ReportsList from '@/components/ReportsList.jsx';
import CTASection from '@/components/CTASection.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'

const tabs = [
  {
    value:    'daily',
    label:    'Daily Reports',
    icon:     CalendarDays,
    subtitle: 'Latest daily market analysis and trading insights',
  },
  {
    value:    'monthly',
    label:    'Monthly Reports',
    icon:     BarChart3,
    subtitle: 'Comprehensive monthly market reviews and outlooks',
  },
];

function ReportsPage() {
  const [activeTab, setActiveTab] = useState('daily');
  const activeTabData = tabs.find(t => t.value === activeTab);

  return (
    <>
      <Helmet>
        <title>Market Reports & Insights - Right Vision Securities</title>
        <meta
          name="description"
          content="Access professional commodity market reports, trading insights, and analysis from Right Vision Securities."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Market reports and insights"
        subtitle="Professional research and analysis to support your commodity and futures trading decisions"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Reports' },
        ]}
      />

      {/* ── Tab Switcher + Reports ──────────────────────────── */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">

          {/* Sticky pill switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-card border border-border rounded-2xl p-1.5 gap-1 shadow-sm">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`
                      flex items-center gap-2 px-5 sm:px-8 py-2.5
                      rounded-xl text-sm font-semibold transition-all duration-200
                      ${activeTab === tab.value
                        ? 'bg-accent text-accent-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab + '-sub'}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="text-center text-sm text-muted-foreground mb-10"
            >
              {activeTabData?.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Animated reports grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ReportsList
                reportType={activeTab}
                showFilters={true}
                columns={3}
                emptyMessage={`No ${activeTab} reports available yet.`}
              />
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── Archive Note ────────────────────────────────────── */}
      <section className="py-12 bg-card border-t border-border">
        <div className="container-custom">
          <div className="professional-card text-center max-w-2xl mx-auto">
            <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Need older reports?
            </h3>
            <p className="text-muted-foreground mb-6">
              Looking for historical market reports? Contact our team to request
              access to archived research materials.
            </p>
            <Link to="/contact">
  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
    Request archive access
  </Button>
</Link>
          </div>
        </div>
      </section>

      <CTASection
        headline="Get exclusive client research"
        description="Open an account with Right Vision Securities to access premium market reports, exclusive trading insights, and personalized research support."
        primaryCTA={{ text: 'Open account', href: '/contact' }}
        secondaryCTA={{ text: 'Client portal', href: '/clients' }}
      />

       
      <Footer />
    </>
  );
}

export default ReportsPage;