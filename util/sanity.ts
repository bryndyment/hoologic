import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { createClient } from 'next-sanity'

// constants

export const SANITY_CLIENT = createClient({ apiVersion: '2023-11-21', dataset: 'live', projectId: 'w9bqr9i3', useCdn: false })

// functions

export const sanityImageUrl = (source: SanityImageSource) => imageUrlBuilder(SANITY_CLIENT).image(source).url()
