import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';
import DynamicForm from '@/components/DynamicForm';
import { contactFormConfig } from '@/config/contactFormConfig';

function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call / Whatsapp',
      content: '+92 310 8248717',
      sub: 'Available during business hours',
      href: 'tel:+923108248717',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@rvspk.com',
      sub: 'We reply within 24 hours',
      href: 'mailto:hello@rvspk.com',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      content: '74-R, GCP Housing Society, JT',
      sub: 'Lahore, Punjab, Pakistan',
      href: 'https://maps.app.goo.gl/eDdUaHJdjvoNTtuW7',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon – Fri: 9:00 AM – 5:00 PM',
      sub: 'Saturday & Sunday: Closed',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Right Vision Securities</title>
        <meta
          name="description"
          content="Contact Right Vision Securities for commodity trading inquiries, account opening, or support. Phone, email and office in Johar Town, Lahore."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Contact us"
        subtitle="Get in touch with Right Vision Securities for inquiries, account opening, or support"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact' }
        ]}
      />

      {/* ── Contact Method Cards ── */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Reach Us
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              We're here to help
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Choose the most convenient way to get in touch with our team
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const Wrapper = method.href ? 'a' : 'div';
              const wrapperProps = method.href
                ? { href: method.href, target: '_blank', rel: 'noopener noreferrer' }
                : {};

              return (
                <motion.div key={index} variants={itemVariants} className="h-full">
                  <Wrapper
                    {...wrapperProps}
                    className="flex flex-col items-center text-center bg-card rounded-2xl p-6 border border-border/60 hover:border-accent/30 hover:shadow-md transition-all duration-300 group h-full"
                  >
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-2">
                      {method.title}
                    </p>
                    <p className="text-sm font-semibold text-foreground mb-1 leading-snug">
                      {method.content}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {method.sub}
                    </p>
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                Send a Message
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                We'll respond within 24 hours
              </h2>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Fill out the form below and a member of our team will get back to you as soon as possible.
              </p>

              {/* ↓ ONLY CHANGE: replaced the entire <form> block with this one line */}
              <DynamicForm config={contactFormConfig} />

            </motion.div>

            {/* RIGHT — Map Card — UNCHANGED */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 lg:sticky lg:top-28"
            >
              <div>
                <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                  Visit Our Office
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Reach us in Lahore
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We welcome clients to visit our office during business hours. No appointment needed for general inquiries.
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
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
                      href="tel:+923108248717"
                      className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground rounded-xl py-3 px-4 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      Call us
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

       
      <Footer />
    </>
  );
}

export default ContactPage;