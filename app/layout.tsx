import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import type { _Post } from '../utilities/types'
import { All } from '../components/all'
import { AppContext } from '../components/appContext'
import ThemeRegistry from '../components/mui/themeRegistry'
import { POSTS_QUERY } from '../utilities/general'
import { SANITY_CLIENT } from '../utilities/sanity'

// types

type _RootLayoutProps = { children: ReactNode }

// metadata

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hoologic.io')
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
