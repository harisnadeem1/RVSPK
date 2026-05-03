import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function PageHero({ title, subtitle, backgroundImage, breadcrumbs }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden py-12 sm:py-16">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img src={backgroundImage} alt=""
              className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/85" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary" />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-10
          bg-gradient-to-t from-background/15 to-transparent pointer-events-none" />
      </div>

      {/* Subtle decorative blob */}
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full
        bg-accent/10 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="container-custom relative z-10 px-4 text-center">

        {/* Breadcrumbs */}
        {breadcrumbs?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-1 mb-4 px-3 py-1
              rounded-full bg-white/10 border border-white/15 backdrop-blur-sm"
          >
            <Home className="h-3 w-3 text-white/50 flex-shrink-0" />
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="h-3 w-3 text-white/30 flex-shrink-0" />
                {crumb.path ? (
                  <Link to={crumb.path}
                    className="text-[11px] font-medium text-white/60 hover:text-accent transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[11px] font-semibold text-white/90">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white
            leading-tight tracking-tight mb-3 capitalize"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-sm sm:text-base text-white/65 leading-relaxed
              max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

      </div>
    </div>
  );
}

export default PageHero;