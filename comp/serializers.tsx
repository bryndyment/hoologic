import { Box } from '@mui/material'
import { getImageDimensions } from '@sanity/asset-utils'
// import Image from 'next/image'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'
import { sanityImageUrl } from '../utilities/sanity'

// types

type _ExternalLinkSerializerProps = { children: ReactNode; value?: { blank: boolean; url: string } }
type _ImageSerializerProps = { value?: any }
type _InternalLinkSerializerProps = { children: ReactNode; value?: { slug: string } }
type _MailtoSerializerProps = { children: ReactNode; value?: { email: string } }
type _SpanSerializerProps = { children: ReactNode }

// components

const ExternalLinkSerializer: FC<_ExternalLinkSerializerProps> = ({ children, value }) => {
  if (!value) return null

  if (value.blank) {
    return (
      <a href={value.url} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  return <a href={value.url}>{children}</a>
}

const ImageSerializer: FC<_ImageSerializerProps> = ({ value }) => {
  const { height, width } = getImageDimensions(value)

  // return <Image alt="" height={height} loading="eager" src={sanityImageUrl(value)} width={width} />
  return <img alt="" height={height} src={sanityImageUrl(value)} width={width} />
}

const InternalLinkSerializer: FC<_InternalLinkSerializerProps> = ({ children, value }) => (value ? <Link href={value.slug}>{children}</Link> : null)

const MailtoSerializer: FC<_MailtoSerializerProps> = ({ children, value }) =>
  value ? <a href={`mailto:${value.email || 'info@hoologic.io'}`}>{children}</a> : null

const SpanSerializer: FC<_SpanSerializerProps> = ({ children }) => <Box component="span">{children}</Box>

// constants

export const SERIALIZERS = {
  marks: {
    externalLink: ExternalLinkSerializer,
    internalLink: InternalLinkSerializer,
    mailto: MailtoSerializer,
    span: SpanSerializer
  },
  types: {
    image: ImageSerializer
  }
}
