import { AppContextProvider } from '@/components/appContextProvider'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Posts } from '@/components/posts'
import { ThemeContextProvider } from '@/components/themeContextProvider'
import '@/styles/index.scss'
import { POSTS_QUERY } from '@/utilities/common'
import { SANITY_CLIENT } from '@/utilities/sanity'
import type { _Post } from '@/utilities/types'
import { CssBaseline } from '@mui/material'
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
        <ThemeContextProvider>
          <CssBaseline />

          <AppContextProvider>
            <div className="all all--home">
              <Header />

              {children}

              <Posts posts={posts.filter(post => post.visible)} />

              <Footer />
            </div>
          </AppContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}

export default RootLayout
