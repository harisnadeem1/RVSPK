import React from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import {
  Building2,
  FileText,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  Award,
  Users,
  Briefcase,
  Scale,
  ClipboardList,
  CheckCircle,
} from 'lucide-react'
import TrustBar from '@/components/TrustBar.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import PageHero from '@/components/PageHero.jsx'
import CTASection from '@/components/CTASection.jsx'
  

/* ─── animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ─── data ─── */
const companyDetails = [
  { label: 'Registered Name', value: 'Right Vision Securities (Private) Limited' },
  { label: 'Company Type', value: 'Limited by Shares' },
  { label: 'Services', value: 'Brokerage Company' },
  { label: 'Governing Body', value: 'Board of Directors' },
  { label: 'SECP Broker License No.', value: 'BRC-406' },
  { label: 'PMEX TREC No.', value: '037' },
  { label: 'Registered Office', value: '74-R, GCP Society, Johar Town, Lahore' },
  { label: 'Website', value: 'rvspk.com', href: 'https://rvspk.com' },
  { label: 'Email Address', value: 'hello@rvspk.com', href: 'mailto:hello@rvspk.com' },
  { label: 'Telephone', value: '042-35191188  ·  042-35191194', href: 'tel:04235191188' },
]

const keyFacts = [
  { icon: Shield, label: 'SECP License', value: 'BRC-406' },
  { icon: Award, label: 'PMEX TREC No.', value: '037' },
  { icon: Building2, label: 'Company Type', value: 'Pvt. Limited' },
  { icon: CheckCircle, label: 'Compliance', value: 'Active' },
]

function CompanyProfilePage() {
  return (
    <>
      <Helmet>
        <title>Company Profile — Right Vision Securities</title>
        <meta
          name="description"
          content="Corporate information for Right Vision Securities — SECP regulated and PMEX licensed commodity and futures brokerage firm in Lahore, Pakistan."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Company profile"
        subtitle="Official corporate information, registration details, and regulatory credentials"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Company Profile' },
        ]}
      />

      {/* ── Company Identity ── */}
      <section className="section-spacing bg-muted">
        <div className="container-custom px-4 sm:px-6">

          {/* Top identity card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border/60 mb-6 flex flex-col sm:flex-row items-start gap-5"
          >
            <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="h-7 w-7 text-accent" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-1 inline-block">
                Registered Company
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
                Right Vision Securities (Private) Limited
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                A SECP regulated and PMEX licensed commodity futures brokerage firm headquartered
                in Lahore, Pakistan. Currently engaged in brokerage of commodity futures contracts
                and other financial contracts available on the PMEX trading platform.
              </p>
            </div>
          </motion.div>

          {/* Key facts strip */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {keyFacts.map((fact, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-card rounded-xl p-4 sm:p-5 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group flex flex-col items-start gap-3"
              >
                <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <fact.icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    {fact.label}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-foreground">{fact.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Registered Details ── */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Official Records
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Registered company details
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Official corporate information and regulatory status as filed with SECP and PMEX
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            {companyDetails.map((detail, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-muted rounded-xl p-4 sm:p-5 border border-border/60 hover:border-accent/30 transition-all duration-200"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    target={detail.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-sm sm:text-base font-medium text-foreground">{detail.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOD & Auditors & Legal ── */}
<section className="section-spacing bg-muted">
  <div className="container-custom px-4 sm:px-6">
    <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
        Governance
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
        Board & advisors
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        The people responsible for governance, compliance, and oversight of the company
      </p>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto"
    >
      {/* BOD */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent/10 flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
            <Users className="h-5 w-5 text-accent" />
          </div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Board of Directors
          </span>
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 leading-snug">
          Directors
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground">Mr. Ajmal Shah Din</strong> — Chairman
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground">Ms. Sana Ajmal</strong> — Director
            </span>
          </li>
        </ul>
      </motion.div>

      {/* Auditors */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent/10 flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
            <ClipboardList className="h-5 w-5 text-accent" />
          </div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Auditors
          </span>
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 leading-snug">
          Audit & compliance
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground">External Auditor:</strong> AA & Company
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground">Internal Auditor:</strong> Mr. Saddam Qaisar
            </span>
          </li>
        </ul>
      </motion.div>

      {/* Legal */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent/10 flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
            <Scale className="h-5 w-5 text-accent" />
          </div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Legal
          </span>
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 leading-snug">
          Legal consultant
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground">Ms. Hafiza Taram Bashir</strong>
            </span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* ── Permissible Business Activities ── */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                What We Do
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Business activities
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Core services and permissible business activities as authorised by SECP and PMEX
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              {/* Primary Activity */}
              <motion.div
                variants={itemVariants}
                className="sm:col-span-2 bg-accent/5 border border-accent/20 rounded-xl sm:rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                    Primary Activity
                  </span>
                </div>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  Currently, the Company is primarily engaged in{' '}
                  <strong>brokerage of commodity futures contracts</strong> and other financial
                  contracts available on the <strong>PMEX Trading Platform</strong>.
                </p>
              </motion.div>

              {[
                { icon: Shield, title: 'Products', items: ['Metals', 'Agriculture', 'Energy', 'Financials'] },
                { icon: Award, title: 'Financial Contracts', items: ['Currency Futures', 'USD Index', 'Financial Derivatives', 'PMEX Listed Contracts'] },
              ].map((block, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-muted rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <block.icon className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">{block.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Get in touch with us"
        description="Contact Right Vision Securities to learn more about our services or to discuss your commodity trading requirements."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'Open account', href: '/contact' }}
      />

       
      <Footer />
    </>
  )
}

export default CompanyProfilePage