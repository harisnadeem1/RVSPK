
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

function MarketCard({ icon: Icon, name, description, price, change, changePercent, isPositive, href }) {
  return (
    <div className="card-container professional-card group">
      <div className="card-content-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
            <Icon className="h-6 w-6" />
          </div>
          {price && (
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground tabular-nums">{price}</div>
              <div className={`text-sm font-medium flex items-center justify-end gap-1 ${isPositive ? 'text-[hsl(var(--positive))]' : 'text-destructive'}`}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{change} ({changePercent})</span>
              </div>
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
      </div>

      <div className="card-footer-bottom">
        <Link to={href || '/markets'}>
          <Button variant="ghost" className="w-full justify-between group-hover:bg-accent/10 transition-colors">
            Learn more
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MarketCard;
