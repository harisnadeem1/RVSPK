
import React from 'react';

function ContactCard({ icon: Icon, title, content, href, action }) {
  return (
    <div className="card-container professional-card text-center group">
      <div className="card-content-grow">
        <div className="h-16 w-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        {href ? (
          <a
            href={href}
            className="text-accent hover:text-accent/80 font-medium transition-colors"
          >
            {content}
          </a>
        ) : (
          <p className="text-muted-foreground">{content}</p>
        )}
      </div>
      {action && (
        <div className="card-footer-bottom mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

export default ContactCard;
