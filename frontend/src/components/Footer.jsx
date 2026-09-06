import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  const investorResourceLinks = [
  {
    label: 'Investor Grievance Redressal at PMEX',
    href: 'https://pmex.com.pk/investor-complaints/',
  },
  {
    label: 'PMEX Guide to Futures Trading',
    href: 'https://pmex.com.pk/wp-content/uploads/2025/11/Futures-Trading-Guide-Updated.pdf',
  },
  {
    label: 'SECP Complaint (Service Desk Management System)',
    href: 'https://sdms.secp.gov.pk/',
    image: '/footer/secp-sdms.png',
    imageAlt: 'SECP Service Desk Management System',
  },
]

  const tradingPlatformLinks = [
    {
      label: 'MetaTrader 5 for macOS',
      href: 'https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.dmg',
    },
    {
      label: 'MetaTrader 5 for Windows',
      href: 'https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe',
    },
    {
      label: 'MetaTrader 5 for iOS',
      href: 'https://download.terminal.free/cdn/mobile/mt5/ios',
    },
    {
      label: 'MetaTrader 5 for Android',
      href: 'https://download.terminal.free/cdn/mobile/mt5/android',
    },
  ]

  const quickLinks = [
    {
      label: 'Why Choose Us',
      path: '/why-choose-us',
    },
    {
      label: 'Client Testimonials',
      path: '/testimonials',
    },
    {
      label: 'FAQs',
      path: '/faqs',
    },
    {
      label: 'Contact Us',
      path: '/contact',
    },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer body */}
      <div className="w-full px-4 py-14 sm:px-6 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand + Contact */}
          <div className="lg:col-span-4">
            <Link to="/" className="mb-5 inline-flex items-center">
              <img
                src="/rvspk_logo.png"
                alt="Right Vision Securities"
                className="h-20 w-auto brightness-0 invert"
              />
            </Link>

            {/* <p className="mb-6 max-w-sm text-base leading-relaxed text-primary-foreground/50">
              Right Vision Securities (Pvt.) Limited is a SECP-licensed and
              PMEX-registered futures brokerage company associated with the
              Right Vision Group (est. 2007). We provide transparent,
              reliable, and efficient brokerage services across commodity and
              financial markets in Pakistan, with a focus on integrity,
              compliance, and client success.
            </p> */}

            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+923108248717"
                  className="group flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors group-hover:bg-accent/20">
                    <Phone className="h-5 w-5 text-stone-50" />
                  </div>

                  <div>
                    <div className="text-base font-medium text-primary-foreground transition-colors group-hover:text-accent">
                      +92 310 8248717
                    </div>
                    <div className="text-base text-primary-foreground/55">
                      Call / WhatsApp · Business hours
                    </div>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="mailto:hello@rvspk.com"
                  className="group flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors group-hover:bg-accent/20">
                    <Mail className="h-5 w-5 text-stone-50" />
                  </div>

                  <div>
                    <div className="text-base font-medium text-primary-foreground transition-colors group-hover:text-accent">
                      hello@rvspk.com
                    </div>
                    <div className="text-base text-primary-foreground/55">
                      We reply within 24 hours
                    </div>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="https://maps.app.goo.gl/eDdUaHJdjvoNTtuW7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors group-hover:bg-accent/20">
                    <MapPin className="h-5 w-5 text-stone-50" />
                  </div>

                  <div>
                    <div className="text-base font-medium text-primary-foreground transition-colors group-hover:text-accent">
                      74-R, GCP Housing Society, Johar Town
                    </div>
                    <div className="text-base text-primary-foreground/55">
                      Lahore, Punjab, Pakistan
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-[0.18em] text-primary-foreground">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-base text-primary-foreground/50 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Reports */}
            <h3 className="mb-4 mt-8 text-lg font-semibold uppercase tracking-widest text-primary-foreground">
              Reports
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/reports"
                  className="text-base text-primary-foreground/50 transition-colors hover:text-accent"
                >
                  Daily &amp; Monthly Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Investor Resources */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-[0.18em] text-primary-foreground">
              Investor Resources
            </h3>

           

         <ul className="space-y-4">
  {investorResourceLinks.map((link) => (
    <li key={link.href}>
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {/* Text link */}
        <div className="flex items-start gap-3 text-base text-primary-foreground/60 transition-colors group-hover:text-accent">

          <span className="leading-relaxed">{link.label}</span>
        </div>

        {/* Full-width clickable image */}
        {link.image && (
          <img
            src={link.image}
            alt={link.imageAlt}
            loading="lazy"
            className="mt-3 block h-auto w-full object-contain transition-opacity duration-300 group-hover:opacity-85"
          />
        )}
      </a>
    </li>
  ))}
</ul>
          </div>

          {/* MT Trading Platforms */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-[0.18em] text-primary-foreground">
              MT Trading Platforms
            </h3>

            <ul className="space-y-3">
              {tradingPlatformLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-primary-foreground/50 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-primary-foreground/15" />

      {/* Regulatory disclaimer */}
      <div className="container-custom py-5">
        <p className="text-center text-xs leading-relaxed text-primary-foreground/50">
          Right Vision Securities (Pvt.) Limited is a SECP licensed Futures
          Broker (BRC-406) and PMEX registered Trading Right Entitlement
          Certificate holder (TREC #037). All trading involves risk and may
          not be suitable for all investors. Past performance is not indicative
          of future results. Clients are advised to fully understand the risks
          before participating in futures and commodity trading.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-primary-foreground/15" />

      {/* Bottom bar */}
      <div className="container-custom py-5">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <p className="text-center text-xs text-primary-foreground/50 sm:text-left">
            © 2025 - {currentYear} Right Vision Securities (Pvt.) Limited. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer