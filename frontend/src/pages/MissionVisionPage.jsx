import React from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import {
  Target,
  Eye,
  Users,
  TrendingUp,
  Lightbulb,
  Globe,
  BookOpen,
  HandshakeIcon,
} from 'lucide-react'
import TrustBar from '@/components/TrustBar.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import PageHero from '@/components/PageHero.jsx'
import CTASection from '@/components/CTASection.jsx'
import ComplianceStrip from '@/components/ComplianceStrip.jsx'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const missionPoints = [
  {
    icon: Users,
    title: 'Clients First',
    desc: 'Serve clients on priority, and general investors, with 24/7 efficient, transparent, reliable, and outstanding brokerage services.',
  },
  {
    icon: TrendingUp,
    title: 'Income-Generating Investments',
    desc: 'Transfer the hard savings of the general public into progressive, income-generating investment vehicles that participate in economic growth.',
  },
  {
    icon: HandshakeIcon,
    title: 'Ethical Excellence',
    desc: 'Observe the highest ethical values and professional principles to fulfil client aspirations and investment goals successfully.',
  },
  {
    icon: Globe,
    title: 'Market Collaboration',
    desc: 'Accomplish our mission using all means in collaboration with market stakeholders for the broader benefit of Pakistans financial ecosystem.',
  },
]

const visionPoints = [
  {
    icon: Lightbulb,
    title: 'Financial Literacy Leader',
    desc: 'Assume a leading role in promoting financial literacy across Pakistan in collaboration with PMEX stakeholders.',
  },
  {
    icon: BookOpen,
    title: 'Human Capital Investment',
    desc: 'Invest in human capital to create awareness of commodities business, consolidate local commerce, and enable easy market access at the retail investor level.',
  },
  {
    icon: TrendingUp,
    title: 'Channelise Savings',
    desc: 'Change the landscape of learning skills to channelise savings into income streams by creating public awareness about commodities trading.',
  },
  {
    icon: Globe,
    title: 'Financial Literacy & Outreach Programs',
    desc: 'Educate and create awareness by conducting a series of outreach programs, offering cost-effective, paperless products and services for national and international experience sharing.',
  },
]

function MissionVisionPage() {
  return (
    <>
      <Helmet>
        <title>Mission &amp; Vision — Right Vision Securities</title>
        <meta
          name="description"
          content="Right Vision Securities' mission is to serve investors with efficient, transparent, and outstanding brokerage services. Our vision is to lead financial literacy across Pakistan."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Mission & Vision"
        subtitle="Our purpose, our direction, and the values that drive everything we do"
        backgroundImage="https://images.unsplash.com/photo-1662062656486-2bffb88aafa3"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Mission & Vision' },
        ]}
      />

      {/* ── Mission & Vision Cards ── */}
      <section className="section-spacing bg-muted">
        <div className="container-custom px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-6 sm:p-10 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-accent/10 flex-shrink-0">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                  Our Mission — Clients First
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
                Serving investors with purpose
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Right Vision Securities was incorporated as a Commodity Future Broker with the mission
                  to serve its clients on priority and other general investors by providing them{' '}
                  <strong className="text-foreground">
                    efficient, transparent, reliable, legitimate, and outstanding
                  </strong>{' '}
                  brokerage services related to investment in different asset classes — including
                  Financials, COTs, agri and non-agri commodities.
                </p>
                <p>
                  The Company contemplates transferring the hard savings of the general public into
                  <strong className="text-foreground"> progressive, income-generating investment vehicles</strong>{' '}
                  that enable participation in the economic growth of the economy.
                </p>
                <p>
                  To achieve the mission, the Company shall observe the{' '}
                  <strong className="text-foreground">highest ethical values and professional principles</strong>{' '}
                  to deliver client expectations — enabling them to fulfil their aspirations and
                  investment goals successfully. The Company is determined to accomplish its mission
                  using all means in collaboration with market stakeholders.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-6 sm:p-10 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 flex-shrink-0">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                  Our Vision — Broaden Investor Base
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
                Leading financial literacy in Pakistan
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The foresight of establishing Right Vision Securities as a Commodity Futures Broker is
                  to assume a{' '}
                  <strong className="text-foreground">
                    leading role in promoting financial literacy
                  </strong>{' '}
                  across the country in collaboration with PMEX stakeholders, exploring new avenues of
                  co-operation to achieve the primary goal of gaining desired returns.
                </p>
                <p>
                  The Company is determined to strive hard, investing in human capital, creating awareness
                  of commodities business to consolidate local commerce, and to enable{' '}
                  <strong className="text-foreground">easy market access at the retail investor level</strong>.
                </p>
                <p>
                  The Company is fully committed to playing a pivotal role in{' '}
                  <strong className="text-foreground">
                    changing the landscape of learning skills
                  </strong>{' '}
                  to channelise savings into income streams — and to revolutionise by providing clients
                  with national and international commodities investment experience through a{' '}
                  <strong className="text-foreground">paperless, cost-effective</strong> environment.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Mission Pillars ── */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Mission Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              How we fulfil our mission
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {missionPoints.map((point, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-muted rounded-2xl p-5 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                  <point.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Vision Pillars ── */}
      <section className="section-spacing bg-muted">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Vision Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              How we realise our vision
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {visionPoints.map((point, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-card rounded-2xl p-5 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <point.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        headline="Aligned with your investment goals"
        description="At Right Vision Securities, your financial growth is our mission. Join us and experience regulated, transparent, and purpose-driven brokerage."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'Open account now', href: '/contact' }}
      />

       
      <Footer />
    </>
  )
}

export default MissionVisionPage