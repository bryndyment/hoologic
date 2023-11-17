import { sanityImageUrl } from '@/utilities/sanity'
import { Box } from '@mui/material'
import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'

// types

type _ExternalLinkSerializerProps = { children: ReactNode; value?: { blank: boolean; url: string } }
type _ImageSerializerProps = { value?: any }
type _InternalLinkSerializerProps = { children: ReactNode; value?: { slug: string } }
type _MailtoSerializerProps = { children: ReactNode; value?: { email: string } }
type _SpanSerializerProps = { children: ReactNode }

// components

const ExternalLinkSerializer: FC<_ExternalLinkSerializerProps> = ({ children, value }) =>
  value ? (
    value.blank ? (
      <a href={value.url} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    ) : (
      <a href={value.url}>{children}</a>
    )
  ) : null

const ImageSerializer: FC<_ImageSerializerProps> = ({ value }) => {
  const { aspectRatio } = getImageDimensions(value)

  return <Image alt="" height={609 / aspectRatio} src={sanityImageUrl(value)} style={{ aspectRatio }} width={609} />
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
