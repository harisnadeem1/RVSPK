import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function SubGroupFlyout({ subGroup, onClose }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setOpen(true)
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150)
      }}
    >
      <button className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200">
        <span className="font-medium">{subGroup.label}</span>
        <ChevronRight className="h-3.5 w-3.5 opacity-60" />
      </button>

      {open && (
        <div className="absolute left-full top-0 z-50 pl-1">
          <div className="min-w-[180px] rounded-xl border border-border bg-card shadow-xl overflow-hidden">
            <div className="py-2">
              {subGroup.items.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  onClick={onClose}
                  className="block px-4 py-2.5 text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                >
                  <div className="font-medium">{item.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MegaMenu({ label, sections, isActive }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 font-medium transition-colors duration-200 relative ${
          isActive ? 'text-accent' : 'text-foreground hover:text-accent'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
        {isActive && (
          <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card rounded-xl shadow-xl border border-border overflow-visible z-50">
          <div className="grid grid-cols-2 gap-0 p-6 w-[560px]">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="min-w-0">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                  {section.title}
                </div>

                {/* Regular items */}
                {section.items && (
                  <div className="space-y-0.5">
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
                )}

                {/* SubGroups with flyout (Metals / Energy) */}
                {section.subGroups && (
                  <div className="space-y-0.5">
                    {section.subGroups.map((subGroup, sgIndex) => (
                      <SubGroupFlyout
                        key={sgIndex}
                        subGroup={subGroup}
                        onClose={() => setIsOpen(false)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MegaMenu