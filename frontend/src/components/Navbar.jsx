import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import DropdownMenu from '@/components/DropdownMenu.jsx'
import MegaMenu from '@/components/MegaMenu.jsx'
import MobileNavAccordion from '@/components/MobileNavAccordion.jsx'
import { Button } from '@/components/ui/button.jsx'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path
  const isActiveSection = (paths) => paths.some((path) => location.pathname.startsWith(path))

  const aboutItems = [
    { label: 'Introduction', path: '/about/introduction' },
    { label: 'Company Profile', path: '/about/company-profile' },
    {
      label: 'Governance',
      children: [
        { label: "BOD's Profile", path: '/about/governance/bods' },
        { label: 'Name of Auditor', path: '/about/governance/auditor' },
        { label: 'Name of Legal Advisor', path: '/about/governance/legal-advisor' },
      ],
    },
  ]

  const marketSections = [
    {
      title: 'Agri Commodities',
      items: [
        { label: 'Cotton', path: '/markets/agri/cotton' },
        { label: 'Wheat', path: '/markets/agri/wheat' },
        { label: 'Corn', path: '/markets/agri/corn' },
        { label: 'Soybean', path: '/markets/agri/soybean' },
        { label: 'Sugar', path: '/markets/agri/sugar' },
      ],
    },
    {
      title: 'Non-Agri Commodities',
      subGroups: [
        {
          label: 'Metals',
          items: [
            { label: 'Gold', path: '/markets/non-agri/metals/gold' },
            { label: 'Silver', path: '/markets/non-agri/metals/silver' },
            { label: 'Copper', path: '/markets/non-agri/metals/copper' },
            { label: 'Platinum', path: '/markets/non-agri/metals/platinum' },
            { label: 'Palladium', path: '/markets/non-agri/metals/palladium' },
            { label: 'Aluminum', path: '/markets/non-agri/metals/aluminum' },
          ],
        },
        {
          label: 'Energy',
          items: [
            { label: 'Crude Oil', path: '/markets/non-agri/energy/crude-oil' },
            { label: 'Brent Crude Oil', path: '/markets/non-agri/energy/brent-crude' },
            { label: 'Natural Gas', path: '/markets/non-agri/energy/natural-gas' },
          ],
        },
      ],
    },
  ]

  const aboutMobileItems = [
    { label: 'Introduction', path: '/about/introduction' },
    { label: 'Company Profile', path: '/about/company-profile' },
    {
      label: 'Governance',
      children: [
        { label: "BOD's Profile", path: '/about/governance/bods' },
        { label: 'Name of Auditor', path: '/about/governance/auditor' },
        { label: 'Name of Legal Advisor', path: '/about/governance/legal-advisor' },
      ],
    },
  ]

  // 3-level: Markets > Agri/Non-Agri > Metals/Energy > items
  const marketMobileItems = [
    {
      label: 'Agri Commodities',
      children: [
        { label: 'Cotton', path: '/markets/agri/cotton' },
        { label: 'Wheat', path: '/markets/agri/wheat' },
        { label: 'Corn', path: '/markets/agri/corn' },
        { label: 'Soybean', path: '/markets/agri/soybean' },
        { label: 'Sugar', path: '/markets/agri/sugar' },
      ],
    },
    {
      label: 'Non-Agri Commodities',
      children: [
        {
          label: 'Metals',
          children: [
            { label: 'Gold', path: '/markets/non-agri/metals/gold' },
            { label: 'Silver', path: '/markets/non-agri/metals/silver' },
            { label: 'Copper', path: '/markets/non-agri/metals/copper' },
            { label: 'Platinum', path: '/markets/non-agri/metals/platinum' },
            { label: 'Palladium', path: '/markets/non-agri/metals/palladium' },
            { label: 'Aluminum', path: '/markets/non-agri/metals/aluminum' },
          ],
        },
        {
          label: 'Energy',
          children: [
            { label: 'Crude Oil', path: '/markets/non-agri/energy/crude-oil' },
            { label: 'Brent Crude Oil', path: '/markets/non-agri/energy/brent-crude' },
            { label: 'Natural Gas', path: '/markets/non-agri/energy/natural-gas' },
          ],
        },
      ],
    },
  ]

  const policyItems = [
    { label: 'Privacy Policy', path: '/policies/privacy-policy' },
    { label: 'Customer Grievances Redressal', path: '/policies/customer-grievances-redressal' },
    { label: 'Risk Management Policy', path: '/policies/risk-management' },
    { label: 'CDD / KYC Policy', path: '/policies/cdd-kyc' },
    { label: 'Conflict of Interest Policy', path: '/policies/conflict-of-interest' },
  ]

  const clientAreaItems = [
    { label: 'No Cash Policy', path: '/clients/no-cash-policy' },
    { label: "Guidelines for Clients Do's & Don'ts", path: '/clients/guidelines' },
    { label: 'Account Opening Guide', path: '/clients/account-opening-guide' },
    { label: 'Direct Funds Model User Manual', path: '/clients/dfm-user-manual' },
    { label: 'PMEX Guidelines Clients DFM', path: '/clients/pmex-guidelines-dfm' },
    { label: 'Guide to Futures Trading at PMEX', path: '/clients/guide-futures-pmex' },
    { label: 'PMEX Fee Criteria', path: '/clients/pmex-fee-criteria' },
    { label: 'Commission Structure', path: '/clients/commission-structure' },
    { label: 'Client Complaint Process', path: '/clients/complaint-process' },
    { label: 'Diagram – Redressal', path: '/clients/diagram-redressal' },
  ]

  const reportsItems = [
    { label: 'Daily Reports', path: '/reports/daily' },
    { label: 'Monthly Reports', path: '/reports/monthly' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-card/90 backdrop-blur-xl">
        <div className="container-custom">

          {/* Mobile header — hamburger LEFT, logo CENTER */}
          <div className="grid h-16 grid-cols-3 items-center xl:hidden">
            <div className="flex justify-start">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition hover:bg-muted"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center">
              <Link to="/" className="flex items-center">
                <img src="/rvspk_logo.png" alt="Right Vision Securities" className="h-13 w-auto" />
              </Link>
            </div>
            <div />
          </div>

          {/* Desktop header */}
          <div className="hidden h-20 xl:grid grid-cols-[auto_1fr_auto] items-center gap-8">
            <Link to="/" className="flex items-center shrink-0">
              <img src="/rvspk_logo.png" alt="Right Vision Securities" className="h-16 w-auto" />
            </Link>

            <div className="flex items-center justify-center min-w-0">
              <div className="flex items-center gap-5 2xl:gap-7 text-[15px]">
                <Link
                  to="/"
                  className={`whitespace-nowrap font-medium transition-colors ${
                    isActive('/') ? 'text-accent' : 'text-foreground hover:text-accent'
                  }`}
                >
                  Home
                </Link>
                <DropdownMenu label="About Us" items={aboutItems} isActive={isActiveSection(['/about'])} />
                <MegaMenu label="Markets" sections={marketSections} isActive={isActiveSection(['/markets'])} />
                <DropdownMenu label="Policies" items={policyItems} isActive={isActiveSection(['/policies'])} />
                <DropdownMenu label="Client Area" items={clientAreaItems} isActive={isActiveSection(['/clients'])} />
                <DropdownMenu label="Reports" items={reportsItems} isActive={isActiveSection(['/reports'])} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Contact Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer — LEFT */}
      <div
        className={`fixed left-0 top-0 z-[70] h-screen w-[85%] max-w-[320px] xl:hidden bg-card border-r border-border shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
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
              className={`flex items-center px-4 py-3 text-[15px] font-medium transition-colors ${
  isActive('/') ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'
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
              label="Markets"
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
              label="Reports"
              items={reportsItems}
              onItemClick={() => setMobileMenuOpen(false)}
              isActive={isActiveSection(['/reports'])}
            />

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 text-[15px] font-medium transition-colors ${
  isActive('/contact') ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'
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
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar