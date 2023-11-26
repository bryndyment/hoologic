'use client'

import { SERIALIZERS } from '@/components/serializers'
import { Summary } from '@/components/summary'
import { useAppContext } from '@/hooks/useAppContext'
import { BLACK } from '@/utilities/styles'
import type { _Position, _Post } from '@/utilities/types'
import { Box } from '@mui/material'
import { PortableText } from '@portabletext/react'
import React, { FC, RefObject, useEffect, useState } from 'react'

// types

type _BlockProps = { blocks: any }
type _CssProps = { css: string }
type _ExtraProps = { mounted: boolean; post: _Post; postPosition: any }
type _HtmlProps = { html: string }
type _PostProps = { post: _Post }
type _TitleProps = { title: string; titleInBody: boolean }

// functions

const getClasses = (item: string, mounted: boolean, postPosition?: _Position, centerBody?: boolean) => {
  let classes = item

  if (postPosition && window.matchMedia('(min-width: 640px)').matches) {
    if (mounted) classes += ` ${item}--during`
    else classes += ` ${item}--before`
  } else classes += ` ${item}--after`

  if (centerBody) classes += ` ${item}--center`

  return classes
}

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

const Extra: FC<_ExtraProps> = ({ mounted, post, postPosition }) =>
  post.extra ? (
    <Box className={getClasses('extra', mounted, postPosition)}>
      <Box className="extra__div" sx={{ a: { color: BLACK } }}>
        <PortableText components={SERIALIZERS} value={post.extra} />
      </Box>
    </Box>
  ) : null

const Html: FC<_HtmlProps> = ({ html }) => (html ? <Box dangerouslySetInnerHTML={{ __html: html }} /> : null)

const Title: FC<_TitleProps> = ({ title, titleInBody }) => (titleInBody ? <h2 className="detail__heading">{title}</h2> : null)

// components

export const Post: FC<_PostProps> = ({ post }) => {
  const { allRef, postPosition, setPostPosition } = useAppContext()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (postPosition) {
      setTimeout(() => setPostPosition(undefined), 500)
    }
  }, [postPosition, setPostPosition])

  return (
    <>
      <Box className="detail">
        <Css css={post.css} />

        <Summary classes={getClasses('summary', mounted, postPosition)} post={post} styles={styles(allRef, mounted, postPosition)} />

        <Extra mounted={mounted} post={post} postPosition={postPosition} />

        <Box className={getClasses('detail__content', mounted, postPosition, post.centerBody)}>
          <Title title={post.title} titleInBody={post.titleInBody} />

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
