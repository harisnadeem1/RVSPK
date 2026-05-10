// DropdownMenu.jsx
import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function FlyoutItem({ item, onClose }) {
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  if (!item.children) {
    return (
      <Link
        to={item.path}
        onClick={onClose}
        className="block px-3 py-2.5 rounded-lg text-[13.5px] font-medium whitespace-nowrap text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
      >
        {item.label}
        {item.description && (
          <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
        )}
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setFlyoutOpen(true)
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setFlyoutOpen(false), 150)
      }}
    >
      <button className="flex w-full items-center justify-between gap-6 px-3 py-2.5 rounded-lg text-[13.5px] font-medium whitespace-nowrap text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200">
        <span>{item.label}</span>
        <ChevronRight className="h-3.5 w-3.5 opacity-50 flex-shrink-0" />
      </button>

      {flyoutOpen && (
        <div className="absolute left-full top-0 z-50 pl-2">
          <div className="w-max min-w-48 rounded-xl border border-border bg-card shadow-xl overflow-hidden">
            {/* Top accent bar */}
            <div className="h-[3px] bg-accent" />
            <div className="py-1.5 px-1.5">
              {item.children.map((child, i) => (
                <Link
                  key={i}
                  to={child.path}
                  onClick={onClose}
                  className="block px-3 py-2.5 rounded-lg text-[13.5px] font-medium whitespace-nowrap text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownMenu({ label, items, isActive }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
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
      ref={dropdownRef}
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
        // w-max so panel grows to fit longest item, min-w-52 so it never looks too thin
        <div className="absolute top-full left-0 mt-3 w-max min-w-52 bg-card rounded-xl shadow-xl border border-border overflow-visible z-50">

          {/* Top accent bar */}
          <div className="overflow-hidden rounded-t-xl">
            <div className="h-[3px] bg-accent" />
          </div>

          <div className="p-2">
            {items.map((item, index) => (
              <FlyoutItem
                key={index}
                item={item}
                onClose={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu