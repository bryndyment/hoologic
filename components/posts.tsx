'use client'

import { Summary } from '@/components/summary'
import { PATHNAME_BRYN } from '@/utilities/constants'
import type { _Post } from '@/utilities/types'
import { useWindowSize } from '@react-hook/window-size'
import { usePathname } from 'next/navigation'
import React, { FC, useEffect, useRef, useState } from 'react'
import Masonry from 'react-masonry-component'

// types

type _PostsProps = { posts: _Post[] }

// hooks

const useHooks = (initialPosts: _Post[]) => {
  const masonryRef = useRef()
  const [posts, setPosts] = useState(initialPosts)

  return { masonryRef, posts, setPosts }
}

// components

export const Posts: FC<_PostsProps> = ({ posts: initialPosts }) => {
  const { masonryRef, posts, setPosts } = useHooks(initialPosts)
  const pathname = usePathname()
  const [mounted, setMounted] = useState('posts')
  const size = useWindowSize()

  useEffect(() => {
    const postIndex = posts.findIndex(post => post.slug.current === pathname.slice(1))

    if (postIndex !== -1 && postIndex !== posts.length - 1) {
      setPosts(posts.filter((_, index) => index !== postIndex).concat(posts[postIndex]))
    }
  }, [mounted, pathname, posts, setPosts])

  useEffect(() => setMounted('posts posts--mounted'), [])

  useEffect(() => (masonryRef.current as any).masonry.layout(), [masonryRef, size])

  const updatedPosts = pathname === PATHNAME_BRYN ? posts : posts.slice(0, -1)

  return (
    <Masonry className={mounted} ref={masonryRef}>
      {updatedPosts.map(post => (
        <Summary classes="summary" isLink key={post._id} post={post} />
      ))}
    </Masonry>
  )
}
