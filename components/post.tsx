'use client'

import { SERIALIZERS } from '@/components/serializers'
import { Summary } from '@/components/summary'
import { useAppContext } from '@/hooks/useAppContext'
import type { _Position, _Post } from '@/utilities/types'
import { PortableText } from '@portabletext/react'
import React, { FC, useEffect, useState } from 'react'

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

const getLeftOffset = () => {
  const width = (document.getElementsByClassName('all')[0] as HTMLDivElement).offsetWidth

  if (document.body.offsetWidth < width) {
    return 0
  }

  return `${(document.body.offsetWidth - width) / 2}px`
}

const styles = (mounted: boolean, postPosition?: _Position) => {
  if (postPosition) {
    if (mounted) {
      return { left: getLeftOffset(), top: '114px' }
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
    <div className={getClasses('extra', mounted, postPosition)}>
      <div className="extra__div">
        <PortableText components={SERIALIZERS} value={post.extra} />
      </div>
    </div>
  ) : null

const Html: FC<_HtmlProps> = ({ html }) => (html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null)

const Title: FC<_TitleProps> = ({ title, titleInBody }) => (titleInBody ? <h2 className="detail__heading">{title}</h2> : null)

// components

export const Post: FC<_PostProps> = ({ post }) => {
  const { postPosition, setPostPosition } = useAppContext()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (postPosition) {
      setTimeout(() => setPostPosition(undefined), 500)
    }
  }, [postPosition, setPostPosition])

  return (
    <>
      <div className="detail">
        <Css css={post.css} />

        <Summary classes={getClasses('summary', mounted, postPosition)} post={post} styles={styles(mounted, postPosition)} />

        <Extra mounted={mounted} post={post} postPosition={postPosition} />

        <div className={getClasses('detail__content', mounted, postPosition, post.centerBody)}>
          <Title title={post.title} titleInBody={post.titleInBody} />

          <Block blocks={post.body} />

          <Html html={post.html} />

          <Block blocks={post.bodyTwo} />

          <Html html={post.htmlTwo} />

          <Block blocks={post.bodyThree} />
        </div>
      </div>
    </>
  )
}
