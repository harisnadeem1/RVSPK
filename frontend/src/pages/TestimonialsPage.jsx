import React from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import {
  Star,
  MapPin,
  Quote,
  Users,
  ShieldCheck,
  Headphones,
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

const testimonials = [
  {
    name: 'Ahmed Raza',
    location: 'Lahore, Pakistan',
    title: 'Excellent Trading Experience',
    text: 'Very professional service and smooth execution. I feel confident trading through Right Vision Securities.',
    initials: 'AR',
  },
  {
    name: 'Sara Khan',
    location: 'Karachi, Pakistan',
    title: 'Highly Trustworthy Platform',
    text: 'Transparent and reliable platform. Their support team is always responsive and helpful.',
    initials: 'SK',
  },
  {
    name: 'Usman Ali',
    location: 'Islamabad, Pakistan',
    title: 'Best Brokerage Service',
    text: 'One of the most trustworthy brokerage services I have used in Pakistan.',
    initials: 'UA',
  },
  {
    name: 'Hassan Tariq',
    location: 'Faisalabad, Pakistan',
    title: 'Smooth Account Setup',
    text: 'The account-opening process was smooth, simple, and well guided. Highly recommended.',
    initials: 'HT',
  },
  {
    name: 'Ayesha Malik',
    location: 'Multan, Pakistan',
    title: 'Professional Support',
    text: 'Clear communication and professional handling of client queries. The team is helpful and responsive.',
    initials: 'AM',
  },
  {
    name: 'Bilal Shah',
    location: 'Rawalpindi, Pakistan',
    title: 'Fast Execution',
    text: 'Excellent execution speed and proper risk-management support. The platform is convenient to use.',
    initials: 'BS',
  },
  {
    name: 'Nida Fatima',
    location: 'Lahore, Pakistan',
    title: 'Very Satisfied',
    text: 'Very satisfied with their services. Everything is transparent, organised, and well managed.',
    initials: 'NF',
  },
]

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'Regulated environment',
    description:
      'Trade through a brokerage operating under SECP and PMEX regulatory frameworks.',
  },
  {
    icon: Headphones,
    title: 'Client-focused support',
    description:
      'Get clear, responsive assistance throughout your account-opening and trading journey.',
  },
  {
    icon: Users,
    title: 'Built for investors',
    description:
      'Services designed to support both new and experienced commodity-market participants.',
  },
]

function TestimonialsPage() {
  return (
    <>
      <Helmet>
        <title>Client Testimonials — Right Vision Securities</title>
        <meta
          name="description"
          content="Read testimonials from traders and investors across Pakistan who have chosen Right Vision Securities for commodity and futures brokerage services."
        />
      </Helmet>

      <Navbar />

      <PageHero
        title="Client Testimonials"
        subtitle="Hear from traders and investors who choose Right Vision Securities for professional support and market access"
        backgroundImage="https://images.unsplash.com/photo-1556761175-b413da4baf72"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Client Testimonials' },
        ]}
      />

      {/* Introduction */}
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
              Client Experiences
            </span>

            <h1 className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
              Trusted by investors across Pakistan
            </h1>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Our clients value transparent processes, responsive guidance, and
              a reliable route to commodity and futures markets. Explore what
              they have shared about their experience with Right Vision
              Securities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Testimonials
            </span>

            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              What our clients say
            </h2>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Experiences shared by our clients from cities across Pakistan.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.article
                key={`${testimonial.name}-${testimonial.title}`}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-xl border border-[#79ab19]/20 bg-gradient-to-br from-[#79ab19]/5 via-white to-[#79ab19]/10 p-5 shadow-lg transition-all duration-300 hover:shadow-2xl sm:rounded-2xl sm:p-6"
              >
                {/* Green top line */}
                <div className="absolute left-0 top-0 h-1 w-full bg-[#79ab19]" />

                {/* Decorative glow */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#79ab19]/20 blur-3xl" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className="h-3.5 w-3.5 fill-[#79ab19] text-[#79ab19]"
                        />
                      ))}
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#79ab19]/10 transition-colors duration-300 group-hover:bg-[#79ab19]/20">
                      <Quote className="h-4 w-4 text-[#79ab19]" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground sm:text-base">
                    {testimonial.title}
                  </h3>

                  <blockquote className="mb-6 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    “{testimonial.text}”
                  </blockquote>

                  <div className="mb-4 h-px bg-[#79ab19]/20" />

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#79ab19]">
                      <span className="text-xs font-bold text-white">
                        {testimonial.initials}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-foreground sm:text-sm">
                        {testimonial.name}
                      </p>

                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="h-3 w-3 text-[#79ab19]" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust section */}
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
                Your Trading Partner
              </span>

              <h2 className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
                A brokerage relationship built on confidence
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Right Vision Securities aims to provide a clear and supportive
                experience from account opening through trading. Our team helps
                clients understand available services, market access, and the
                importance of informed decision-making.
              </p>

              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Contact our team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-4 sm:gap-5"
            >
              {trustPoints.map((point) => {
                const Icon = point.icon

                return (
                  <motion.div
                    key={point.title}
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-xl border border-[#79ab19]/20 bg-white p-5 shadow-sm sm:rounded-2xl sm:p-6"
                  >
                    <div className="absolute left-0 top-0 h-1 w-full bg-[#79ab19]" />

                    <div className="relative z-10 flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#79ab19]/10">
                        <Icon className="h-5 w-5 text-[#79ab19]" />
                      </div>

                      <div>
                        <h3 className="mb-1 text-sm font-semibold text-foreground sm:text-base">
                          {point.title}
                        </h3>

                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important risk disclosure */}
      <section className="bg-card py-8 sm:py-10">
        <div className="container-custom px-4 sm:px-6">
          <div className="mx-auto flex max-w-4xl items-start gap-3 rounded-xl border border-[#79AB19]/20 bg-[#79AB19]/5 p-4 sm:p-5">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#79AB19]" />

            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Testimonials reflect individual client experiences and do not
              guarantee future results. Commodity and futures trading involves
              risk and may not be suitable for every investor. Please ensure
              you understand the risks before trading.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to begin your trading journey?"
        description="Open an account with Right Vision Securities and access commodity futures markets with professional support and regulatory protection."
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

export default TestimonialsPage