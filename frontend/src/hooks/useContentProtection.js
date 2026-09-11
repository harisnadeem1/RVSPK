import { useEffect } from 'react'

const PROTECTION_ENABLED = true // ← toggle ON/OFF from here

export function useContentProtection() {
  useEffect(() => {
    if (!PROTECTION_ENABLED) return

    // Disable right click
    const handleContextMenu = (e) => e.preventDefault()

    // Disable text selection via keyboard (Ctrl+A, Ctrl+C, Ctrl+U, Ctrl+S)
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + (A, C, U, S, P)
      if (
        e.ctrlKey || e.metaKey
      ) {
        const blocked = ['a', 'c', 'u', 's', 'p']
        if (blocked.includes(e.key.toLowerCase())) {
          e.preventDefault()
        }
      }

      // F12
      if (e.key === 'F12') {
        e.preventDefault()
      }

      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        const blocked = ['i', 'j', 'c']
        if (blocked.includes(e.key.toLowerCase())) {
          e.preventDefault()
        }
      }
    }

    // Disable drag (prevents image dragging)
    const handleDragStart = (e) => e.preventDefault()

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('dragstart', handleDragStart)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('dragstart', handleDragStart)
    }
  }, [])
}