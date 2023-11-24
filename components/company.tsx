import { PATHNAME_ROOT, zMobileMediaQuery } from '@/utilities/constants'
import { NOTO_SANS_JP } from '@/utilities/fonts'
import { Box, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import Link from 'next/link'
import { FC } from 'react'

// types

type _CompanyProps = { pathname: string }

// components

export const Company: FC<_CompanyProps> = ({ pathname }) =>
  pathname === PATHNAME_ROOT ? (
    <Typography
      className="name"
      sx={{ '::after': { color: blueGrey[50] }, fontFamily: NOTO_SANS_JP.style.fontFamily, fontWeight: 700, lineHeight: 0.65 }}
      variant="h1"
    >
      <Inner />
    </Typography>
  ) : (
    <Link className="name name--interior" href={PATHNAME_ROOT} style={{ fontFamily: NOTO_SANS_JP.style.fontFamily, fontWeight: '700' }}>
      <Inner />
    </Link>
  )

const Inner: FC = () => (
  <>
    <>Hoo</>

    <Box component="span" sx={{ [zMobileMediaQuery]: { display: 'none' } }}>
      <> Logic</>
    </Box>
  </>
)
