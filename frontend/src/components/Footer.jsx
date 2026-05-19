import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  const aboutLinks = [
    { label: 'Introduction', path: '/introduction' },
    { label: 'Mission and Vision', path: '/mission-vision' },
    { label: 'Company Profile', path: '/company-profile' },
    { label: "BOD's Profile", path: '/about/board' },
    { label: 'Name of Auditor', path: '/about/auditors' },
    { label: 'Name of Legal Advisor', path: '/about/legal' },
    { label: 'Management', path: '/about/management' },
  ]

  const clientLinks = [
    { label: 'No Cash Policy', path: '/clients/no-cash-policy' },
    { label: "Guidelines for Clients — Do's & Don'ts", path: '/clients/guidelines-clients' },
    { label: 'Account Opening Guide', path: '/clients/account-opening-guide' },
    { label: 'Direct Funds Model (DFM) User Manual', path: '/clients/dfm-user-manual' },
    { label: 'PMEX Investor Guide', path: '/clients/pmex-guidelines-dfm' },
    { label: 'Guide to Futures Trading at PMEX', path: '/clients/guide-futures-pmex' },
    { label: 'PMEX Fee Sheet', path: '/clients/pmex-fee-criteria' },
    { label: 'Commission Structure', path: '/clients/commission-structure' },
    { label: 'Client Complaint Process', path: '/clients/complaint-process' },
    { label: 'Diagram — Grievance Redressal', path: '/clients/diagram-redressal' },
  ]

  const policyLinks = [
    { label: 'Privacy Policy', path: '/policies/privacy-policy' },
    { label: 'Customer Grievances Redressal', path: '/policies/customer-grievances-redressal' },
    { label: 'Risk Management Policy', path: '/policies/risk-management' },
    { label: 'CDD / KYC Policy', path: '/policies/cdd-kyc' },
    { label: 'Whistleblowing Policy', path: '/policies/whistleblowing' },
    { label: 'Conflict of Interest Policy', path: '/policies/conflict-of-interest' },
  ]

  const formsLinks = [
    { label: 'Contact Us', path: '/contact' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Complaint Registration', path: '/complaint' },
    { label: 'Client Grievance', path: '/grievance' },
    { label: 'Whistleblower', path: '/whistleblower' },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">

      {/* Main footer body */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-14 sm:py-16">
        <div className="flex flex-wrap justify-around gap-y-12 gap-x-10 lg:gap-x-16">

          {/* ── Col 1 — Brand + Contact ── */}
          <div className="sm:col-span-2 lg:col-span-4">

            {/* Logo */}
            <Link to="/" className="inline-flex items-center mb-5">
              <img
                src="/rvspk_logo.png"
                alt="Right Vision Securities"
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>

            <p className="text-sm text-primary-foreground/50 leading-relaxed mb-6 max-w-sm">
              Right Vision Securities (Pvt.) Limited is a SECP-licensed and PMEX-registered futures brokerage company
              associated with the Right Vision Group (est. 2007). We provide transparent, reliable, and efficient
              brokerage services across commodity and financial markets in Pakistan, with a focus on integrity,
              compliance, and client success.
            </p>

            {/* Contact details */}
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+923108248717"
                  className="flex items-start gap-3 group"
                >
                  <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-primary-foreground/10 group-hover:bg-accent/20 transition-colors mt-0.5">
                    <Phone className="h-3.5 w-3.5 text-stone-50" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary-foreground group-hover:text-accent transition-colors">
                      +92 310 8248717
                    </div>
                    <div className="text-xs text-primary-foreground/55">Call / WhatsApp · Business hours</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@rvspk.com"
                  className="flex items-start gap-3 group"
                >
                  <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-primary-foreground/10 group-hover:bg-accent/20 transition-colors mt-0.5">
                    <Mail className="h-3.5 w-3.5 text-stone-50" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary-foreground group-hover:text-accent transition-colors">
                      hello@rvspk.com
                    </div>
                    <div className="text-xs text-primary-foreground/55">We reply within 24 hours</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/eDdUaHJdjvoNTtuW7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-primary-foreground/10 group-hover:bg-accent/20 transition-colors mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-stone-50" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary-foreground group-hover:text-accent transition-colors">
                      74-R, GCP Housing Society, Johar Town
                    </div>
                    <div className="text-xs text-primary-foreground/55">Lahore, Punjab, Pakistan</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* ── Col 2 — About ── */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground mb-4">
              About Us
            </h3>
            <ul className="space-y-2 mt-1">
              {aboutLinks.map((link, i) => (
                <li key={i}>
                  <Link Area
                    to={link.path}
                    className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground mb-4 mt-8">
              MT Trading Platforms
            </h3>

            <ul className="space-y-2 mt-1">
              <li>
                <a
                  href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.dmg"
                  target=""
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                >
                  Metatrader 5 for MacOS
                </a>
              </li>
              <li>
                <a
                  href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe"
                  target=""
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                >
                  Metatrader 5 for Windows
                </a>
              </li>
              <li>
                <a
                  href="https://download.terminal.free/cdn/mobile/mt5/ios"
                  target=""
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                >
                 Metatrader 5 for iOS
                </a>
              </li>
              <li>
                <a
                  href="https://download.terminal.free/cdn/mobile/mt5/android"
                  target=""
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                >
                 Metatrader 5 for Android
                </a>
              </li>
            </ul>
          </div>

          {/* ── Col 3 — Client Area ── */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground mb-4">
              Client Area
            </h3>
            <ul className="space-y-2 mt-1">
              {clientLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground mb-4 mt-8">
              Reports
            </h3>

            <ul className="space-y-2 mt-1">
              <li>
                <Link
                  to="/reports"
                  className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                >
                  Daily & Monthly Reports
                </Link>
              </li>
            </ul>
          </div>


          {/* ── Col 4 — Policies ── */}
          <div className="lg:col-span-3">
            {/* Policies */}
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground mb-4">
              Policies
            </h3>

            <ul className="space-y-2 mt-1">
              {policyLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Forms */}
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground mb-4 mt-8">
              Forms
            </h3>

            <ul className="space-y-2 mt-1">
              {[
                { label: 'Contact Us', path: '/contact' },
                { label: 'Feedback', path: '/feedback' },
                { label: 'Complaint Registration', path: '/complaint' },
                { label: 'Client Grievance', path: '/grievance' },
                { label: 'Whistleblower', path: '/whistleblower' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/50 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
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
        <p className="text-xs text-primary-foreground/50 leading-relaxed text-center">
          Right Vision Securities (Pvt.) Limited is a SECP licensed Futures Broker (BRC-406)
          and PMEX registered Trading Right Entitlement Certificate holder (TREC #037). All
          trading involves risk and may not be suitable for all investors. Past performance
          is not indicative of future results. Clients are advised to fully understand the
          risks before participating in futures and commodity trading.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-primary-foreground/15" />

      {/* Bottom bar */}
      <div className="container-custom py-5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Copyright */}
          <p className="text-xs text-primary-foreground/50 text-center sm:text-left">
            © {currentYear} Right Vision Securities (Pvt.) Limited. All rights reserved.
          </p>

          {/* Social links */}
          {/* <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923108248717"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary-foreground/10 text-primary-foreground/60 hover:bg-accent/20 hover:text-accent transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary-foreground/10 text-primary-foreground/60 hover:bg-accent/20 hover:text-accent transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary-foreground/10 text-primary-foreground/60 hover:bg-accent/20 hover:text-accent transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary-foreground/10 text-primary-foreground/60 hover:bg-accent/20 hover:text-accent transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div> */}

        </div>
      </div>

    </footer>
  )
}

export default Footer