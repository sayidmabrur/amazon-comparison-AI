'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, useRef } from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [rippleActive, setRippleActive] = useState(false)
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  // Disable scroll during ripple animation to prevent flicker + scrollbar
  useEffect(() => {
    if (rippleActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [rippleActive])

  if (!mounted) return null

  const toggleTheme = () => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setRipplePos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    setRippleActive(true)
  }

  const onRippleComplete = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    setRippleActive(false)
  }

  const targetBgColor = theme === 'light' ? '#121212' : '#fff'

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className="relative flex items-center justify-center p-2 rounded-full border transition-colors duration-700"
        style={{
          backgroundColor: 'var(--bg)',
          borderColor: 'var(--border)',
          zIndex: 20,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Sun size={20} style={{ color: 'var(--text)' }} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Moon size={20} style={{ color: 'var(--text)' }} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {rippleActive && (
          <motion.div
            initial={{
              top: ripplePos.y,
              left: ripplePos.x,
              width: 100,
              height: 100,
              opacity: 0.4,
              borderRadius: '50%',
              position: 'fixed',
              backgroundColor: targetBgColor,
              pointerEvents: 'none',
              zIndex: 10,
              x: '-50%',
              y: '-50%',
              scale: 0,
            }}
            animate={{
              scale: 30,
              opacity: 1,
              transition: { duration: 0.6, ease: 'easeOut' },
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onAnimationComplete={onRippleComplete}
          />
        )}
      </AnimatePresence>
    </>
  )
}
