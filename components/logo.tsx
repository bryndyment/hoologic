'use client'

import { useAppContext } from '@/hooks/useAppContext'
import { PATHNAME_ABOUT } from '@/utilities/general'
import { BLACK, RED, WHITE } from '@/utilities/styles'
import { Box, Link } from '@mui/material'
import RouterLink from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

// constants

const LOGO = (
  <Box sx={{ position: 'absolute', right: 2.5, svg: { borderRadius: 0.5 } }}>
    <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
      <rect fill={BLACK} height="50" width="50" />
      <rect fill={WHITE} height="30" width="10" x="10" y="10" />
      <rect fill={WHITE} height="10" width="30" x="10" y="20" />
      <rect fill={RED} height="10" width="10" x="30" y="10" />
      <rect fill={RED} height="10" width="20" x="30" y="30" />
    </svg>
  </Box>
)

// components

export const Logo: FC = () => {
  const { setPostPosition } = useAppContext()
  const pathname = usePathname()

  const handleClick = () => setPostPosition({ left: -314, top: 114 })

  return pathname === PATHNAME_ABOUT ? (
    <Box component="span">{LOGO}</Box>
  ) : (
    <Link component={RouterLink} href={PATHNAME_ABOUT} onClick={handleClick} sx={{ ':hover': { transform: 'scale(0.96)', transition: 'transform 0.1s' } }}>
      {LOGO}
    </Link>
  )
}
