import { SERIALIZERS } from '@/components/serializers'
import { useAppContext } from '@/hooks/useAppContext'
import { sanityImageUrl } from '@/utilities/sanity'
import type { _Post } from '@/utilities/types'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react'

// types

type _ConditionalLinkProps = { currentLink: string; isLink: boolean; post: any; setCurrentLink: Dispatch<SetStateAction<string>> }
type _DescriptionProps = { description: any }
type _SummaryProps = { classes: string; isLink?: boolean; post: _Post; styles?: any }
type _TitleProps = { isTitleInBody: boolean; title: string }

// components

const ConditionalLink: FC<_ConditionalLinkProps> = ({ currentLink, isLink, post, setCurrentLink }) => {
  const { setPostPosition } = useAppContext()

  const classes = () => classNames('summary__link', { 'summary__link--current': post.slug.current === currentLink })

  const handleClick = ({ currentTarget }: MouseEvent<HTMLAnchorElement>) => {
    const position = currentTarget.getBoundingClientRect()

    setPostPosition({ left: position.left - 3, top: position.top })
  }

  const handleMouseOver = ({ currentTarget }: MouseEvent<HTMLAnchorElement>) =>
    setCurrentLink((currentTarget.href.match(/^https?:\/\/[^/]+(.*)/) as RegExpMatchArray)[1])

  if (!isLink) return null

  return <Link className={classes()} href={`/${post.slug.current}`} onClick={handleClick} onMouseOver={handleMouseOver} />
}

const Description: FC<_DescriptionProps> = ({ description }) =>
  description && (
    <div className="summary__description">
      <PortableText components={SERIALIZERS} value={description} />
    </div>
  )

export const Summary: FC<_SummaryProps> = ({ classes, isLink = false, post, styles }) => {
  const [currentLink, setCurrentLink] = useState('')

  const { aspectRatio } = getImageDimensions(post.thumbnailImage)

  const handleMouseLeave = () => setCurrentLink('')

  return (
    <div className={classes} onMouseLeave={handleMouseLeave} style={styles}>
      <ConditionalLink currentLink={currentLink} isLink={isLink} post={post} setCurrentLink={setCurrentLink} />

      <div className="summary__inner">
        <Image
          alt={post.title}
          height={289 / aspectRatio}
          priority={post.slug.current === 'about'}
          src={sanityImageUrl(post.thumbnailImage)}
          style={{ aspectRatio }}
          width={289}
        />

        <Title isTitleInBody={post.titleInBody} title={post.title} />

        <Description description={post.description} />
      </div>
    </div>
  )
}

const Title: FC<_TitleProps> = ({ isTitleInBody, title }) => (isTitleInBody ? null : <h1 className="summary__heading">{title}</h1>)
