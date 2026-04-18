
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

function MegaMenu({ label, sections, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className={`flex items-center gap-1 font-medium transition-colors duration-200 relative ${
          isActive ? 'text-accent' : 'text-foreground hover:text-accent'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
        {isActive && (
          <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-card rounded-xl shadow-xl border border-border overflow-hidden z-50">
          <div className="grid grid-cols-2 gap-6 p-6">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  {section.title}
                </div>
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-lg text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MegaMenu;
