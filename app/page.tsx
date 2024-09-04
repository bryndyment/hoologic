import type { Metadata } from 'next/types'
import { FC } from 'react'
import { PATHNAME_ROOT } from '../util/general'

// metadata

export const metadata: Metadata = {
  alternates: {
    canonical: PATHNAME_ROOT
  },
  description: 'Hoo Logic | React + TypeScript',
  title: 'Hoo Logic – React + TypeScript'
}

// components

const HomePage: FC = () => null

export default HomePage
