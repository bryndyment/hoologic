import { DATASET, PROJECT_ID } from '@/utilities/common'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

// constants

export const SANITY_CLIENT = createClient({ apiVersion: '2023-11-14', dataset: DATASET, projectId: PROJECT_ID, useCdn: process.env.NODE_ENV === 'production' })

// functions

export const sanityImageUrl = (source: any) => imageUrlBuilder(SANITY_CLIENT).image(source).url()
