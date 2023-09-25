import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Modal (props: Props) {
  const { children, isOpen, onClose } = props

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) return

    if (event.target.classList.contains('modal-overlay')) {
      closeModal()
    }
  }

  const closeModal = () => {
    setTimeout(() => {
      onClose()
    }, 100)
  }

  return (
    <AnimatePresence>
      {
        isOpen && (
          <motion.div
            className='modal-overlay'
            initial={{ opacity: 0, position: 'fixed', inset: 0, zIndex: 10, background: 'rgba(10, 12, 28, 0.50)' }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div
              className='modal-content'
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: '600px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '26px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              role={'dialog'}
              aria-modal={'true'}
              aria-labelledby={'modal-title'}
            >
              {children}
            </motion.div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}
