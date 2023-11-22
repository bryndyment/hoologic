import { SERIALIZERS } from '@/components/serializers'
import { useAppContext } from '@/hooks/useAppContext'
import { sanityImageUrl } from '@/utilities/sanity'
import type { _Post } from '@/utilities/types'
import { Box } from '@mui/material'
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

  const classes = () => classNames('summary__link', { 'summary__link--current': post.slug.current === currentLink.slice(1) })

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
    <Box className="summary__description">
      <PortableText components={SERIALIZERS} value={description} />
    </Box>
  )

export const Summary: FC<_SummaryProps> = ({ classes, isLink = false, post, styles }) => {
  const [currentLink, setCurrentLink] = useState('')

  const { height, width } = getImageDimensions(post.thumbnailImage)

  const handleMouseLeave = () => setCurrentLink('')

  return (
    <Box className={classes} onMouseLeave={handleMouseLeave} style={styles}>
      <ConditionalLink currentLink={currentLink} isLink={isLink} post={post} setCurrentLink={setCurrentLink} />

      <Box className="summary__inner">
        <Image alt={post.title} height={height} src={sanityImageUrl(post.thumbnailImage)} width={width} />

        <Title isTitleInBody={post.titleInBody} title={post.title} />

        <Description description={post.description} />
      </Box>
    </Box>
  )
}

const Title: FC<_TitleProps> = ({ isTitleInBody, title }) => (isTitleInBody ? null : <h1 className="summary__heading">{title}</h1>)
