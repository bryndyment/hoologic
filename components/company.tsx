'use client'

import { NOTO_SANS_JP } from '@/utilities/fonts'
import { PATHNAME_ROOT } from '@/utilities/general'
import { BLACK, WHITE } from '@/utilities/styles'
import { Box, Link, Theme, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import RouterLink from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

// constants

const SX_FN = ({ breakpoints }: Theme) => ({
  [breakpoints.only('sm')]: { '::after': { bottom: 3, color: blueGrey[50], content: "'株式会社'", fontSize: 57, ml: 0.5, position: 'relative' } },
  color: WHITE,
  fontFamily: NOTO_SANS_JP.style.fontFamily,
  fontSize: 65,
  fontWeight: 700,
  ml: -0.3125,
  textShadow: `-0.5px 0 ${BLACK}, 0 0.5px ${BLACK}, 0.5px 0 ${BLACK}, 0 -0.5px ${BLACK}`,
  textTransform: 'uppercase'
})

// components

export const Company: FC = () => {
  const pathname = usePathname()

  return pathname === PATHNAME_ROOT ? (
    <Typography sx={SX_FN} variant="h1">
      <Inner />
    </Typography>
  ) : (
    <Link component={RouterLink} href={PATHNAME_ROOT} sx={SX_FN}>
      <Inner />
    </Link>
  )
}

const Inner: FC = () => (
  <>
    <>Hoo</>

    <Box component="span" sx={{ display: ['none', 'inline'] }}>
      <> Logic </>
    </Box>
  </>
)
