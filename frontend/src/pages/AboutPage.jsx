import React from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import {
  Shield,
  Target,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Eye,
  Lightbulb,
  BookOpen,
  HandshakeIcon,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import TrustBar from '@/components/TrustBar.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import PageHero from '@/components/PageHero.jsx'
import CTASection from '@/components/CTASection.jsx'
import ComplianceStrip from '@/components/ComplianceStrip.jsx'

/* ─── animation variants (same as HomePage) ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ─── data ─── */
const coreValues = [
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We observe the highest ethical values and professional principles in every client interaction, ensuring trust is never compromised.',
  },
  {
    icon: TrendingUp,
    title: 'Transparency',
    description:
      'Clear pricing, open communication, and straightforward terms. No hidden fees or surprises — what you see is what you get.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description:
      'Delivering outstanding brokerage services through continuous improvement, investment in people, and cutting-edge market tools.',
  },
  {
    icon: Users,
    title: 'Client-First',
    description:
      'Our clients\' investment goals are our priority. We serve both individual and institutional investors with equal dedication and care.',
  },
  {
    icon: Lightbulb,
    title: 'Financial Literacy',
    description:
      'Promoting awareness of commodity business across Pakistan, enabling retail-level investors to access markets with confidence.',
  },
  {
    icon: BookOpen,
    title: 'Education',
    description:
      'Transferring the savings of the general public into progressive, income-generating investment vehicles that grow with the economy.',
  },
]

const milestones = [
  { year: '2014', event: 'Right Vision Securities founded in Lahore with a mission to serve investors across Pakistan.' },
  { year: '2015', event: 'SECP regulatory approval received — registration no. SEC/TREC-034/2015.' },
  { year: '2016', event: 'Granted PMEX membership; commenced commodity futures trading services.' },
  { year: '2018', event: 'Expanded office infrastructure and grew the client support team.' },
  { year: '2021', event: 'Launched secure online client portal for seamless account management.' },
  { year: '2023', event: 'Reached significant active client milestone; deepened financial literacy outreach.' },
  { year: '2026', event: 'Continuing to serve Pakistan\'s trading community with expanded asset coverage.' },
]

/* ─── component ─── */
function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us — Right Vision Securities</title>
        <meta
          name="description"
          content="Right Vision Securities is a SECP regulated and PMEX licensed commodity brokerage firm based in Lahore, dedicated to transparent, efficient, and outstanding trading services."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="About Right Vision Securities"
        subtitle="Efficient, transparent, and outstanding commodity brokerage services — backed by regulatory compliance since 2014"
        backgroundImage="https://images.unsplash.com/photo-1662062656486-2bffb88aafa3"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About' },
        ]}
      />

      {/* ── Mission & Vision ── */}
<section className="section-spacing bg-muted">
  <div className="container-custom px-4 sm:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent/10 flex-shrink-0">
            <Target className="h-5 w-5 text-accent" />
          </div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Our Mission
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
          Serving investors with purpose
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <p>
            Right Vision Securities was launched with the mission to serve its clients on
            priority and other general investors by providing them{' '}
            <strong className="text-foreground">efficient, transparent, reliable, and outstanding</strong>{' '}
            brokerage services related to investment in different asset classes — including
            agri and non-agri commodities.
          </p>
          <p>
            We contemplate transferring the savings of the general public into progressive,
            income-generating investment vehicles that enable participation in the economic
            growth of the economy.
          </p>
          <p>
            To achieve this mission, the Company observes the{' '}
            <strong className="text-foreground">highest ethical values and professional principles</strong>{' '}
            to deliver on client expectations, enabling them to fulfil their aspirations and
            investment goals successfully.
          </p>
        </div>
      </motion.div>

      {/* Vision */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-primary/10 flex-shrink-0">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Our Vision
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
          Leading financial literacy in Pakistan
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <p>
            The foresight of establishing Right Vision Securities as a Commodity Futures
            Broker is to assume a{' '}
            <strong className="text-foreground">leading role in promoting financial literacy</strong>{' '}
            across the country in collaboration with PMEX stakeholders, and exploring new
            avenues of co-operation by establishing a platform to achieve the primary goal of
            gaining desired returns.
          </p>
          <p>
            We shall strive hard to invest in human capital, creating awareness of commodities
            business to consolidate local commerce and to enable{' '}
            <strong className="text-foreground">easy market access at the retail investor level</strong>.
          </p>
        </div>
      </motion.div>

    </div>
  </div>
</section>

      

      {/* ── Core Values ── */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              What We Stand For
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Our core values
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The principles that guide how we operate, serve clients, and grow Pakistan's investment community
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-muted rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <value.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 leading-snug">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     

      {/* ── Regulatory Compliance ── */}
      <section className="section-spacing bg-muted">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Our Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Regulatory compliance
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Licensed and regulated by Pakistan's foremost financial authorities
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
          >
            {[
              {
                icon: Shield,
                title: 'SECP Regulated',
                tag: 'Est. 1999 · Government of Pakistan',
                description:
                  'Licensed and regulated by the Securities and Exchange Commission of Pakistan under registration number SEC/TREC-034/2015.',
              },
              {
                icon: Award,
                title: 'PMEX Licensed',
                tag: 'Est. 2007 · Pakistan\'s Only Commodity Exchange',
                description:
                  'Authorised trading member of Pakistan Mercantile Exchange Limited, enabling agri, non-agri, and currency futures trading.',
              },
              {
                icon: CheckCircle,
                title: 'Full Compliance',
                tag: 'Investor Protection',
                description:
                  'Strict compliance with all applicable financial regulations and industry standards — your investments protected at every step.',
              },
            ].map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-muted rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <cert.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="text-xs text-accent font-medium mb-1">{cert.tag}</div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

{/* ── Office / Contact ── */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left — contact details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                Find Us
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                Visit our office
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                Our Lahore head office is open to clients for consultations, account opening,
                or to discuss trading strategies with our experienced team.
              </p>

              <div className="space-y-3">
                {[
                  { icon: MapPin, label: 'Address', content: '74-R, GCP Society, Johar Town, Lahore, Pakistan', href: null },
                  { icon: Phone, label: 'Phone', content: '042-35191194  ·  042-351911', href: 'tel:04235191194' },
                  { icon: Mail, label: 'Email', content: 'hello@rvspk.com', href: 'mailto:hello@rvspk.com' },
                  { icon: HandshakeIcon, label: 'Website', content: 'www.rvspk.com.pk', href: 'https://www.rvspk.com.pk' },
                ].map(({ icon: Icon, label, content, href }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 bg-card rounded-xl p-4 border border-border/60"
                  >
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                        >
                          {content}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground font-medium">{content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — map card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl sm:rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card"
            >
              {/* Decorative map header */}
              <div className="relative h-52 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center shadow-xl">
                    <MapPin className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <div className="bg-card rounded-xl px-4 py-2 shadow-md border border-border text-center">
                    <p className="text-sm font-semibold text-foreground">Right Vision Securities</p>
                    <p className="text-xs text-muted-foreground">Johar Town, Lahore</p>
                  </div>
                </div>
              </div>

              {/* Address + CTA */}
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
                    Head Office
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Right Vision Securities (Pvt.) Limited
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    74-R, GCP Society, Johar Town<br />
                    Lahore, Punjab, Pakistan
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://maps.app.goo.gl/eDdUaHJdjvoNTtuW7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground rounded-xl py-3 px-4 text-sm font-medium hover:bg-accent/90 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    Open in Google Maps
                  </a>
                  <a
                    href="tel:04235191194"
                    className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground rounded-xl py-3 px-4 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call us
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      

      <CTASection
        headline="Ready to start trading?"
        description="Open an account with Right Vision Securities and access global commodity markets with professional support and regulatory protection."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'Open account now', href: '/contact' }}
      />

       
      <Footer />
    </>
  )
}

export default AboutPage