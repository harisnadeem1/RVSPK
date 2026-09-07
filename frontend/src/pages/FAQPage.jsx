import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Minus,
  MessageCircle,
  Phone,
  Mail,
  ShieldAlert,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import TrustBar from '@/components/TrustBar.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import PageHero from '@/components/PageHero.jsx'
import CTASection from '@/components/CTASection.jsx'

const faqs = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How do I open an account with Right Vision Securities?',
        a: 'Opening an account is straightforward. Visit our website, complete the online registration form, submit your CNIC, bank account details, and required KYC documents. Once verified by our compliance team, your account is activated and ready to trade — typically within 1–2 business days.',
      },
      {
        q: 'What documents are required to register?',
        a: 'You will need a copy of your valid CNIC (front and back), a recent passport-size photograph, your bank account details for fund transfers, and proof of address where required. Corporate accounts may need additional documents such as an NTN and company registration certificates.',
      },
      {
        q: 'Is Right Vision Securities regulated?',
        a: 'Yes. Right Vision Securities (Pvt.) Limited is a licensed brokerage operating under the regulatory framework of the Securities and Exchange Commission of Pakistan (SECP) and follows all applicable rules and regulations governing commodity trading and securities in Pakistan.',
      },
    ],
  },
  {
    category: 'Trading & Markets',
    items: [
      {
        q: 'What markets and instruments can I trade?',
        a: 'We offer access to a range of global indices and commodity markets, including S&P 500, NASDAQ 100, Dow Jones, DAX 40, FTSE 100, Nikkei 225, Hang Seng, CAC 40, SENSEX, Gold, Crude Oil, and major Forex pairs. Available instruments and contract specifications may change, so please consult our team for current availability.',
      },
      {
        q: 'What trading platform does Right Vision Securities use?',
        a: 'We provide access to a professional trading platform with real-time market data, advanced charting tools, and order-execution features. Platform availability, functionality, and supported devices may vary by account and service arrangement.',
      },
      {
        q: 'What are the trading hours?',
        a: 'Trading hours vary by instrument and follow the underlying exchange schedules. Global indices follow their respective market hours, and commodity products may have different session times. Contact our team for the current schedule of the instrument you intend to trade.',
      },
    ],
  },
  {
    category: 'Funds & Payments',
    items: [
      {
        q: 'How do I deposit funds into my trading account?',
        a: 'Funds can be deposited through bank transfer to the designated company account, subject to applicable procedures and verification. Use your registered bank account wherever required to support smooth processing and AML/CFT compliance. Please contact the team for current deposit instructions before transferring funds.',
      },
      {
        q: 'How long do withdrawals take to process?',
        a: 'Withdrawal processing times depend on verification, banking procedures, and applicable compliance checks. Submit a withdrawal request through the approved channel, and contact our support team for the current expected processing timeline.',
      },
      {
        q: 'Are there fees or commissions on trades?',
        a: 'Our commission and fee structure depends on the instrument, account type, and applicable service terms. Contact our team at hello@rvspk.com or call 042-35191194 to request the applicable fee schedule before you trade.',
      },
    ],
  },
  {
    category: 'Risk & Compliance',
    items: [
      {
        q: 'What are the risks involved in trading?',
        a: 'Trading in commodities, indices, and foreign exchange carries substantial risk, including the potential loss of some or all invested capital. Markets can move rapidly, and past performance does not indicate future results. Read all risk disclosures, understand contract specifications, and consider independent financial advice before trading.',
      },
      {
        q: 'Does Right Vision Securities provide investment advice?',
        a: 'Right Vision Securities provides brokerage services. Information and market data provided through its channels are for general informational purposes and should not be treated as personalised investment advice. Clients remain responsible for their own trading and investment decisions.',
      },
    ],
  },
]

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-all duration-300 ${
        isOpen
          ? 'border-accent/30 bg-accent/5'
          : 'border-border/60 bg-card hover:border-accent/20'
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span
          className={`text-sm font-semibold leading-snug transition-colors duration-200 sm:text-base ${
            isOpen
              ? 'text-accent'
              : 'text-foreground group-hover:text-accent'
          }`}
        >
          {question}
        </span>

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? 'bg-accent text-accent-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
              <div className="mb-4 h-px bg-border/60" />
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQPage() {
  const [openIndex, setOpenIndex] = useState('0-0')
  const [activeCategory, setActiveCategory] = useState(0)

  const toggleFAQ = (key) => {
    setOpenIndex((previous) => (previous === key ? null : key))
  }

  const handleCategoryChange = (index) => {
    setActiveCategory(index)
    setOpenIndex(null)
  }

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions — Right Vision Securities</title>
        <meta
          name="description"
          content="Find answers about opening an account, trading markets, deposits, withdrawals, fees, risk disclosures, and compliance at Right Vision Securities."
        />
      </Helmet>

      
      <Navbar />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Helpful information about account opening, trading, funds, risk, and compliance"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Frequently Asked Questions' },
        ]}
      />

      {/* Intro */}
      <section className="section-spacing bg-muted">
        <div className="container-custom px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Support Centre
            </span>

            <h1 className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
              Answers to common questions
            </h1>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Browse commonly asked questions about Right Vision Securities,
              account registration, available services, fund processes, and
              important trading-risk considerations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Help & Information
            </span>

            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Find the information you need
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Select a topic, then expand a question to see its answer.
            </p>
          </div>

          {/* Category buttons */}
          <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10">
            {faqs.map((category, index) => (
              <button
                key={category.category}
                type="button"
                onClick={() => handleCategoryChange(index)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
                  activeCategory === index
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex flex-col gap-3"
              >
                {faqs[activeCategory].items.map((item, index) => {
                  const key = `${activeCategory}-${index}`

                  return (
                    <FAQItem
                      key={key}
                      question={item.q}
                      answer={item.a}
                      isOpen={openIndex === key}
                      onClick={() => toggleFAQ(key)}
                    />
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact help card */}
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
                Need More Help?
              </span>

              <h2 className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
                Our support team is here to assist
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                If your question is not listed here, contact our team for help
                with account procedures, documentation, service information, or
                general platform-related queries.
              </p>

              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Contact us
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
                    <MessageCircle className="h-5 w-5 text-[#79AB19]" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground sm:text-lg">
                      Contact Right Vision Securities
                    </h3>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Reach our team during business hours
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href="tel:+923108248717"
                    className="group flex items-start gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#79AB19]/10 transition-colors group-hover:bg-[#79AB19]/20">
                      <Phone className="h-4 w-4 text-[#79AB19]" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Phone / WhatsApp
                      </p>
                      <p className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                        +92 310 8248717
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@rvspk.com"
                    className="group flex items-start gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#79AB19]/10 transition-colors group-hover:bg-[#79AB19]/20">
                      <Mail className="h-4 w-4 text-[#79AB19]" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Email
                      </p>
                      <p className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                        hello@rvspk.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Risk notice */}
      <section className="bg-card py-8 sm:py-10">
        <div className="container-custom px-4 sm:px-6">
          <div className="mx-auto flex max-w-4xl items-start gap-3 rounded-xl border border-[#79AB19]/20 bg-[#79AB19]/5 p-4 sm:p-5">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#79AB19]" />

            <div>
              <p className="mb-1 text-sm font-semibold text-foreground">
                Important risk notice
              </p>

              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Commodity and futures trading involves risk and may not be
                suitable for all investors. Before trading, ensure you
                understand the product, contract specifications, margin
                requirements, and the possibility of financial loss.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to start your trading journey?"
        description="Open an account with Right Vision Securities and access commodity markets with professional support and regulatory protection."
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

export default FAQPage