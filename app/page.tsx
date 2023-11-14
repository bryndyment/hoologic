import { PATHNAME_HOME } from '@/utilities/constants'
import type { Metadata } from 'next/types'
import { FC } from 'react'

// metadata

export const metadata: Metadata = {
  alternates: {
    canonical: PATHNAME_HOME
  },
  description: 'Hoo Logic 株式会社 | React + TypeScript',
  title: 'Hoo Logic 株式会社 | React + TypeScript'
}

// components

const HomePage: FC = () => null

export default HomePage
