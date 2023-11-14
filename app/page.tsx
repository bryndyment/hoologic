import { PATHNAME_ROOT } from '@/utilities/constants'
import type { Metadata } from 'next/types'
import { FC } from 'react'

// metadata

export const metadata: Metadata = {
  alternates: {
    canonical: PATHNAME_ROOT
  },
  description: 'Hoo Logic 株式会社 | React + TypeScript',
  title: 'Hoo Logic 株式会社 | React + TypeScript'
}

// components

const HomePage: FC = () => null

export default HomePage
