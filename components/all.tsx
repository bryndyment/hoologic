'use client'

import { Company } from '@/components/company'
import { Location } from '@/components/location'
import { Logo } from '@/components/logo'
import { Person } from '@/components/person'
import { Posts } from '@/components/posts'
import { useAppContext } from '@/hooks/useAppContext'
import { BREAKPOINTS } from '@/utilities/styles'
import { _Post } from '@/utilities/types'
import { Box, SxProps } from '@mui/material'
import { FC, ReactNode } from 'react'

// types

type _AllProps = {
  children: ReactNode
  posts: _Post[]
}

// constants

const FOOTER_HEADER_SX = {
  display: 'flex',
  height: 50,
  justifyContent: 'space-between',
  ml: 0,
  mr: 'auto',
  mt: 0,
  position: 'relative',
  transition: 'width 0.5s',
  whitespace: 'nowrap',
  width: BREAKPOINTS
}

// components

export const All: FC<_AllProps> = ({ children, posts }) => {
  const { allRef } = useAppContext()

  return (
    <Box ref={allRef} sx={{ mx: 'auto', my: 0, py: 4, width: BREAKPOINTS }}>
      <Box component="header" sx={{ ...FOOTER_HEADER_SX, mb: 4 } as SxProps}>
        <Company />

        <Logo />
      </Box>

      {children}

      <Posts posts={posts.filter(post => post.visible)} />

      <Box component="footer" sx={{ ...FOOTER_HEADER_SX, mb: 0 } as SxProps}>
        <Person />

        <Location />
      </Box>
    </Box>
  )
}
