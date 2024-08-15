import { Box, Link, Typography } from '@mui/material'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
// import Image from 'next/image'
import RouterLink from 'next/link'
import React, { Dispatch, FC, MouseEvent, ReactNode, SetStateAction, useState } from 'react'
import type { _Post } from '../util/types'
import { useAppContext } from '../hooks/useAppContext'
import { sanityImageUrl } from '../util/sanity'
import { BLACK, SX_CONTENT, WHITE } from '../util/styles'
import { SERIALIZERS } from './serializers'

// types

type _ConditionalLinkProps = { children: ReactNode; currentLink: string; isLink: boolean; post: any; setCurrentLink: Dispatch<SetStateAction<string>> }
type _DescriptionProps = { description: any }
type _SummaryProps = { isLink?: boolean; isMounted?: boolean; post: _Post; styles?: any }
type _TitleProps = { title: string }

// components

const ConditionalLink: FC<_ConditionalLinkProps> = ({ children, currentLink, isLink, post, setCurrentLink }) => {
  const { setPostPosition } = useAppContext()

  const handleClick = ({ currentTarget }: MouseEvent<HTMLAnchorElement>) => {
    const position = currentTarget.getBoundingClientRect()

    setPostPosition({ left: position.left - 3, top: position.top })
  }

  const handleMouseOver = ({ currentTarget }: MouseEvent<HTMLAnchorElement>) =>
    setCurrentLink((currentTarget.href.match(/^https?:\/\/[^/]+(.*)/) as RegExpMatchArray)[1])

  if (isLink) {
    return (
      <Link
        component={RouterLink}
        href={`/${post.slug.current}`}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        sx={{
          '> div': { transition: 'transform 0.1s', ...(post.slug.current === currentLink.slice(1) && { transform: 'scale(0.99)' }) },
          color: BLACK,
          display: 'block'
        }}
      >
        {children}
      </Link>
    )
  }

  return children
}

const Description: FC<_DescriptionProps> = ({ description }) => description && <PortableText components={SERIALIZERS} value={description} />

export const Summary: FC<_SummaryProps> = ({ isLink = false, isMounted = false, post, styles }) => {
  const { postPosition } = useAppContext()
  const [currentLink, setCurrentLink] = useState('')

  const { height, width } = getImageDimensions(post.thumbnailImage)

  const handleMouseOut = () => setCurrentLink('')

  return (
    <Box
      onMouseOut={handleMouseOut}
      style={styles}
      sx={{
        mb: 0.75,
        mx: 0.375,
        width: 314,
        ...(isLink
          ? {}
          : isMounted && postPosition && window.matchMedia('(min-width: 960px)').matches
            ? { position: 'absolute', transition: 'left 0.5s, top 0.5s', zIndex: 668 }
            : { float: 'left', ml: 0 })
      }}
    >
      <ConditionalLink currentLink={currentLink} isLink={isLink} post={post} setCurrentLink={setCurrentLink}>
        <Box sx={{ bgcolor: WHITE, border: '0.5px solid', borderRadius: 0.5, p: 1.5, ...SX_CONTENT }}>
          {/* <Image alt={post.title} height={height} loading="eager" src={sanityImageUrl(post.thumbnailImage)} width={width} /> */}
          <img alt={post.title} height={height} src={sanityImageUrl(post.thumbnailImage)} width={width} />

          <Title title={post.title} />

          <Description description={post.description} />
        </Box>
      </ConditionalLink>
    </Box>
  )
}

const Title: FC<_TitleProps> = ({ title }) => (
  <Typography sx={{ fontSize: 19, fontWeight: 700, mb: 1.5, mt: 2.25, textTransform: 'uppercase' }} variant="h1">
    {title}
  </Typography>
)
