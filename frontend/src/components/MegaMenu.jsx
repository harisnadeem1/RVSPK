import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

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
      <button className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200">
        <span className="text-[13.5px] font-semibold">{subGroup.label}</span>
        <ChevronRight className="h-3.5 w-3.5 opacity-50" />
      </button>

      {open && (
        <div className="absolute left-full top-0 z-50 pl-2">
          <div className="min-w-[190px] rounded-xl border border-border bg-card shadow-xl overflow-hidden">
            <div className="py-1.5">
              {subGroup.items.map((item, i) => (
                <a
                  key={i}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="block px-4 py-2.5 text-[13.5px] font-medium text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                >
                  {item.label}
                </a>
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
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-card rounded-xl shadow-xl border border-border overflow-visible z-50">

          {/* Top accent bar */}
          <div className="h-[3px] rounded-t-xl bg-accent" />

          <div className="grid grid-cols-2 w-[580px]">
            {sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
               className="p-5"
              >
                {/* Section heading — bigger, bolder, accented */}
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[13px] font-bold uppercase tracking-widest text-accent">
                    {section.title}
                  </span>
                </div>

                {/* Underline divider */}
                <div className="mb-4 h-px bg-accent/30" />

                {/* Regular flat items */}
                {section.items && (
                  <div className="space-y-0.5">
                    {section.items.map((item, itemIndex) => (
                      <a
                        key={itemIndex}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                      >
                        {item.label}
                        {item.description && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                )}

                {/* SubGroups with flyout */}
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