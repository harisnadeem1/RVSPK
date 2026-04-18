
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

function MobileNavAccordion({ label, items, onItemClick, isActive }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between px-4 py-3 font-medium transition-colors duration-200 ${
          isActive ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'
        }`}
        aria-expanded={isExpanded}
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="bg-muted/50">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={onItemClick}
              className="block px-8 py-3 text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200 border-t border-border"
            >
              <div className="font-medium">{item.label}</div>
              {item.description && (
                <div className="text-sm text-muted-foreground mt-0.5">
                  {item.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MobileNavAccordion;
