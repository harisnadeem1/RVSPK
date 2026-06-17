// src/components/HeroSection.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MarketCarousel from '@/components/MarketCarousel'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-card">

      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[350px] h-[350px] lg:w-[550px] lg:h-[550px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[280px] h-[280px] lg:w-[450px] lg:h-[450px] rounded-full bg-primary/8 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-20 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left order-1"
          >
            <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-accent font-semibold mb-3 sm:mb-4">
              Invest with Right Vision
            </p>

            <h1 className="text-foreground font-extrabold leading-[1.08] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
              Trade Smarter with{' '}
              <span className="text-accent">Right Vision</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-muted-foreground text-sm sm:text-base lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Trade global commodities like Gold, Oil, Silver and Indices with a
              fully regulated and licensed platform.
            </p>

            {/* Divider accent line */}
            <div className="mt-6 sm:mt-8 w-12 h-[3px] rounded-full bg-accent mx-auto lg:mx-0" />

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="https://www.aof.com.pk/?ODc0NTQ4NDE4Nzc3NzU3Mjc0ODU4MzIzNDY4NDcyNzM3MTI3NzQ4OQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-7 py-5 text-sm font-semibold shadow-md shadow-accent/20 transition-all">
                  Open Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a
  href="https://wa.me/923108248717"
  target="_blank"
  rel="noopener noreferrer"
  className="w-full sm:w-auto"
>
  <Button
    variant="outline"
    className="w-full sm:w-auto border-border text-foreground hover:bg-primary px-7 py-5 text-sm font-medium transition-all"
  >
    Contact on WhatsApp
  </Button>
</a>
            </div>
          </motion.div>

          {/* RIGHT CAROUSEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center order-2"
          >
            <MarketCarousel />
          </motion.div>

        </div>
      </div>
    </section>
  )
}