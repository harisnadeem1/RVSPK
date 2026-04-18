
import React from 'react';

function StatsCard({ icon: Icon, number, label, description }) {
  return (
    <div className="card-container professional-card text-center">
      <div className="card-content-grow">
        {Icon && (
          <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 tabular-nums">
          {number}
        </div>
        <div className="text-lg font-semibold text-foreground mb-2">{label}</div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

export default StatsCard;
