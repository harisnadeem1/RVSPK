import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Level 3 — deepest items (e.g. Gold, Silver under Metals)
function LeafItem({ item, onItemClick }) {
  return (
    <Link
      to={item.path}
      onClick={onItemClick}
      className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
    >
      <span className="h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
      {item.label}
    </Link>
  )
}

// Level 2 — e.g. Metals, Energy, Governance
function SubAccordion({ item, onItemClick, depth = 1 }) {
  const [open, setOpen] = useState(false)

  const paddingLeft = depth === 1 ? 'px-6' : 'px-8'
  const indentLeft = depth === 1 ? 'ml-6' : 'ml-8'

  // Plain link
  if (!item.children) {
    return (
      <Link
        to={item.path}
        onClick={onItemClick}
        className={`flex items-center gap-2 ${paddingLeft} py-2.5 text-sm text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200`}
      >
        <span className="h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
        {item.label}
        {item.description && (
          <span className="ml-1 text-xs text-muted-foreground/60">{item.description}</span>
        )}
      </Link>
    )
  }

  // Has nested children
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between ${paddingLeft} py-2.5 text-sm font-medium text-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200`}
      >
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
          {item.label}
        </div>
        <ChevronRight
          className={`h-3.5 w-3.5 mr-4 opacity-50 transition-transform duration-200 ${
            open ? 'rotate-90' : ''
          }`}
        />
      </button>

      {open && (
        <div className={`${indentLeft} border-l-2 border-accent/20`}>
          {item.children.map((child, i) =>
            child.children ? (
              // Level 3 — recurse for deeper nesting
              <SubAccordion
                key={i}
                item={child}
                onItemClick={onItemClick}
                depth={depth + 1}
              />
            ) : (
              <LeafItem key={i} item={child} onItemClick={onItemClick} />
            )
          )}
        </div>
      )}
    </div>
  )
}

// Level 1 — top accordion row (e.g. About Us, Markets)
function MobileNavAccordion({ label, items, onItemClick, isActive }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between px-4 py-3 font-medium transition-colors duration-200 ${
          isActive ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'
        }`}
        aria-expanded={isExpanded}
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-5 w-5 opacity-60 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="bg-muted/30 py-1">
          {items.map((item, index) => (
            <SubAccordion
              key={index}
              item={item}
              onItemClick={onItemClick}
              depth={1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileNavAccordion