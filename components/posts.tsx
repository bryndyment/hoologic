'use client'

import { Summary } from '@/components/summary'
import { PATHNAME_ABOUT, PATHNAME_PERSON, PATHNAME_ROOT } from '@/utilities/constants'
import type { _Post } from '@/utilities/types'
// import { useWindowSize } from '@react-hook/window-size'
import { usePathname } from 'next/navigation'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
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
  // const size = useWindowSize()

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

  // useEffect(() => {
  //   const timer = setTimeout((masonryRef.current as any).masonry.layout, 5000)

  //   return () => clearTimeout(timer)
  // }, [masonryRef, size])

  const filteredPosts = useMemo(() => ([PATHNAME_ABOUT, PATHNAME_PERSON, PATHNAME_ROOT].includes(pathname) ? posts : posts.slice(0, -1)), [pathname, posts])

  return (
    <Masonry className="posts posts--mounted" ref={masonryRef}>
      {filteredPosts.map(post => (
        <Summary classes="summary" isLink key={post._id} post={post} />
      ))}
    </Masonry>
  )
}
