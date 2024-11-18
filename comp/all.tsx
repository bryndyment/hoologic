'use client'

import { Box, SxProps } from '@mui/material'
import { FC, ReactNode } from 'react'
import type { _Post } from '../util/types'
import { WIDTH } from '../util/styles'
import { useAppContext } from './appContext'
import { Company } from './company'
import { Location } from './location'
import { Logo } from './logo'
import { Person } from './person'
import { Posts } from './posts'

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
  position: 'relative',
  transition: 'width 0.5s',
  whitespace: 'nowrap',
  width: WIDTH
}

// components

export const All: FC<_AllProps> = ({ children, posts }) => {
  const { allRef } = useAppContext()

  return (
    <Box ref={allRef} sx={{ mx: 'auto', py: 4, width: WIDTH }}>
      <Box component="header" sx={{ ...FOOTER_HEADER_SX, mb: 4 } as SxProps}>
        <Company />

        <Logo />
      </Box>

      {children}

      <Posts posts={posts.filter(post => post.visible)} />

      <Box component="footer" sx={FOOTER_HEADER_SX as SxProps}>
        <Person />

        <Location />
      </Box>
    </Box>
  )
}
