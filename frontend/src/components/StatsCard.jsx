import React from 'react';

function StatsCard({ icon: Icon, number, label, description }) {
  return (
    <div className="group relative overflow-hidden bg-card rounded-2xl border border-border
      hover:border-accent/40 hover:shadow-md transition-all duration-200 p-6">

      {/* Subtle background accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        {Icon && (
          <div className="h-11 w-11 rounded-xl bg-accent/10 border border-accent/20
            flex items-center justify-center flex-shrink-0
            group-hover:bg-accent group-hover:border-accent transition-colors duration-200">
            <Icon className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors duration-200" />
          </div>
        )}

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-foreground tabular-nums leading-none mb-1">
            {number}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground/70 truncate">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent
        group-hover:w-full transition-all duration-300" />
    </div>
  );
}

export default StatsCard;