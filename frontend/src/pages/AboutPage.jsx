
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Target, TrendingUp, Users, Award, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import InfoCard from '@/components/InfoCard.jsx';
import CTASection from '@/components/CTASection.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';

function AboutPage() {
  const coreValues = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Operating with honesty and transparency in all client interactions, maintaining the highest ethical standards in the financial services industry.'
    },
    {
      icon: TrendingUp,
      title: 'Transparency',
      description: 'Clear pricing, open communication, and straightforward terms. No hidden fees or surprise charges in our trading services.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to delivering professional service quality through continuous improvement and investment in our team and technology.'
    },
    {
      icon: Users,
      title: 'Client-focused',
      description: 'Your trading success is our priority. Dedicated support team available to assist with market analysis and account management.'
    }
  ];

  const milestones = [
    { year: '2014', event: 'Right Vision Securities founded in Lahore' },
    { year: '2015', event: 'SECP regulatory approval received' },
    { year: '2016', event: 'PMEX membership granted, began commodity trading' },
    { year: '2018', event: 'Expanded office space and client support team' },
    { year: '2021', event: 'Launched secure online client portal' },
    { year: '2023', event: 'Reached 2,500+ active client milestone' },
    { year: '2026', event: 'Continuing to serve Pakistan\'s trading community' }
  ];

  const trustCertifications = [
    {
      icon: Shield,
      title: 'SECP regulated',
      description: 'Licensed and regulated by the Securities and Exchange Commission of Pakistan under registration number SEC/TREC-034/2015.'
    },
    {
      icon: Award,
      title: 'PMEX licensed',
      description: 'Authorized trading member of Pakistan Mercantile Exchange Limited, enabling commodity and futures trading services.'
    },
    {
      icon: CheckCircle,
      title: 'Compliance certified',
      description: 'Maintaining strict compliance with all applicable financial regulations and industry standards for client protection.'
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
        <title>About Us - Right Vision Securities</title>
        <meta
          name="description"
          content="Learn about Right Vision Securities, a SECP regulated and PMEX licensed brokerage firm with over 12 years of experience in commodity and futures trading."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="About Right Vision Securities"
        subtitle="Professional commodity and futures trading services backed by regulatory compliance and market expertise"
        backgroundImage="https://images.unsplash.com/photo-1662062656486-2bffb88aafa3"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About' }
        ]}
      />

      {/* Company Overview */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Our story"
              subtitle="Building trust through professional service and regulatory compliance"
              align="center"
            />
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Right Vision Securities was established in 2014 with a mission to provide professional commodity and futures trading services to clients across Pakistan. As a SECP regulated and PMEX licensed brokerage firm, we maintain the highest standards of regulatory compliance and client service.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our commitment to transparency, ethical business practices, and client success has helped us build lasting relationships with traders throughout Pakistan. We understand that commodity trading requires expertise, reliable execution, and ongoing support — values that guide every aspect of our operations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Operating from our Lahore office, we serve a diverse client base ranging from individual traders to institutional investors. Our team of experienced market professionals provides comprehensive support across crude oil, gold, silver, platinum, and currency futures trading.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over a decade of experience in commodity markets, Right Vision Securities continues to invest in technology, regulatory compliance, and team development to deliver exceptional service to our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Our core values"
            subtitle="Principles that guide our operations and client relationships"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {coreValues.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <InfoCard {...value} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Our journey"
            subtitle="Key milestones in Right Vision Securities' development"
          />
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-xl bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-bold text-lg">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-3">
                    <p className="text-lg text-foreground font-medium">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Regulatory compliance"
            subtitle="Licensed and regulated by Pakistan's financial authorities"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {trustCertifications.map((cert, index) => (
              <motion.div key={index} variants={itemVariants}>
                <InfoCard {...cert} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Office Location */}
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
                Visit our office
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our Lahore office serves as the headquarters for Right Vision Securities' operations. We welcome clients to visit us for consultations, account opening, or to discuss trading strategies with our team.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Address</div>
                    <p className="text-muted-foreground">
                      Office 204, 2nd Floor, Ali Trade Center<br />
                      Gulberg III, Lahore, Pakistan
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Phone</div>
                    <a href="tel:+92423587123" className="text-accent hover:text-accent/80">
                      +92 42 3587 123
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Email</div>
                    <a href="mailto:info@rightvision.com.pk" className="text-accent hover:text-accent/80">
                      info@rightvision.com.pk
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1693305886158-24d846d889f9"
                alt="Right Vision Securities office building"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Start your trading journey"
        description="Open an account with Right Vision Securities and benefit from professional support, transparent pricing, and regulatory protection."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'Client portal', href: '/clients' }}
      />

      <ComplianceStrip />
      <Footer />
    </>
  );
}

export default AboutPage;
