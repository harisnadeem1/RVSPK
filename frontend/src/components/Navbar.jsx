
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DropdownMenu from '@/components/DropdownMenu.jsx';
import MegaMenu from '@/components/MegaMenu.jsx';
import MobileNavAccordion from '@/components/MobileNavAccordion.jsx';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isActiveSection = (paths) => paths.some(path => location.pathname === path);

  const aboutItems = [
    { label: 'Company Profile', path: '/company-profile', description: 'Corporate information' },
    { label: 'Board of Directors', path: '/board', description: 'Leadership team' },
    { label: 'Auditor', path: '/legal', description: 'Audit information' },
    { label: 'Legal Advisor', path: '/legal', description: 'Legal counsel' }
  ];

  const marketSections = [
    {
      title: 'Energy',
      items: [
        { label: 'Crude Oil', path: '/markets#oil', description: 'WTI & Brent futures' }
      ]
    },
    {
      title: 'Precious Metals',
      items: [
        { label: 'Gold', path: '/markets#gold', description: 'Gold futures trading' },
        { label: 'Silver', path: '/markets#silver', description: 'Silver futures trading' },
        { label: 'Platinum', path: '/markets#platinum', description: 'Platinum futures trading' }
      ]
    },
    {
      title: 'Currency',
      items: [
        { label: 'USD Index', path: '/markets#dollar', description: 'Dollar index futures' }
      ]
    }
  ];

  const reportsItems = [
    { label: 'Daily Reports', path: '/reports', description: 'Daily market analysis' },
    { label: 'Statistical Reports', path: '/reports', description: 'Market statistics' },
    { label: 'Market Insights', path: '/reports', description: 'Trading insights' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">RV</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-foreground">Right Vision</div>
                <div className="text-xs text-muted-foreground">Securities</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 relative ${
                isActive('/') ? 'text-accent' : 'text-foreground hover:text-accent'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" />
              )}
            </Link>

            <DropdownMenu
              label="About"
              items={aboutItems}
              isActive={isActiveSection(['/about', '/company-profile', '/board'])}
            />

            <MegaMenu
              label="Markets"
              sections={marketSections}
              isActive={isActive('/markets')}
            />

            <DropdownMenu
              label="Reports"
              items={reportsItems}
              isActive={isActive('/reports')}
            />

            <Link
              to="/clients"
              className={`font-medium transition-colors duration-200 relative ${
                isActive('/clients') ? 'text-accent' : 'text-foreground hover:text-accent'
              }`}
            >
              Clients Area
              {isActive('/clients') && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" />
              )}
            </Link>

            <Link
              to="/contact"
              className={`font-medium transition-colors duration-200 relative ${
                isActive('/contact') ? 'text-accent' : 'text-foreground hover:text-accent'
              }`}
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" />
              )}
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/clients">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Clients Area
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="flex flex-col">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium px-4 py-3 transition-colors duration-200 ${
                  isActive('/') ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted'
                }`}
              >
                Home
              </Link>

              <MobileNavAccordion
                label="About"
                items={aboutItems}
                onItemClick={() => setMobileMenuOpen(false)}
                isActive={isActiveSection(['/about', '/company-profile', '/board'])}
              />

              <MobileNavAccordion
                label="Markets"
                items={[
                  { label: 'Crude Oil', path: '/markets#oil' },
                  { label: 'Gold', path: '/markets#gold' },
                  { label: 'Silver', path: '/markets#silver' },
                  { label: 'Platinum', path: '/markets#platinum' },
                  { label: 'USD Index', path: '/markets#dollar' }
                ]}
                onItemClick={() => setMobileMenuOpen(false)}
                isActive={isActive('/markets')}
              />

              <MobileNavAccordion
                label="Reports"
                items={reportsItems}
                onItemClick={() => setMobileMenuOpen(false)}
                isActive={isActive('/reports')}
              />

              <Link
                to="/clients"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium px-4 py-3 transition-colors duration-200 ${
                  isActive('/clients') ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted'
                }`}
              >
                Clients Area
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium px-4 py-3 transition-colors duration-200 ${
                  isActive('/contact') ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted'
                }`}
              >
                Contact
              </Link>

              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-border mt-4">
                <Link to="/clients" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Clients Area
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
