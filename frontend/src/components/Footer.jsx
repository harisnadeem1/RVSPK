
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, ChevronDown } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [legalExpanded, setLegalExpanded] = useState(false);

  const footerLinks = {
    products: [
      { label: 'Commodities Trading', path: '/markets' },
      { label: 'Futures Trading', path: '/markets' },
      { label: 'Market Reports', path: '/reports' },
      { label: 'Client Portal', path: '/clients' }
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Company Profile', path: '/company-profile' },
      { label: 'Board of Directors', path: '/board' },
      { label: 'Contact', path: '/contact' }
    ],
    legal: [
      { label: 'Terms & Conditions', path: '/legal', state: { tab: 'terms' } },
      { label: 'Disclaimer', path: '/legal', state: { tab: 'disclaimer' } },
      { label: 'Privacy Policy', path: '/legal', state: { tab: 'privacy' } },
      { label: 'Compliance', path: '/legal', state: { tab: 'compliance' } }
    ],
    support: [
      { label: 'Help Center', path: '/contact' },
      { label: 'Client Support', path: '/contact' },
      { label: 'Trading FAQs', path: '/contact' },
      { label: 'Report Issue', path: '/contact' }
    ]
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-2xl">RV</span>
              </div>
              <div>
                <div className="font-bold text-xl">Right Vision</div>
                <div className="text-sm opacity-90">Securities</div>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-sm">
              A leading SECP regulated and PMEX licensed brokerage firm specializing in commodity and futures trading in Pakistan.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  Office 204, 2nd Floor, Ali Trade Center,<br />
                  Gulberg III, Lahore, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <a href="mailto:info@rightvision.com.pk" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  info@rightvision.com.pk
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <a href="tel:+92423587123" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  +92 42 3587 123
                </a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Expandable */}
          <div className="lg:col-span-2">
            <button
              onClick={() => setLegalExpanded(!legalExpanded)}
              className="flex items-center justify-between w-full font-semibold text-lg mb-4 lg:cursor-default"
            >
              <span>Legal</span>
              <ChevronDown
                className={`h-5 w-5 lg:hidden transition-transform duration-200 ${
                  legalExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            <ul className={`space-y-2 ${legalExpanded ? 'block' : 'hidden lg:block'}`}>
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    state={link.state}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/80">
              © {currentYear} Right Vision Securities. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-6 text-xs text-primary-foreground/70 text-center md:text-left">
            <p>
              Right Vision Securities is regulated by SECP and licensed by PMEX. Trading in commodity futures involves substantial risk and may not be suitable for all investors. Please ensure you understand the risks involved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
