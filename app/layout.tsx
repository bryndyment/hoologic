import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import type { _Post } from '../util/types'
import { All } from '../comp/all'
import { AppContext } from '../comp/appContext'
import ThemeRegistry from '../comp/mui/themeRegistry'
import { POSTS_QUERY } from '../util/general'
import { SANITY_CLIENT } from '../util/sanity'

// types

type _RootLayoutProps = { children: ReactNode }

// metadata

export const metadata: Metadata = {
  metadataBase: new URL('https://hoologic.io')
}

// components

const RootLayout: FC<_RootLayoutProps> = async ({ children }) => {
  const posts = await SANITY_CLIENT.fetch<_Post[]>(POSTS_QUERY)

  return (
    <html lang="en-US">
      <body>
        <ThemeRegistry>
          <AppContext>
            <All posts={posts}>{children}</All>
          </AppContext>
        </ThemeRegistry>
      </body>
    </html>
  )
}

export default RootLayout
