import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const AOF_LINK = 'https://www.aof.com.pk/?ODc0NTQ4NDE4Nzc3NzU3Mjc0ODU4MzIzNDY4NDcyNzM3MTI3NzQ4OQ=='

function CTASection({ headline, description, primaryCTA, secondaryCTA, background = 'gradient' }) {
  const bgClasses = {
    gradient: 'bg-gradient-to-br from-primary via-primary/95 to-secondary',
    accent: 'bg-accent',
    muted: 'bg-muted',
  }

  const isMuted = background === 'muted'

  function CTALink({ cta, children, className }) {
    // Treat '/contact' account-opening links and explicit http links as external AOF
    const resolvedHref =
      cta.href === '/contact' && cta.text?.toLowerCase().includes('account')
        ? AOF_LINK
        : cta.href

    const isExternal = resolvedHref.startsWith('http')

    if (isExternal) {
      return (
        <a
          href={resolvedHref}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      )
    }
    return (
      <Link to={resolvedHref} className={className}>
        {children}
      </Link>
    )
  }

  return (
  <section className="bg-card py-8 sm:py-10">
    <div className="container-custom max-w-7xl px-4 sm:px-6">
      <div
        className={`${bgClasses[background]} relative overflow-hidden rounded-2xl border border-[#79AD14]/15 shadow-[0_16px_45px_rgba(121,173,20,0.10)] sm:rounded-3xl`}
      >
        {!isMuted && (
          <>
            <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl sm:h-96 sm:w-96" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-white/5 blur-3xl sm:h-72 sm:w-72" />
          </>
        )}

        <div className="relative z-10 px-4 py-14 sm:px-8 sm:py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div
              className={`mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 ${
                isMuted
                  ? "border border-accent/20 bg-accent/10"
                  : "border border-white/20 bg-white/10"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 animate-pulse rounded-full ${
                  isMuted ? "bg-accent" : "bg-white/80"
                }`}
              />

              <span
                className={`text-[15px] font-semibold uppercase tracking-[0.2em] ${
                  isMuted ? "text-accent" : "text-white/80"
                }`}
              >
                Get Started Today
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`mb-4 text-3xl font-bold leading-tight sm:text-3xl md:text-4xl ${
                isMuted ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {headline}
            </h2>

            {/* Description */}
            <p
              className={`mx-auto mb-8 max-w-xl text-base leading-relaxed sm:text-base ${
                isMuted
                  ? "text-muted-foreground"
                  : "text-primary-foreground/80"
              }`}
            >
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              {primaryCTA && (
                <CTALink cta={primaryCTA} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className={`w-full px-8 py-6 text-base font-semibold transition-all hover:-translate-y-0.5 sm:w-auto sm:py-6 sm:text-base ${
                      isMuted
                        ? "bg-[#79AD14] text-white shadow-lg shadow-[#79AD14]/20 hover:bg-[#5E8410]"
                        : "bg-white text-[#5E8410] shadow-lg shadow-black/20 hover:bg-white/90"
                    }`}
                  >
                    {primaryCTA.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CTALink>
              )}

              {secondaryCTA && (
                <CTALink cta={secondaryCTA} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className={`w-full border px-8 py-6 text-base font-semibold transition-all hover:-translate-y-0.5 sm:w-auto sm:py-6 sm:text-base ${
                      isMuted
                        ? "border-[#79AD14]/50 bg-transparent text-[#5E8410] hover:border-[#79AD14] hover:bg-[#79AD14] hover:text-white"
                        : "border-white/40 bg-white/10 text-primary-foreground backdrop-blur-sm hover:border-white/70 hover:bg-white/20"
                    }`}
                  >
                    {secondaryCTA.text}
                  </Button>
                </CTALink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
}

export default CTASection