import React from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import {
  Building2,
  Shield,
  Award,
  Users,
  Newspaper,
  CheckCircle,
} from 'lucide-react'
import TrustBar from '@/components/TrustBar.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import PageHero from '@/components/PageHero.jsx'
import CTASection from '@/components/CTASection.jsx'
  

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const groupCompanies = [
  { icon: Building2, name: 'Right Vision Media', desc: 'IT Company' },
  { icon: Building2, name: 'Modem4 Private Limited', desc: 'A leading advertising company' },
  { icon: Building2, name: 'Comprehensive Legal Education (Pvt.) Ltd.', desc: 'Lahore School of Law' },
  { icon: Building2, name: 'Right Vision Securities (Pvt.) Limited', desc: 'Future Brokerage Company', highlight: true },
]

const highlights = [
  { icon: Shield, label: 'SECP Licensed', detail: 'BRC-406 · Future Broker License' },
  { icon: Award, label: 'PMEX Member', detail: 'TREC #037 · Universal Trading Rights' },
  { icon: Users, label: 'Dedicated Team', detail: 'Skilled & experienced professionals' },
  { icon: Newspaper, label: 'Daily Newswire', detail: 'Keeping clients informed daily' },
  { icon: CheckCircle, label: 'Lowest Commission', detail: 'Transparent, competitive pricing' },
  { icon: Shield, label: 'Highest Integrity', detail: 'Fully compliant & ethically driven' },
]

function IntroductionPage() {
  return (
    <>
      <Helmet>
        <title>Introduction — Right Vision Securities</title>
        <meta
          name="description"
          content="Right Vision Securities (Pvt.) Limited — a SECP licensed and PMEX registered future brokerage company, part of the Right Vision Group, committed to transparent and reliable capital market services."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Introduction"
        subtitle="A trusted future brokerage firm — part of the Right Vision Group of Companies"
        backgroundImage="https://images.unsplash.com/photo-1662062656486-2bffb88aafa3"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Introduction' },
        ]}
      />

      {/* ── Who We Are ── */}
      <section className="section-spacing bg-muted">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Right Vision Securities (Pvt.) Limited
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Right Vision Securities (Private) Limited (RVSPL) is an associated company of the{' '}
              <strong className="text-foreground">Right Vision Group of Companies</strong>, founded in 2007.
              RVSPL was established with a mission to serve investors on priority by providing them{' '}
              <strong className="text-foreground">24/7 efficient, transparent, reliable, and excellent</strong>{' '}
              brokerage services related to investment in multi-asset classes of capital markets.
            </p>
          </div>

          {/* About paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-card rounded-2xl p-6 sm:p-10 border border-border/60 shadow-sm space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-12"
          >
            <p>
              The Company shall observe the highest ethical values, is fully compliant with the regulatory
              framework, and adheres to professional principles to deliver its services in a timely manner —
              meeting client expectations and leading them to achieve their investment goals successfully.
            </p>
            <p>
              Right Vision Securities (Private) Limited is a{' '}
              <strong className="text-foreground">Future Brokerage Company</strong> registered with Pakistan
              Mercantile Exchange (PMEX) as a Member / Trading Right Entitlement Certificate holder{' '}
              <strong className="text-foreground">(TREC #037)</strong>, granted Universal Trading Rights at
              the Exchange, and licensed <strong className="text-foreground">(BRC-406)</strong> under the
              Securities and Exchange Commission of Pakistan (SECP) as a Future Broker.
            </p>
            <p>
              The registered office of RVSPL is situated at{' '}
              <strong className="text-foreground">74-R, GCP Society, Johar Town, Lahore</strong>. RVSPL is
              fully committed to operating with integrity, with a dedicated team of skilled and
              experienced professionals aiming to be a trusted partner — facilitating fair and reliable
              access to capital markets. We offer the{' '}
              <strong className="text-foreground">lowest brokerage commission</strong> along with our unique
              service of publishing a <strong className="text-foreground">"Daily Newswire"</strong> to keep
              valued clients updated on market-related current affairs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Right Vision Group ── */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Our Parent Group
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Right Vision Group of Companies
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Founded in 2007, the Right Vision Group operates across multiple industries in Pakistan
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {groupCompanies.map((company, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`rounded-2xl p-5 border transition-all duration-300 ${
                  company.highlight
                    ? 'bg-accent/10 border-accent/40 shadow-md'
                    : 'bg-muted border-border/60 hover:border-accent/30 hover:shadow-md'
                }`}
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-accent/10 mb-4">
                  <company.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1 leading-snug">
                  {company.name}
                </h3>
                <p className="text-xs text-muted-foreground">{company.desc}</p>
                {company.highlight && (
                  <span className="inline-block mt-2 text-xs font-semibold text-accent uppercase tracking-wider">
                    ← That's us
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Key Highlights ── */}
      <section className="section-spacing bg-muted">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              What sets us apart
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-card rounded-2xl p-5 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group flex items-start gap-4"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-accent/10 flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <h.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">{h.label}</h3>
                  <p className="text-xs text-muted-foreground">{h.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        headline="Ready to start trading?"
        description="Open an account with Right Vision Securities and access capital markets with professional support and full regulatory protection."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'Open account now', href: '/contact' }}
      />

       
      <Footer />
    </>
  )
}

export default IntroductionPage