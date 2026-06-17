import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import DropdownMenu from '@/components/DropdownMenu.jsx'
import MegaMenu from '@/components/MegaMenu.jsx'
import MobileNavAccordion from '@/components/MobileNavAccordion.jsx'
import { Button } from '@/components/ui/button.jsx'
import ComplianceStrip from '@/components/ComplianceStrip.jsx';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path
  const isActiveSection = (paths) => paths.some((path) => location.pathname.startsWith(path))

  const formsItems = [
    { label: 'Contact Us', path: '/contact' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Complaint Registration', path: '/complaint' },
    { label: 'Client Grievance', path: '/grievance' },
    { label: 'Whistleblower', path: '/whistleblower' },
  ]

  const aboutItems = [
    // { label: 'Introduction', path: '/about' },
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
        { label: 'Platinum', path: 'https://pmex.com.pk/products/metal/platinum/' },
        { label: 'Palladium', path: 'https://pmex.com.pk/products/metal/palladium/' },
        { label: 'Aluminium', path: 'https://pmex.com.pk/products/metal/aluminium/' },
        { label: 'Gold Milli Ounce', path: 'https://pmex.com.pk/products/metal/gold-milli-ounce/' },
        { label: 'Silver', path: 'https://pmex.com.pk/products/metal/silver/' },
        { label: 'Copper', path: 'https://pmex.com.pk/products/metal/copper/' },
        { label: 'Gold', path: 'https://pmex.com.pk/products/metal/gold/' },
      ],
    },
    {
      title: 'Agriculture',
      items: [
        { label: 'Rice', path: 'https://pmex.com.pk/products/agriculture/rice/' },
        { label: 'Sugar', path: 'https://pmex.com.pk/products/agriculture/sugar/' },
        { label: 'Wheat', path: 'https://pmex.com.pk/products/agriculture/wheat/' },
        { label: 'Soybean', path: 'https://pmex.com.pk/products/agriculture/soybean/' },
        { label: 'Cotton', path: 'https://pmex.com.pk/products/agriculture/cotton/' },
        { label: 'Corn', path: 'https://pmex.com.pk/products/agriculture/corn/' },
      ],
    },
    {
      title: 'Energy',
      items: [
        { label: 'Natural Gas', path: 'https://pmex.com.pk/products/energy/natural-gas/' },
        { label: 'Crude Oil', path: 'https://pmex.com.pk/products/energy/crude-oil/' },
        { label: 'Brent Crude Oil', path: 'https://pmex.com.pk/products/energy/brent-crude-oil/' },
      ],
    },
    {
      title: 'Financials',
      items: [
        { label: 'Indices', path: 'https://pmex.com.pk/products/financials/indices/' },
      ],
    },
  ]

  const aboutMobileItems = aboutItems;
  //  [
  //   { label: 'Introduction', path: '/about' },
  //   { label: 'Company Profile', path: '/company-profile' },
  //   {
  //     label: 'Governance',
  //     children: [
  //       { label: "BOD's Profile", path: '/about/board' },
  //       { label: 'Name of Auditor', path: '/about/auditors' },
  //       { label: 'Name of Legal Advisor', path: '/about/legal' },
  //     ],
  //   },
  // ]

  // ✅ Derived directly from marketSections — same titles, same links
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
    { label: 'Customer Grievances Redressal Policy', path: '/policies/customer-grievances-redressal' },
    { label: 'Risk Management Policy', path: '/policies/risk-management' },
    { label: 'CDD / KYC Policy & Procedure', path: '/policies/cdd-kyc' },
    { label: 'Whistleblowing Policy & Procedure', path: '/policies/whistleblowing' },
    { label: 'Conflict of Interest Policy', path: '/policies/conflict-of-interest' },
  ]

  const clientAreaItems = [
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
    { label: 'Model of Funds Transfer', path: '/clients/model-funds-transfer' },

  ]

  const reportsItems = [
    { label: 'Daily Reports', path: '/reports/daily' },
    { label: 'Monthly Reports', path: '/reports/monthly' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-card/90 backdrop-blur-xl">
       <div className="w-full px-6 2xl:px-10">

          {/* Mobile header — hamburger LEFT, logo CENTER, CTA RIGHT */}
          <div className="grid h-16 grid-cols-[40px_1fr_auto] items-center gap-2 xl:hidden">

            {/* Hamburger */}
            <div className="flex justify-start shrink-0">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition hover:bg-muted"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Logo — centered in remaining space */}
            <div className="flex justify-center min-w-0">
              <Link to="/" className="flex items-center">
                <img
                  src="/rvspk_logo.png"
                  alt="Right Vision Securities"
                  className="h-14 sm:h-16 w-auto max-w-[180px] object-contain"
                />
              </Link>
            </div>

            {/* Get Started */}
            <div className="flex justify-end shrink-0">
              <a
                href="https://www.aof.com.pk/?ODc0NTQ4NDE4Nzc3NzU3Mjc0ODU4MzIzNDY4NDcyNzM3MTI3NzQ4OQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:bg-accent/90 transition-colors whitespace-nowrap"
              >
                Open Account
              </a>
            </div>

          </div>

          {/* Desktop header */}
          <div className="hidden h-24 xl:grid grid-cols-[220px_1fr_260px] items-center w-full">
            <Link to="/" className="flex items-center shrink-0">
              <img src="/rvspk_logo.png" alt="Right Vision Securities" className="h-20 2xl:h-22 w-auto" />
            </Link>

            <div className="flex items-center justify-center w-full px-10">
              <div className="flex items-center gap-5 2xl:gap-7 text-[15px]">
                <Link
                  to="/"
                  className={`whitespace-nowrap font-medium transition-colors ${isActive('/') ? 'text-accent' : 'text-foreground hover:text-accent'
                    }`}
                >
                  Home
                </Link>
                <DropdownMenu label="About Us" items={aboutItems} isActive={isActiveSection(['/about'])} />
                <MegaMenu label="Products" sections={marketSections} isActive={isActiveSection(['/markets'])} />
                <DropdownMenu label="Policies" items={policyItems} isActive={isActiveSection(['/policies'])} />
                <DropdownMenu label="Client Area" items={clientAreaItems} isActive={isActiveSection(['/clients'])} />
                <DropdownMenu
                  label="Forms"
                  items={formsItems}
                  isActive={isActiveSection(['/contact', '/feedback', '/complaint', '/grievance', '/whistleblower'])}
                />
                <Link
                  to="/reports"
                  className={`whitespace-nowrap font-medium transition-colors ${isActive('/reports') ? 'text-accent' : 'text-foreground hover:text-accent'
                    }`}
                >
                  Reports
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Contact Us
                </Button>
              </Link>
              <a
                href="https://www.aof.com.pk/?ODc0NTQ4NDE4Nzc3NzU3Mjc0ODU4MzIzNDY4NDcyNzM3MTI3NzQ4OQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Open Account
                </Button>
              </a>
            </div>
          </div>

        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer — LEFT */}
      <div
        className={`fixed left-0 top-0 z-[70] h-screen w-[85%] max-w-[320px] xl:hidden bg-card border-r border-border shadow-2xl transition-transform duration-300 ease-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img src="/rvspk_logo.png" alt="Right Vision Securities" className="h-9 w-auto" />
          </Link>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 text-[15px] font-medium transition-colors ${isActive('/') ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'
                }`}
            >
              Home
            </Link>

            <MobileNavAccordion
              label="About Us"
              items={aboutMobileItems}
              onItemClick={() => setMobileMenuOpen(false)}
              isActive={isActiveSection(['/about'])}
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
              isActive={isActiveSection(['/contact', '/feedback', '/complaint', '/grievance', '/whistleblower'])}
            />
            <Link
              to="/reports"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 text-[15px] font-medium transition-colors ${isActive('/reports') ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'
                }`}
            >
              Reports
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 text-[15px] font-medium transition-colors ${isActive('/contact') ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'
                }`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="border-t border-border/60 p-4 space-y-2.5">
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-full rounded-lg border border-primary px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Contact Us
          </Link>
          <a
            href="https://www.aof.com.pk/?ODc0NTQ4NDE4Nzc3NzU3Mjc0ODU4MzIzNDY4NDcyNzM3MTI3NzQ4OQ=="
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            Open Account
          </a>
        </div>
      </div>
            <ComplianceStrip />

    </>
  )
}

export default Navbar