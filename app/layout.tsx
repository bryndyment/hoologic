import { All } from '@/components/all'
import { AppContext } from '@/components/appContext'
import { ThemeContext } from '@/components/themeContext'
import { POSTS_QUERY } from '@/utilities/general'
import { SANITY_CLIENT } from '@/utilities/sanity'
import type { _Post } from '@/utilities/types'
import { CssBaseline } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'

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
        <ThemeContext>
          <CssBaseline />

          <AppContext>
            <All posts={posts}>{children}</All>
          </AppContext>
        </ThemeContext>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

export default RootLayout
