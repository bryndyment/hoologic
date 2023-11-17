import { PATHNAME_ROOT, zMobileMediaQuery } from '@/utilities/constants'
import { NOTO_SANS_JP } from '@/utilities/fonts'
import { Box } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'

// types

type _CompanyProps = { pathname: string }

// components

const Inner: FC = () => (
  <>
    <>H</>

    <Box component="span" sx={{ display: 'none', [zMobileMediaQuery]: { display: 'inline' } }}>
      L
    </Box>

    <Box component="span" sx={{ [zMobileMediaQuery]: { display: 'none' } }}>
      oo
    </Box>

    <Box component="span" sx={{ [zMobileMediaQuery]: { display: 'none' } }}>
      <> Logic</>
    </Box>
  </>
)

export const Company: FC<_CompanyProps> = ({ pathname }) => {
  if (pathname === PATHNAME_ROOT) {
    return (
      <h1 className="name" style={{ fontFamily: NOTO_SANS_JP.style.fontFamily }}>
        <Inner />
      </h1>
    )
  }

  return (
    <Link className="name name--interior" href={PATHNAME_ROOT} style={{ fontFamily: NOTO_SANS_JP.style.fontFamily, fontWeight: '700' }}>
      <Inner />
    </Link>
  )
}
