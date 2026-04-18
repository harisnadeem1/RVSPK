
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function InfoCard({ icon: Icon, title, description, href, ctaText }) {
  return (
    <div className="card-container professional-card group">
      <div className="card-content-grow">
        <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
      </div>
      {href && ctaText && (
        <div className="card-footer-bottom">
          <Link to={href}>
            <Button variant="ghost" className="w-full justify-between group-hover:bg-accent/10 transition-colors">
              {ctaText}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default InfoCard;
