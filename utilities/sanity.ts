import { DATASET, PROJECT_ID } from '@/utilities/constants'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

// constants

export const SANITY_CLIENT = createClient({ apiVersion: '2023-12-31', dataset: DATASET, projectId: PROJECT_ID, useCdn: false })

// functions

export const sanityImageUrl = (source: any) => imageUrlBuilder(SANITY_CLIENT).image(source).url()
