import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle, Shield, Key, Wallet, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

function HowToOpenAccount({ 
  heading = "How to open your account",
  subheading = "Open your account digitally in a few simple steps and start trading with ease.",
  steps = [
    {
      number: 1,
      icon: FileText,
      title: "Fill in your details",
      description: "Fill in your personal and banking details."
    },
    {
      number: 2,
      icon: Upload,
      title: "Upload documents",
      description: "Upload your CNIC and review your information."
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Submit application",
      description: "Accept the terms and submit your application."
    },
    {
      number: 4,
      icon: Shield,
      title: "Verify account",
      description: "Verify your account using the OTP sent to you."
    },
    {
      number: 5,
      icon: Key,
      title: "Receive credentials",
      description: "Receive your PMEX trading credentials after approval."
    },
    {
      number: 6,
      icon: Wallet,
      title: "Fund and trade",
      description: "Deposit funds through 1Bill and start trading on WebTrade or MT5."
    }
  ],
  primaryCTA = { text: "Open account now", href: "/contact" },
  secondaryCTA = { text: "Learn more", href: "/about" },
  infoNote = "Once your account is created, you can fund it through your bank's online bill payment and start trading right away."
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <section className="py-14 sm:py-20 md:py-24 bg-card">
      <div className="container-custom px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            {heading}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Step number badge */}
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <step.icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-accent" aria-hidden="true" />
                </div>
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm sm:text-base">{step.number}</span>
                </div>
              </div>

              {/* Step content */}
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <div className="bg-accent/5 border-l-4 border-accent rounded-xl p-4 sm:p-5 md:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Info className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-accent" aria-hidden="true" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed flex-1">
                {infoNote}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
        >
          <Link to={primaryCTA.href} className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold transition-all hover:-translate-y-0.5"
            >
              {primaryCTA.text}
            </Button>
          </Link>
          <Link 
            to={secondaryCTA.href}
            className="text-accent hover:text-accent/80 font-semibold text-sm sm:text-base transition-colors"
          >
            {secondaryCTA.text} →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default HowToOpenAccount;