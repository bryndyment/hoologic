import { PATHNAME_ROOT } from '@/utilities/constants'
import { NOTO_SANS_JP } from '@/utilities/fonts'
import { Box } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'

// types

type _CompanyProps = { pathname: string }

// components

export const Company: FC<_CompanyProps> = ({ pathname }) => {
  if (pathname === PATHNAME_ROOT) {
    return (
      <h1 className="name" style={{ fontFamily: NOTO_SANS_JP.style.fontFamily }}>
        <>Hoo</>

        <Box className="name--logic" component="span">
          <> Logic</>
        </Box>
      </h1>
    )
  }

  return (
    <Link className="name name--interior" href={PATHNAME_ROOT} style={{ fontFamily: NOTO_SANS_JP.style.fontFamily, fontWeight: '700' }}>
      <>Hoo</>

      <Box className="name--logic" component="span">
        <> Logic</>
      </Box>
    </Link>
  )
}
