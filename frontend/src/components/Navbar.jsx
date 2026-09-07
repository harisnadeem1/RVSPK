import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, UserPlus } from 'lucide-react'

import DropdownMenu from '@/components/DropdownMenu.jsx'
import MegaMenu from '@/components/MegaMenu.jsx'
import MobileNavAccordion from '@/components/MobileNavAccordion.jsx'
import ComplianceStrip from '@/components/ComplianceStrip.jsx'
import TrustBar from '@/components/TrustBar.jsx'
import { Button } from '@/components/ui/button.jsx'

function Navbar() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [isScrolled, setIsScrolled] = useState(false)
const [headerHeight, setHeaderHeight] = useState(0)
const headerRef = useRef(null)
const location = useLocation()

  useEffect(() => {
  const updateHeaderState = () => {
    setIsScrolled(window.scrollY > 20)

    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }

  updateHeaderState()

  window.addEventListener('scroll', updateHeaderState, { passive: true })
  window.addEventListener('resize', updateHeaderState)

  return () => {
    window.removeEventListener('scroll', updateHeaderState)
    window.removeEventListener('resize', updateHeaderState)
  }
}, [])

  const isActive = (path) => location.pathname === path

  const isActiveSection = (paths) =>
    paths.some((path) => location.pathname.startsWith(path))

  const formsItems = [
    { label: 'Contact Us', path: '/contact' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Complaint Registration', path: '/complaint' },
    { label: 'Client Grievance', path: '/grievance' },
    { label: 'Whistleblower', path: '/whistleblower' },
  ]

  const aboutItems = [
    { label: 'Introduction', path: '/introduction' },
    { label: 'Mission and Vision', path: '/mission-vision' },
    { label: 'Company Profile', path: '/company-profile' },
    {
      label: 'Governance',
      children: [
        { label: "BOD's Profile", path: '/about/board' },
        { label: 'Name of Auditor', path: '/about/auditors' },
        { label: 'Name of Legal Advisor', path: '/about/legal' },
      ],
    },
    { label: 'Management', path: '/about/management' },
  ]

  const marketSections = [
    {
      title: 'Metal',
      items: [
        {
          label: 'Platinum',
          path: 'https://pmex.com.pk/products/metal/platinum/',
        },
        {
          label: 'Palladium',
          path: 'https://pmex.com.pk/products/metal/palladium/',
        },
        {
          label: 'Aluminium',
          path: 'https://pmex.com.pk/products/metal/aluminium/',
        },
        {
          label: 'Gold Milli Ounce',
          path: 'https://pmex.com.pk/products/metal/gold-milli-ounce/',
        },
        {
          label: 'Silver',
          path: 'https://pmex.com.pk/products/metal/silver/',
        },
        {
          label: 'Copper',
          path: 'https://pmex.com.pk/products/metal/copper/',
        },
        {
          label: 'Gold',
          path: 'https://pmex.com.pk/products/metal/gold/',
        },
      ],
    },
    {
      title: 'Agriculture',
      items: [
        {
          label: 'Rice',
          path: 'https://pmex.com.pk/products/agriculture/rice/',
        },
        {
          label: 'Sugar',
          path: 'https://pmex.com.pk/products/agriculture/sugar/',
        },
        {
          label: 'Wheat',
          path: 'https://pmex.com.pk/products/agriculture/wheat/',
        },
        {
          label: 'Soybean',
          path: 'https://pmex.com.pk/products/agriculture/soybean/',
        },
        {
          label: 'Cotton',
          path: 'https://pmex.com.pk/products/agriculture/cotton/',
        },
        {
          label: 'Corn',
          path: 'https://pmex.com.pk/products/agriculture/corn/',
        },
      ],
    },
    {
      title: 'Energy',
      items: [
        {
          label: 'Natural Gas',
          path: 'https://pmex.com.pk/products/energy/natural-gas/',
        },
        {
          label: 'Crude Oil',
          path: 'https://pmex.com.pk/products/energy/crude-oil/',
        },
        {
          label: 'Brent Crude Oil',
          path: 'https://pmex.com.pk/products/energy/brent-crude-oil/',
        },
      ],
    },
    {
      title: 'Financials',
      items: [
        {
          label: 'Indices',
          path: 'https://pmex.com.pk/products/financials/indices/',
        },
      ],
    },
  ]

  const aboutMobileItems = aboutItems

  const marketMobileItems = marketSections.map((section) => ({
    label: section.title,
    children: section.items.map((item) => ({
      label: item.label,
      path: item.path,
      external: true,
    })),
  }))

  const policyItems = [
    { label: 'Privacy Policy', path: '/policies/privacy-policy' },
    {
      label: 'Customer Grievances Redressal Policy',
      path: '/policies/customer-grievances-redressal',
    },
    {
      label: 'Risk Management Policy',
      path: '/policies/risk-management',
    },
    {
      label: 'CDD / KYC Policy & Procedure',
      path: '/policies/cdd-kyc',
    },
    {
      label: 'Whistleblowing Policy & Procedure',
      path: '/policies/whistleblowing',
    },
    {
      label: 'Conflict of Interest Policy',
      path: '/policies/conflict-of-interest',
    },
  ]

  const clientAreaItems = [
    { label: 'No Cash Policy', path: '/clients/no-cash-policy' },
    {
      label: "Guidelines for Clients — Do's & Don'ts",
      path: '/clients/guidelines-clients',
    },
    {
      label: 'Account Opening Guide',
      path: '/clients/account-opening-guide',
    },
    {
      label: 'Direct Funds Model (DFM) User Manual',
      path: '/clients/dfm-user-manual',
    },
    {
      label: 'PMEX Investor Guide',
      path: '/clients/pmex-guidelines-dfm',
    },
    {
      label: 'Guide to Futures Trading at PMEX',
      path: '/clients/guide-futures-pmex',
    },
    {
      label: 'PMEX Fee Sheet',
      path: '/clients/pmex-fee-criteria',
    },
    {
      label: 'Commission Structure',
      path: '/clients/commission-structure',
    },
    {
      label: 'Client Complaint Process',
      path: '/clients/complaint-process',
    },
    {
      label: 'Diagram — Grievance Redressal',
      path: '/clients/diagram-redressal',
    },
    {
      label: 'Model of Funds Transfer',
      path: '/clients/model-funds-transfer',
    },
    {
      label: 'Sahulat Account Guidelines',
      path: '/clients/sahulat-account-guidelines',
    },
    {
      label: 'Step-by-Step Guidelines',
      path: '/clients/step-by-step-guidelines',
    },
  ]

  return (
    <>
      {/* 
        This complete header stays sticky.
        At top: TrustBar + Navbar + ComplianceStrip
        On scroll: only Navbar remains.
      */}
      <header
  ref={headerRef}
  className="fixed left-0 top-0 z-50 w-full"
>
        {/* Top Trust Bar */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'
          }`}
        >
          <TrustBar />
        </div>

        {/* Main Navbar: always visible */}
        <nav
          className={`border-b border-border/60 bg-card/95 backdrop-blur-xl transition-shadow duration-300 ${
            isScrolled ? 'shadow-lg shadow-black/10' : ''
          }`}
        >
          <div className="w-full px-6 2xl:px-10">
            {/* Mobile Header */}
            <div className="grid h-20 grid-cols-[44px_1fr_auto] items-center gap-2 sm:h-24 xl:hidden">
              {/* Hamburger */}
              <div className="flex shrink-0 justify-start">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition hover:bg-muted"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>

              {/* Logo */}
              <div className="flex min-w-0 justify-center">
                <Link to="/" className="flex items-center">
                  <img
                    src="/rvspk_logo.png"
                    alt="Right Vision Securities"
                    className="h-18 w-auto max-w-[170px] object-contain sm:h-20"
                  />
                </Link>
              </div>

              {/* Demo Account Icon */}
              <div className="flex shrink-0 justify-end">
                <a
                  href="https://www.aof.com.pk/?ODc0NTQ4NDE4Nzc3NzU3Mjc0ODU4MzIzNDY4NDcyNzM3MTI3NzQ4OQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Demo Account Online"
                  title="Open Demo Account"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  <UserPlus className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden h-28 w-full items-center justify-around gap-8 xl:flex 2xl:h-32">
              {/* Logo */}
              <Link to="/" className="flex shrink-0 items-center">
                <img
                  src="/rvspk_logo.png"
                  alt="Right Vision Securities"
                  className="h-[92px] w-auto object-contain 2xl:h-[108px]"
                />
              </Link>

              {/* Desktop Links */}
              <div className="flex w-full items-center justify-center px-10">
                <div className="flex items-center gap-5 text-[15px] 2xl:gap-7">
                  <Link
                    to="/"
                    className={`whitespace-nowrap font-medium transition-colors ${
                      isActive('/')
                        ? 'text-accent'
                        : 'text-foreground hover:text-accent'
                    }`}
                  >
                    Home
                  </Link>

                  <DropdownMenu
                    label="About Us"
                    items={aboutItems}
                    isActive={isActiveSection([
                      '/about',
                      '/introduction',
                      '/mission-vision',
                      '/company-profile',
                    ])}
                  />

                  <MegaMenu
                    label="Products"
                    sections={marketSections}
                    isActive={isActiveSection(['/markets'])}
                  />

                  <DropdownMenu
                    label="Policies"
                    items={policyItems}
                    isActive={isActiveSection(['/policies'])}
                  />

                  <DropdownMenu
                    label="Client Area"
                    items={clientAreaItems}
                    isActive={isActiveSection(['/clients'])}
                  />

                  <DropdownMenu
                    label="Forms"
                    items={formsItems}
                    isActive={isActiveSection([
                      '/contact',
                      '/feedback',
                      '/complaint',
                      '/grievance',
                      '/whistleblower',
                    ])}
                  />

                  <Link
                    to="/reports"
                    className={`whitespace-nowrap font-medium transition-colors ${
                      isActive('/reports')
                        ? 'text-accent'
                        : 'text-foreground hover:text-accent'
                    }`}
                  >
                    Reports
                  </Link>
                </div>
              </div>

              {/* Desktop CTAs */}
              <div className="flex flex-col items-stretch gap-2">
                <Link to="/book-online-session" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Book an Online Session
                  </Button>
                </Link>

                <a
                  href="https://demotrade.pmex.com.pk/terminal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Open Demo Account Online
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom Compliance Strip */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
          }`}
        >
          <ComplianceStrip />
        </div>
      </header>

      <div
  aria-hidden="true"
  style={{ height: `${headerHeight}px` }}
  className="w-full"
/>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden ${
          mobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed left-0 top-0 z-[70] flex h-screen w-[85%] max-w-[320px] flex-col border-r border-border bg-card shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="/rvspk_logo.png"
              alt="Right Vision Securities"
              className="h-28 w-auto"
            />
          </Link>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 text-[18px] font-medium transition-colors ${
                isActive('/')
                  ? 'bg-accent/10 text-accent'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              Home
            </Link>

            <MobileNavAccordion
              label="About Us"
              items={aboutMobileItems}
              onItemClick={() => setMobileMenuOpen(false)}
              isActive={isActiveSection([
                '/about',
                '/introduction',
                '/mission-vision',
                '/company-profile',
              ])}
            />

            <MobileNavAccordion
              label="Products"
              items={marketMobileItems}
              onItemClick={() => setMobileMenuOpen(false)}
              isActive={isActiveSection(['/markets'])}
            />

            <MobileNavAccordion
              label="Policies"
              items={policyItems}
              onItemClick={() => setMobileMenuOpen(false)}
              isActive={isActiveSection(['/policies'])}
            />

            <MobileNavAccordion
              label="Client Area"
              items={clientAreaItems}
              onItemClick={() => setMobileMenuOpen(false)}
              isActive={isActiveSection(['/clients'])}
            />

            <MobileNavAccordion
              label="Forms"
              items={formsItems}
              onItemClick={() => setMobileMenuOpen(false)}
              isActive={isActiveSection([
                '/contact',
                '/feedback',
                '/complaint',
                '/grievance',
                '/whistleblower',
              ])}
            />

            <Link
              to="/reports"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 text-[18px] font-medium transition-colors ${
                isActive('/reports')
                  ? 'bg-accent/10 text-accent'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              Reports
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 text-[18px] font-medium transition-colors ${
                isActive('/contact')
                  ? 'bg-accent/10 text-accent'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Drawer CTA Buttons */}
        <div className="space-y-2.5 border-t border-border/60 p-4">
          <Link
            to="/book-online-session"
            onClick={() => setMobileMenuOpen(false)}
            className="flex w-full items-center justify-center rounded-lg border border-primary px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Book an Online Session
          </Link>

          <a
            href="https://demotrade.pmex.com.pk/terminal"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Open Demo Account Online
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar