import type { Metadata } from 'next/types'
import { FC } from 'react'

// metadata

export const metadata: Metadata = {
  alternates: {
    canonical: '/test'
  },
  description: 'Hoo Logic : React + TypeScript',
  title: 'Hoo Logic : React + TypeScript'
}

// components

const HomePage: FC = () => null

export default HomePage
