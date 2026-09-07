import React from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import {
  Shield,
  TrendingUp,
  Monitor,
  Lock,
  Headphones,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import TrustBar from '@/components/TrustBar.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import PageHero from '@/components/PageHero.jsx'
import CTASection from '@/components/CTASection.jsx'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const features = [
  {
    icon: Shield,
    title: 'Regulated & Licensed Entity',
    description:
      'RVSPL is a regulated entity registered with PMEX as a Universal Trading Broker and licensed under SECP, strictly adhering to the regulatory framework set by front-line and apex regulatory bodies.',
  },
  {
    icon: TrendingUp,
    title: 'Agri & Non-Agri Commodity Futures',
    description:
      'Channelize your hard-earned savings into an income stream by investing in a diversified range of futures contracts in local and international soft and hard commodities.',
  },
  {
    icon: Monitor,
    title: 'Robust Electronic Trading Platform',
    description:
      'Trade on PMEX’s robust, secure, and user-friendly electronic trading platform, where investors can place orders for seamless execution in a swift and efficient manner.',
  },
  {
    icon: Lock,
    title: 'Investor Protection & Compliance',
    description:
      'RVSPL strictly adheres to all applicable regulatory compliance frameworks for the protection of its investors, helping keep your investments secure at every stage.',
  },
  {
    icon: Headphones,
    title: 'Responsive Multi-Channel Support',
    description:
      'Our team provides responsive and timely support for client queries through multiple communication channels, so you are never left without guidance.',
  },
  {
    icon: Users,
    title: 'Investor Awareness Programs',
    description:
      'RVSPL is committed to conducting awareness programs for commodity-market investors in collaboration with stakeholders, supporting more informed trading decisions.',
  },
]

const investorBenefits = [
  'Access to local and international commodity futures markets',
  'A regulated brokerage environment under SECP and PMEX frameworks',
  'Secure and user-friendly electronic trading tools',
  'Transparent service with professional client support',
  'Investor education and market-awareness initiatives',
  'Guidance for individual, corporate, joint, and Sahulat account holders',
]

function WhyChooseUsPage() {
  return (
    <>
      <Helmet>
        <title>Why Choose Us — Right Vision Securities</title>
        <meta
          name="description"
          content="Discover why investors choose Right Vision Securities for regulated commodity and futures trading, investor protection, reliable support, and secure market access."
        />
      </Helmet>

      <Navbar />

      <PageHero
        title="Why Trade With Right Vision"
        subtitle="A regulated, secure, and client-focused gateway to commodity and futures markets"
        backgroundImage="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Why Choose Us' },
        ]}
      />

      {/* Introduction */}
      <section className="section-spacing bg-muted">
        <div className="container-custom px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent"
            >
              A Better Trading Experience
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Built on trust, compliance, and client success
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              Choosing the right broker is a key investment decision. Right
              Vision Securities provides a trustworthy and secure trading
              environment, professional support, and access to a range of
              commodity futures markets for investors across Pakistan.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main features */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Why Choose Us
            </span>

            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Why trade with Right Vision
            </h2>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              The first and foremost factor in selecting a broker is the
              ability of the brokerage house to provide easy access to a
              trustworthy and secure trading environment across asset classes.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-xl border border-[#79ab19]/20 bg-gradient-to-br from-[#79ab19]/5 via-white to-[#79ab19]/10 p-5 shadow-lg transition-all duration-300 hover:shadow-2xl sm:rounded-2xl sm:p-6"
                >
                  <div className="absolute left-0 top-0 h-1 w-full bg-[#79ab19]" />

                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#79ab19]/20 blur-3xl" />

                  <div className="relative z-10">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#79ab19]/10 transition-colors duration-300 group-hover:bg-[#79ab19]/20">
                      <Icon className="h-5 w-5 text-[#79ab19]" />
                    </div>

                    <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground sm:text-base">
                      {feature.title}
                    </h3>

                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Investor benefits */}
      <section className="section-spacing bg-muted">
        <div className="container-custom px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Designed for Investors
              </span>

              <h2 className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
                Trade with confidence and clarity
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Whether you are new to commodity markets or an experienced
                trader, our brokerage services are structured to make market
                access clearer, safer, and more efficient.
              </p>

              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Speak with our team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-xl border border-[#79AB19]/20 bg-white p-5 sm:rounded-2xl sm:p-7"
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-[#79AB19]" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#79AB19]/10">
                    <CheckCircle className="h-5 w-5 text-[#79AB19]" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground sm:text-lg">
                      What you can expect
                    </h3>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Practical support for your trading journey
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {investorBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#79AB19]/10">
                        <CheckCircle className="h-3.5 w-3.5 text-[#79AB19]" />
                      </span>

                      <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to start trading?"
        description="Open an account with Right Vision Securities and access global commodity markets with professional support and regulatory protection."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
         secondaryCTA={{
    text: 'Open Account Online Now',
    href: 'https://www.aof.com.pk/?ODc0NTQ4NDE4Nzc3NzU3Mjc0ODU4MzIzNDY4NDcyNzM3MTI3NzQ4OQ==',
  }}
      />

      <Footer />
    </>
  )
}

export default WhyChooseUsPage