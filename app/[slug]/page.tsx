import { Post } from '@/components/post'
import { POSTS_QUERY } from '@/utilities/general'
import { SANITY_CLIENT } from '@/utilities/sanity'
import type { _Post } from '@/utilities/types'
import type { Metadata } from 'next/types'
import { FC } from 'react'

// types

type _PostPageProps = { params: { slug: string } }
type _generateMetadataParams = { params: { slug: string } }

// metadata

export const generateMetadata = async ({ params: { slug } }: _generateMetadataParams): Promise<Metadata> => {
  const posts = await SANITY_CLIENT.fetch<_Post[]>(POSTS_QUERY)

  const post = posts.find(post => post.slug.current === decodeURIComponent(slug))

  if (!post) {
    process.exit(1)
  }

  return {
    alternates: {
      canonical: `/${slug}`
    },
    description: `${post.title} | Hoo Logic 株式会社`,
    title: `${post.title} | Hoo Logic 株式会社`
  }
}

// functions

export const generateStaticParams = async () => {
  const posts = await SANITY_CLIENT.fetch<_Post[]>(POSTS_QUERY)

  return posts.map(post => ({ slug: post.slug.current }))
}

// components

const PostPage: FC<_PostPageProps> = async ({ params: { slug } }) => {
  const posts = await SANITY_CLIENT.fetch<_Post[]>(POSTS_QUERY)

  const post = posts.find(post => post.slug.current === decodeURIComponent(slug))

  if (!post) {
    process.exit(1)
  }

  return <Post post={post} />
}

export default PostPage
