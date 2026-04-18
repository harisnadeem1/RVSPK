
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function PageHero({ title, subtitle, backgroundImage, breadcrumbs }) {
  return (
    <div className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/90" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary" />
        )}
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6 text-sm text-primary-foreground/80">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {crumb.path ? (
                    <Link
                      to={crumb.path}
                      className="hover:text-accent transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHero;
