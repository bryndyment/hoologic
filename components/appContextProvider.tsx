'use client'

import type { _Position } from '@/utilities/types'
import { Dispatch, FC, ReactNode, RefObject, SetStateAction, createContext, useMemo, useRef, useState } from 'react'

// types

type _AppContext = {
  allRef: RefObject<HTMLDivElement>
  postPosition?: _Position
  setPostPosition: Dispatch<SetStateAction<_Position | undefined>>
}

type _AppContextProviderProps = { children: ReactNode }

// context

export const APP_CONTEXT = createContext<_AppContext | null>(null)

// components

export const AppContextProvider: FC<_AppContextProviderProps> = ({ children }) => {
  const allRef = useRef(null)
  const [postPosition, setPostPosition] = useState<_Position>()

  const appContext = useMemo(() => ({ allRef, postPosition, setPostPosition }), [postPosition])

  return <APP_CONTEXT.Provider value={appContext}>{children}</APP_CONTEXT.Provider>
}
