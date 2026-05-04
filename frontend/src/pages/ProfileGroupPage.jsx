
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import ProfileCard from '@/components/ProfileCard.jsx';
import CTASection from '@/components/CTASection.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';

function BoardPage() {
  const directors = [
    {
      name: 'Khalid Mahmood',
      title: 'Chief Executive Officer',
      experience: 18,
      bio: 'Khalid brings over 18 years of experience in commodity markets and financial services. Prior to founding Right Vision Securities, he held senior positions at leading brokerage firms in Pakistan. His expertise spans commodity trading, risk management, and regulatory compliance.',
      expertise: ['Commodity Markets', 'Strategic Leadership', 'Regulatory Compliance']
    },
    {
      name: 'Sana Akhtar',
      title: 'Chief Financial Officer',
      experience: 14,
      bio: 'Sana oversees all financial operations and regulatory reporting for Right Vision Securities. With a background in chartered accountancy and financial management, she ensures the company maintains strict financial controls and compliance with SECP requirements.',
      expertise: ['Financial Management', 'Compliance', 'Risk Assessment']
    },
    {
      name: 'Raza Ahmed',
      title: 'Head of Trading Operations',
      experience: 16,
      bio: 'Raza leads the trading desk and operations team with extensive experience in commodity futures markets. His background includes positions at international brokerage firms and deep expertise in crude oil and precious metals trading.',
      expertise: ['Trading Operations', 'Market Analysis', 'Client Support']
    },
    {
      name: 'Amina Khan',
      title: 'Director of Compliance',
      experience: 12,
      bio: 'Amina ensures Right Vision Securities maintains full compliance with all SECP and PMEX regulations. Her legal and regulatory expertise helps the company navigate evolving compliance requirements and maintain best practices in client protection.',
      expertise: ['Regulatory Compliance', 'Legal Affairs', 'Policy Development']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
        <title>Board of Directors - Right Vision Securities</title>
        <meta
          name="description"
          content="Meet the leadership team at Right Vision Securities - experienced professionals guiding our commodity and futures brokerage operations."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Board of directors"
        subtitle="Experienced leadership guiding Right Vision Securities' operations and strategic direction"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Board of Directors' }
        ]}
      />

      {/* Leadership Introduction */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Our leadership team"
              subtitle="Decades of combined experience in commodity markets and financial services"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Right Vision Securities is led by a team of experienced professionals with deep expertise in commodity trading, financial management, and regulatory compliance. Our leadership's commitment to ethical business practices and client success has been fundamental to the company's growth and reputation in Pakistan's commodity trading sector.
            </p>
          </div>
        </div>
      </section>

      {/* Director Profiles */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {directors.map((director, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ProfileCard {...director} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Governance Statement */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Corporate governance"
              subtitle="Commitment to transparency, accountability, and regulatory compliance"
              align="left"
            />
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Right Vision Securities maintains strict corporate governance standards in accordance with SECP regulations and industry best practices. Our board of directors is responsible for strategic oversight, risk management, and ensuring the company operates with integrity and transparency.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The leadership team meets regularly to review company performance, assess regulatory compliance, and make strategic decisions that align with our commitment to client service and market integrity. All directors maintain current knowledge of commodity markets and regulatory requirements through ongoing professional development.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that strong governance is essential to building and maintaining client trust. Our leadership's experience, combined with our commitment to ethical business practices, provides a solid foundation for Right Vision Securities' continued growth and service to Pakistan's trading community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Work with experienced professionals"
        description="Open an account with Right Vision Securities and benefit from the expertise of our seasoned leadership team and professional support staff."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'Company profile', href: '/company-profile' }}
      />

      <ComplianceStrip />
      <Footer />
    </>
  );
}

export default BoardPage;
