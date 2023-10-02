import { type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TooltipStyled } from '@components/atoms/tooltip/tooltip.styled.tsx'

interface Props {
  children?: ReactNode
  show: boolean
}

export function Tooltip (props: Props) {
  const { children, show } = props

  return (
    <AnimatePresence>
      {
        show
          ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '6px',
                borderRadius: '4px',
                zIndex: 999,
                minWidth: 'max-content'
              }}
            >
              <TooltipStyled>
                {children}
              </TooltipStyled>
            </motion.div>
            )
          : null
      }
    </AnimatePresence>
  )
}
