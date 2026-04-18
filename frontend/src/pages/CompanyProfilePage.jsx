
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building2, FileText, MapPin, Calendar, Users, TrendingUp, Shield, Award } from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import StatsCard from '@/components/StatsCard.jsx';
import CTASection from '@/components/CTASection.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';

function CompanyProfilePage() {
  const keyFacts = [
    {
      icon: Calendar,
      number: '2014',
      label: 'Established',
      description: 'Founded in Lahore, Pakistan'
    },
    {
      icon: Users,
      number: '2,847',
      label: 'Active Clients',
      description: 'Serving traders nationwide'
    },
    {
      icon: TrendingUp,
      number: '5',
      label: 'Markets',
      description: 'Commodity and futures access'
    },
    {
      icon: Shield,
      number: '12+',
      label: 'Years',
      description: 'Industry experience'
    }
  ];

  const companyDetails = [
    {
      label: 'Registered name',
      value: 'Right Vision Securities (Private) Limited'
    },
    {
      label: 'Registration number',
      value: 'SEC/TREC-034/2015'
    },
    {
      label: 'Registration date',
      value: 'January 15, 2015'
    },
    {
      label: 'Regulatory status',
      value: 'SECP Regulated, PMEX Licensed'
    },
    {
      label: 'Business type',
      value: 'Commodity and Futures Brokerage'
    },
    {
      label: 'Primary market',
      value: 'Pakistan Mercantile Exchange (PMEX)'
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
        <title>Company Profile - Right Vision Securities</title>
        <meta
          name="description"
          content="Corporate information for Right Vision Securities - SECP regulated and PMEX licensed commodity and futures brokerage firm in Pakistan."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Company profile"
        subtitle="Corporate information and registration details"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Company Profile' }
        ]}
      />

      {/* Registered Company Details */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Registered company details"
            subtitle="Official corporate information and regulatory status"
          />
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="professional-card"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="h-16 w-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Right Vision Securities (Private) Limited
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A registered commodity and futures brokerage firm licensed by the Securities and Exchange Commission of Pakistan (SECP) and authorized as a trading member of Pakistan Mercantile Exchange (PMEX).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companyDetails.map((detail, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {detail.label}
                    </span>
                    <span className="text-lg text-foreground font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Summary */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Corporate summary"
              subtitle="Business overview and market position"
              align="left"
            />
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Right Vision Securities (Private) Limited operates as a full-service commodity and futures brokerage firm headquartered in Lahore, Pakistan. The company specializes in providing retail and institutional clients with access to international commodity markets through the Pakistan Mercantile Exchange.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As a SECP regulated entity and PMEX licensed trading member, Right Vision Securities maintains strict compliance with all applicable financial regulations and industry standards. The company's operations focus on crude oil, precious metals (gold, silver, platinum), and currency futures trading.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a team of experienced market professionals and a commitment to transparent pricing and professional service, Right Vision Securities has established itself as a trusted partner for commodity traders across Pakistan. The firm's client-focused approach emphasizes education, risk management, and ongoing support throughout the trading process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Details */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Office information"
            subtitle="Corporate headquarters and contact details"
          />
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="professional-card"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Corporate Office</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Office 204, 2nd Floor<br />
                        Ali Trade Center<br />
                        Gulberg III<br />
                        Lahore, Punjab<br />
                        Pakistan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <FileText className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <Shield className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Contact Information</h3>
                      <p className="text-muted-foreground mb-3">
                        Phone: <a href="tel:+92423587123" className="text-accent hover:text-accent/80">+92 42 3587 123</a><br />
                        Email: <a href="mailto:info@rightvision.com.pk" className="text-accent hover:text-accent/80">info@rightvision.com.pk</a><br />
                        Website: www.rightvision.com.pk
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Award className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Regulatory Information</h3>
                      <p className="text-muted-foreground">
                        SECP License: SEC/TREC-034/2015<br />
                        PMEX Membership: Active<br />
                        Compliance Status: Current
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Key facts"
            subtitle="Important metrics and company information"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {keyFacts.map((fact, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StatsCard {...fact} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Business Overview */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Business operations"
              subtitle="Core services and market focus"
              align="left"
            />
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Core services</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Commodity futures trading (crude oil, gold, silver, platinum)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Currency futures trading (USD index and major currency pairs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Market research and analysis reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Professional trading support and account management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Risk management consultation and education</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Market focus</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Right Vision Securities operates exclusively in commodity and futures markets through the Pakistan Mercantile Exchange. The company provides clients with access to international commodity prices while maintaining compliance with all local regulatory requirements. Our focus on transparent pricing, professional execution, and client education has established us as a reliable partner in Pakistan's commodity trading sector.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Request more information"
        description="Contact Right Vision Securities to learn more about our company, services, or to discuss your commodity trading requirements."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'View leadership', href: '/board' }}
      />

      <ComplianceStrip />
      <Footer />
    </>
  );
}

export default CompanyProfilePage;
