import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function CTASection({ headline, description, primaryCTA, secondaryCTA, background = 'gradient' }) {
  const bgClasses = {
    gradient: 'bg-gradient-to-br from-primary via-primary/95 to-secondary',
    accent: 'bg-accent',
    muted: 'bg-muted',
  };

  const isMuted = background === 'muted';

  return (
    <div className={`${bgClasses[background]} relative overflow-hidden`}>

      {/* Decorative blobs — only on gradient/accent backgrounds */}
      {!isMuted && (
        <>
          <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative z-10 container-custom px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 ${
            isMuted
              ? 'bg-accent/10 border border-accent/20'
              : 'bg-white/10 border border-white/20'
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isMuted ? 'bg-accent' : 'bg-white/80'}`} />
            <span className={`text-xs font-semibold tracking-[0.15em] uppercase ${isMuted ? 'text-accent' : 'text-white/80'}`}>
              Get Started Today
            </span>
          </div>

          {/* Headline */}
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 ${
            isMuted ? 'text-foreground' : 'text-primary-foreground'
          }`}>
            {headline}
          </h2>

          {/* Description */}
          <p className={`text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto ${
            isMuted ? 'text-muted-foreground' : 'text-primary-foreground/80'
          }`}>
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            {primaryCTA && (
              <Link to={primaryCTA.href} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className={`w-full sm:w-auto px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold transition-all hover:-translate-y-0.5 ${
                    isMuted
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
                      : 'bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/20'
                  }`}
                >
                  {primaryCTA.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {secondaryCTA && (
              <Link to={secondaryCTA.href} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className={`w-full sm:w-auto px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold transition-all hover:-translate-y-0.5 ${
                    isMuted
                      ? 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                      : 'bg-white/10 border border-white/40 text-primary-foreground hover:bg-white/20 hover:border-white/70 backdrop-blur-sm'
                  }`}
                >
                  {secondaryCTA.text}
                </Button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CTASection;