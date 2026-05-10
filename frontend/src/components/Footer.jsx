import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  const aboutLinks = [
    { label: 'Introduction', path: '/about' },
    { label: 'Company Profile', path: '/company-profile' },
    { label: "BOD's Profile", path: '/about/board' },
    { label: 'Name of Auditor', path: '/about/auditors' },
    { label: 'Name of Legal Advisor', path: '/about/legal' },
  ]

  const clientLinks = [
    { label: 'No Cash Policy', path: '/clients/no-cash-policy' },
    { label: 'Account Opening Guide', path: '/clients/account-opening-guide' },
    { label: 'Commission Structure', path: '/clients/commission-structure' },
    { label: 'PMEX Fee Sheet', path: '/clients/pmex-fee-criteria' },
    { label: 'Guide to Futures Trading', path: '/clients/guide-futures-pmex' },
    { label: 'Client Complaint Process', path: '/clients/complaint-process' },
  ]

  const policyLinks = [
    { label: 'Privacy Policy', path: '/policies/privacy-policy' },
    { label: 'Customer Grievances Redressal', path: '/policies/customer-grievances-redressal' },
    { label: 'Risk Management Policy', path: '/policies/risk-management' },
    { label: 'CDD / KYC Policy', path: '/policies/cdd-kyc' },
    { label: 'Whistleblowing Policy', path: '/policies/whistleblowing' },
    { label: 'Conflict of Interest Policy', path: '/policies/conflict-of-interest' },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">

      {/* Main footer body */}
      <div className="container-custom py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

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

            {/* About blurb */}
            <p className="text-sm text-primary-foreground/75 leading-relaxed mb-6 max-w-sm">
              Right Vision Securities (Pvt.) Limited is a SECP regulated Futures Broker
              and PMEX licensed firm — dedicated to providing efficient, transparent, and
              reliable brokerage services in commodity and futures trading across Pakistan.
            </p>

            {/* Contact details */}
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+923108248717"
                  className="flex items-start gap-3 group"
                >
                  <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-primary-foreground/10 group-hover:bg-accent/20 transition-colors mt-0.5">
                    <Phone className="h-3.5 w-3.5 text-accent" />
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
                    <Mail className="h-3.5 w-3.5 text-accent" />
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
                    <MapPin className="h-3.5 w-3.5 text-accent" />
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
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/50 mb-4">
              About Us
            </h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Col 3 — Client Area ── */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/50 mb-4">
              Client Area
            </h3>
            <ul className="space-y-2.5">
              {clientLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4 — Policies ── */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/50 mb-4">
              Policies
            </h3>
            <ul className="space-y-2.5">
              {policyLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Reports quick link */}
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/50 mb-4 mt-8">
              Reports
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/reports"
                  className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                >
                 Daily & Monthly Reports
                </Link>
              </li>
              
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-primary-foreground/15" />

      {/* Regulatory disclaimer */}
      <div className="container-custom py-5">
        <p className="text-xs text-primary-foreground/50 leading-relaxed text-center">
          Right Vision Securities (Pvt.) Limited is licensed by the Securities & Exchange
          Commission of Pakistan (SECP) as a Futures Broker (Licence No. BRC-406) and holds
          a Trading Right Entitlement Certificate (TREC No. 037) from Pakistan Mercantile
          Exchange (PMEX). Trading in commodity futures involves substantial risk and may not
          be suitable for all investors. Past performance is not indicative of future results.
          Please ensure you fully understand the risks before trading.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-primary-foreground/15" />

      {/* Bottom bar */}
      <div className="container-custom py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-xs text-primary-foreground/50 text-center sm:text-left">
            © {currentYear} Right Vision Securities (Pvt.) Limited. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
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
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer