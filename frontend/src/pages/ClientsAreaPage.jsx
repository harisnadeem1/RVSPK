
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Lock, Shield, FileText, BarChart3, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import InfoCard from '@/components/InfoCard.jsx';
import CTASection from '@/components/CTASection.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function ClientsAreaPage() {
  const benefits = [
    {
      icon: BarChart3,
      title: 'Real-time account information',
      description: 'Access your account balance, margin status, and positions in real-time through our secure portal interface.'
    },
    {
      icon: Clock,
      title: 'Trading history and reports',
      description: 'View complete trading history with detailed transaction logs, profit and loss statements, and account activity reports.'
    },
    {
      icon: FileText,
      title: 'Document access',
      description: 'Download account statements, tax documents, trade confirmations, and regulatory disclosures at any time.'
    },
    {
      icon: Shield,
      title: 'Performance analytics',
      description: 'Track your trading performance with visual charts, statistics, and detailed analysis of your commodity trading activity.'
    },
    {
      icon: MessageSquare,
      title: 'Secure messaging',
      description: 'Communicate directly with your account manager and support team through encrypted messaging within the portal.'
    }
  ];

  const features = [
    {
      icon: BarChart3,
      title: 'Account management',
      description: 'Comprehensive dashboard displaying account balance, available margin, open positions, and pending orders. Real-time updates ensure you always have current information.',
      points: [
        'Live account balance and equity',
        'Margin utilization tracking',
        'Position monitoring',
        'Fund transfer requests'
      ]
    },
    {
      icon: FileText,
      title: 'Document center',
      description: 'Centralized access to all account-related documents, statements, and regulatory communications in digital format for easy retrieval.',
      points: [
        'Monthly account statements',
        'Trade confirmations',
        'Tax documents',
        'Regulatory disclosures'
      ]
    },
    {
      icon: Clock,
      title: 'Trading reports',
      description: 'Detailed reporting on your trading activity including profit and loss analysis, trade history, and performance metrics across different timeframes.',
      points: [
        'Daily trading summaries',
        'Profit and loss reports',
        'Commission breakdowns',
        'Year-to-date performance'
      ]
    },
    {
      icon: Shield,
      title: 'Security features',
      description: 'Bank-grade security with encrypted connections, two-factor authentication, and secure session management to protect your account information.',
      points: [
        'Two-factor authentication',
        'Encrypted data transmission',
        'Session timeout protection',
        'Activity monitoring'
      ]
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
        <title>Clients Area - Right Vision Securities</title>
        <meta
          name="description"
          content="Access your Right Vision Securities account through our secure client portal. View account information, trading history, documents, and reports."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Clients area"
        subtitle="Secure portal access for account management, trading reports, and documents"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Clients Area' }
        ]}
      />

      {/* Secure Portal Preview */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="professional-card text-center p-12"
            >
              <div className="h-20 w-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-6">
                <Lock className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Secure client portal
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Access your Right Vision Securities account through our secure online portal. View real-time account information, download documents, and manage your commodity trading activity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Login to portal
                </Button>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Request access
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Portal benefits"
            subtitle="Comprehensive account management tools and resources at your fingertips"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <InfoCard {...benefit} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Details */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Portal features"
            subtitle="Detailed overview of available features and functionality"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="professional-card"
              >
                <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Messaging */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="professional-card"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <Shield className="h-10 w-10" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Bank-grade security
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Right Vision Securities employs bank-grade security measures to protect your account information and personal data. Our client portal uses encrypted connections, two-factor authentication, and secure session management.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    All client data is stored in secure servers with regular backups and is protected according to SECP data protection guidelines. We continuously monitor for suspicious activity and employ industry-standard security protocols.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                      SSL Encryption
                    </span>
                    <span className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                      2FA Authentication
                    </span>
                    <span className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                      SECP Compliant
                    </span>
                    <span className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                      Data Protection
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Contact */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <MessageSquare className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Need help accessing your account?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our client support team is available to assist with portal access, password resets, and technical support. Contact us during business hours for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Contact support
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Reset password
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Not a client yet?"
        description="Open an account with Right Vision Securities to access our secure client portal and professional commodity trading services."
        primaryCTA={{ text: 'Open account', href: '/contact' }}
        secondaryCTA={{ text: 'Learn more', href: '/about' }}
      />

      <ComplianceStrip />
      <Footer />
    </>
  );
}

export default ClientsAreaPage;
