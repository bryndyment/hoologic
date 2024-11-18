'use client'

import { useContextGuard } from '@hoologic/use-context-guard'
import { createContext, Dispatch, FC, ReactNode, RefObject, SetStateAction, useMemo, useRef, useState } from 'react'
import type { _Position } from '../util/types'

// types

type _AppContext = {
  allRef: RefObject<HTMLDivElement>
  postPosition?: _Position
  setPostPosition: Dispatch<SetStateAction<_Position | undefined>>
}

type _AppContextProps = { children: ReactNode }

// context

const APP_CONTEXT = createContext<_AppContext | null>(null)

// hooks

export const useAppContext = () => useContextGuard(APP_CONTEXT)

// components

export const AppContext: FC<_AppContextProps> = ({ children }) => {
  const allRef = useRef(null)
  const [postPosition, setPostPosition] = useState<_Position>()

  const appContext = useMemo(() => ({ allRef, postPosition, setPostPosition }), [postPosition])

  return <APP_CONTEXT.Provider value={appContext}>{children}</APP_CONTEXT.Provider>
}
