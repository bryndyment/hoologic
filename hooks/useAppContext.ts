import { APP_CONTEXT } from '@/components/appContext'
import { useContext } from 'react'

// hooks

export const useAppContext = () => {
  const context = useContext(APP_CONTEXT)

  if (context === null) {
    throw new Error('Context error.')
  }

  return context
}
