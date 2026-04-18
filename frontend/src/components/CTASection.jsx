
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function CTASection({ headline, description, primaryCTA, secondaryCTA, background = 'gradient' }) {
  const bgClasses = {
    gradient: 'bg-gradient-to-br from-primary via-primary/95 to-secondary',
    accent: 'bg-accent',
    muted: 'bg-muted'
  };

  const textColor = background === 'muted' ? 'text-foreground' : 'text-primary-foreground';
  const subtextColor = background === 'muted' ? 'text-muted-foreground' : 'text-primary-foreground/90';

  return (
    <div className={`${bgClasses[background]} py-20 md:py-24`}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-6`}>
            {headline}
          </h2>
          <p className={`text-lg ${subtextColor} leading-relaxed mb-8 max-w-2xl mx-auto`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <Link to={primaryCTA.href}>
                <Button
                  size="lg"
                  className={background === 'muted' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/90'}
                >
                  {primaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            {secondaryCTA && (
              <Link to={secondaryCTA.href}>
                <Button
                  size="lg"
                  variant="outline"
                  className={background === 'muted' ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'}
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
