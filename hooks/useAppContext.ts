import { useContext } from 'react'
import { APP_CONTEXT } from '../comp/appContext'

// hooks

export const useAppContext = () => {
  const context = useContext(APP_CONTEXT)

  if (context === null) {
    throw new Error('Context error.')
  }

  return context
}
