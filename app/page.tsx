import { PATHNAME_ROOT } from '@/utilities/general'
import type { Metadata } from 'next/types'
import { FC } from 'react'

// metadata

export const metadata: Metadata = {
  alternates: {
    canonical: PATHNAME_ROOT
  },
  description: 'Hoo Logic | React | Tōkyō',
  title: 'Hoo Logic | React | Tōkyō'
}

// components

const HomePage: FC = () => null

export default HomePage
