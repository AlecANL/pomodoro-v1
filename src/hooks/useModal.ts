import { useEffect } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const useModal = (parameters: Props) => {
  const { isOpen, onClose } = parameters

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

  return {
    handleKeyDown,
    handleClickOutside,
    closeModal
  }
}
