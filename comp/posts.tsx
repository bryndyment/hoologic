'use client'

import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
import Masonry from 'react-masonry-component'
import type { _Post } from '../util/types'
import { PATHNAME_ABOUT, PATHNAME_PERSON, PATHNAME_ROOT } from '../util/general'
import { Summary } from './summary'

// types

type _PostsProps = { posts: _Post[] }

// components

export const Posts: FC<_PostsProps> = ({ posts: initialPosts }) => {
  const pathname = usePathname()
  const [posts, setPosts] = useState(initialPosts)

  useEffect(() => {
    if (pathname === PATHNAME_ROOT) {
      setPosts(initialPosts)
    }
  }, [initialPosts, pathname, setPosts])

  useEffect(() => {
    const postIndex = posts.findIndex(post => post.slug.current === pathname.slice(1))

    if (postIndex !== -1 && postIndex !== posts.length - 1) {
      setPosts(posts.filter((_, index) => index !== postIndex).concat(posts[postIndex]))
    }
  }, [pathname, posts, setPosts])

  const filteredPosts = useMemo(() => ([PATHNAME_ABOUT, PATHNAME_PERSON, PATHNAME_ROOT].includes(pathname) ? posts : posts.slice(0, -1)), [pathname, posts])

  return (
    <Box sx={{ '> div': { position: 'relative' }, maxWidth: '100%', mb: 3.25, minWidth: 320, mx: 'auto' }}>
      <Masonry>
        {filteredPosts.map(post => (
          <Summary isLink key={post._id} post={post} />
        ))}
      </Masonry>
    </Box>
  )
}
