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
        className="block px-4 py-3 text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
      >
        <div className="font-medium">{item.label}</div>
        {item.description && (
          <div className="text-sm text-muted-foreground mt-0.5">{item.description}</div>
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
      <button className="flex w-full items-center justify-between px-4 py-3 text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200">
        <span className="font-medium">{item.label}</span>
        <ChevronRight className="h-3.5 w-3.5 opacity-60" />
      </button>

      {flyoutOpen && (
        <div className="absolute left-full top-0 z-50 pl-1">
          <div className="min-w-[200px] rounded-xl border border-border bg-card shadow-xl overflow-hidden">
            <div className="py-2">
              {item.children.map((child, i) => (
                <Link
                  key={i}
                  to={child.path}
                  onClick={onClose}
                  className="block px-4 py-3 text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                >
                  <div className="font-medium">{child.label}</div>
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
        <div className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl shadow-xl border border-border overflow-visible z-50">
          <div className="py-2">
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