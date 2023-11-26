'use client'

import { useAppContext } from '@/hooks/useAppContext'
import profileImage from '@/public/profile.png'
import { PATHNAME_PERSON } from '@/utilities/general'
import { Box, Link } from '@mui/material'
import Image from 'next/image'
import RouterLink from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

// constants

const PERSON = (
  <Box sx={{ height: 50, img: { borderRadius: 0.5, height: 'auto', width: '100%' }, width: 50 }}>
    <Image alt="Bryn Dyment" src={profileImage} />
  </Box>
)

// components

export const Person: FC = () => {
  const { setPostPosition } = useAppContext()
  const pathname = usePathname()

  const handleClick = () => setPostPosition({ left: -314, top: 114 })

  if (pathname === PATHNAME_PERSON) {
    return (
      <Box component="span" sx={{ mx: 0.375 }}>
        {PERSON}
      </Box>
    )
  }

  return (
    <Link
      component={RouterLink}
      href={PATHNAME_PERSON}
      onClick={handleClick}
      sx={{ ':hover': { transform: 'scale(0.96)', transition: 'transform 0.1s' }, mx: 0.375 }}
    >
      {PERSON}
    </Link>
  )
}
