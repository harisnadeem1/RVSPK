import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'

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
        a: 'You will need a copy of your valid CNIC (front & back), a recent passport-size photograph, your bank account details (for fund transfers), and proof of address if required. Corporate accounts may need additional documentation such as NTN and company registration certificates.',
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
        a: 'We offer access to a range of global indices and commodity markets including S&P 500, NASDAQ 100, Dow Jones, DAX 40, FTSE 100, Nikkei 225, Hang Seng, CAC 40, SENSEX, Gold, Crude Oil, and major Forex pairs. Our platform is designed to give Pakistani investors exposure to world markets.',
      },
      {
        q: 'What trading platform does Right Vision Securities use?',
        a: 'We provide access to a professional trading platform with real-time market data, advanced charting tools, and seamless order execution. Our platform is accessible via web browser and is optimised for both desktop and mobile devices so you can trade from anywhere.',
      },
      {
        q: 'What are the trading hours?',
        a: 'Trading hours vary by instrument and follow the underlying exchange schedules. Global indices such as S&P 500 and NASDAQ trade during US market hours, while European indices follow their respective exchanges. Our support team is available during Pakistani business hours to assist with any queries.',
      },
    ],
  },
  {
    category: 'Funds & Payments',
    items: [
      {
        q: 'How do I deposit funds into my trading account?',
        a: 'Funds can be deposited via bank transfer directly to our designated company account. Once your transfer is confirmed, your trading balance is updated promptly. We recommend always using your registered bank account to ensure smooth processing and compliance with AML regulations.',
      },
      {
        q: 'How long do withdrawals take to process?',
        a: 'Withdrawal requests are processed within 1–3 business days, subject to verification. Funds are transferred directly to your registered bank account. We recommend submitting withdrawal requests during business hours for the fastest turnaround.',
      },
      {
        q: 'Are there any fees or commissions on trades?',
        a: 'Our commission and fee structure is transparent and competitive. Applicable charges depend on the instrument traded and your account type. Please contact our team at hello@rvspk.com or call 042-35191194 for a detailed fee schedule tailored to your trading activity.',
      },
    ],
  },
  {
    category: 'Risk & Compliance',
    items: [
      {
        q: 'What are the risks involved in trading?',
        a: 'Trading in commodities, indices, and forex carries significant risk, including the potential loss of your entire invested capital. Market prices can be highly volatile and past performance is not indicative of future results. We strongly advise all clients to read our full disclaimer, understand the risks, and consult a financial advisor before trading.',
      },
      {
        q: 'Does Right Vision Securities provide investment advice?',
        a: 'No. Right Vision Securities provides brokerage execution services only. The information and market data on our website are for general informational purposes and do not constitute personalised investment advice. All trading decisions remain solely the responsibility of the client.',
      },
    ],
  },
]

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div
      className={`border border-border/60 rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'bg-accent/5 border-accent/30' : 'bg-card hover:border-border'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${
            isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'
          }`}
        >
          {q}
        </span>
        <span
          className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-accent text-accent-foreground rotate-0'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
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
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
              <div className="h-px bg-border/60 mb-4" />
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null) // "catIdx-itemIdx"
  const [activeCategory, setActiveCategory] = useState(0)

  const toggle = (key) => setOpenIndex(prev => (prev === key ? null : key))

  return (
    <section className="section-spacing bg-background">
      <div className="container-custom px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Support
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Frequently asked questions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Everything you need to know about trading with Right Vision Securities.
            Can't find your answer?{' '}
            <Link to="/contact" className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity">
              
                Contact us
              
            </Link>
            .
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {faqs.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => { setActiveCategory(idx); setOpenIndex(null) }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeCategory === idx
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col gap-3"
            >
              {faqs[activeCategory].items.map((item, idx) => {
                const key = `${activeCategory}-${idx}`
                return (
                  <FAQItem
                    key={key}
                    q={item.q}
                    a={item.a}
                    isOpen={openIndex === key}
                    onClick={() => toggle(key)}
                  />
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        

      </div>
    </section>
  )
}