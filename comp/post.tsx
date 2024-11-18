'use client'

import { Box, SxProps, type Theme } from '@mui/material'
import { PortableText } from '@portabletext/react'
import { FC, RefObject, useEffect, useState } from 'react'
import type { _Position, _Post } from '../util/types'
import { SX_CONTENT, WHITE, WIDTH } from '../util/styles'
import { useAppContext } from './appContext'
import { SERIALIZERS } from './serializers'
import { Summary } from './summary'

// types

type _BlockProps = { blocks: any }
type _CssProps = { css: string }
type _ExtraProps = { post: _Post; postPosition?: _Position }
type _HtmlProps = { html: string }
type _PostProps = { post: _Post }

// constants

const SX_EXTRA = {
  bgcolor: WHITE,
  border: '0.5px solid',
  borderRadius: 0.5,
  clear: 'left',
  float: 'left',
  mb: [0.75, 0],
  mr: [0, 0.375],
  p: 1.5,
  transition: 'opacity 0.5s',
  width: 314,
  ...SX_CONTENT
}

const SX_POST_FN = ({ breakpoints }: Theme) => ({
  [breakpoints.only('xs')]: { '::after': { clear: 'both', content: "''", display: 'block' } },
  mx: 'auto',
  pb: 4,
  px: 0.375,
  width: WIDTH
})

const SX_POST_CONTENT_FN = ({ breakpoints }: Theme) => ({
  bgcolor: WHITE,
  border: '0.5px solid',
  borderRadius: 0.5,
  [breakpoints.only('xs')]: { clear: 'left', float: 'left', height: 314, maxHeight: 314, ml: 0, width: 314 },
  height: 634,
  maxHeight: 634,
  ml: 40,
  overflowY: 'scroll',
  p: 1.5,
  width: 634,
  ...SX_CONTENT
})

// functions

const getLeftOffset = (allRef: RefObject<HTMLDivElement>) => {
  if (!allRef.current) return 0

  const width = allRef.current.offsetWidth

  if (document.body.offsetWidth < width) {
    return 0
  }

  return `${(document.body.offsetWidth - width) / 2}px`
}

const styles = (allRef: RefObject<HTMLDivElement>, mounted: boolean, postPosition?: _Position) => {
  if (postPosition) {
    if (mounted) {
      return { left: getLeftOffset(allRef), top: '114px' }
    }

    return { left: `${postPosition.left}px`, top: `${postPosition.top}px` }
  }

  return {}
}

// components

const Block: FC<_BlockProps> = ({ blocks }) => (blocks ? <PortableText components={SERIALIZERS} value={blocks} /> : null)

const Css: FC<_CssProps> = ({ css }) => (css ? <style>{css}</style> : null)

const Extra: FC<_ExtraProps> = ({ post, postPosition }) => {
  if (post.extra) {
    return (
      <Box
        sx={{
          opacity: [1, postPosition ? 0 : 1],
          ...(SX_EXTRA as SxProps)
        }}
      >
        <PortableText components={SERIALIZERS} value={post.extra} />
      </Box>
    )
  }

  return null
}

const Html: FC<_HtmlProps> = ({ html }) => (html ? <Box dangerouslySetInnerHTML={{ __html: html }} /> : null)

export const Post: FC<_PostProps> = ({ post }) => {
  const { allRef, postPosition, setPostPosition } = useAppContext()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (postPosition) {
      setTimeout(() => setPostPosition(undefined), 500)
    }
  }, [postPosition, setPostPosition])

  return (
    <>
      <Box className="post" sx={SX_POST_FN}>
        <Css css={post.css} />

        <Summary isMounted post={post} styles={styles(allRef, isMounted, postPosition)} />

        <Extra post={post} postPosition={postPosition} />

        <Box sx={SX_POST_CONTENT_FN}>
          <Block blocks={post.body} />

          <Html html={post.html} />

          <Block blocks={post.bodyTwo} />

          <Html html={post.htmlTwo} />

          <Block blocks={post.bodyThree} />
        </Box>
      </Box>
    </>
  )
}
