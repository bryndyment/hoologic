'use client'

// https://github.com/mui/material-ui/blob/master/examples/material-ui-nextjs-ts/src/components/ThemeRegistry/EmotionCache.tsx

import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache'
import createCache from '@emotion/cache'
import { CacheProvider as DefaultCacheProvider } from '@emotion/react'
import { useServerInsertedHTML } from 'next/navigation'
import * as React from 'react'

export type NextAppDirEmotionCacheProviderProps = {
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: { children: React.ReactNode; value: EmotionCache }) => null | React.JSX.Element
  children: React.ReactNode
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>
}

// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
const NextAppDirEmotionCacheProvider = (props: NextAppDirEmotionCacheProviderProps) => {
  const { CacheProvider = DefaultCacheProvider, children, options } = props

  const [registry] = React.useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: { isGlobal: boolean; name: string }[] = []
    cache.insert = (...args) => {
      const [selector, serialized] = args
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          isGlobal: !selector,
          name: serialized.name
        })
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const inserted = registry.flush()
    if (inserted.length === 0) {
      return null
    }
    let styles = ''
    let dataEmotionAttribute = registry.cache.key

    const globals: {
      name: string
      style: string
    }[] = []

    inserted.forEach(({ isGlobal, name }) => {
      const style = registry.cache.inserted[name] || ''

      if (typeof style !== 'boolean') {
        if (isGlobal) {
          globals.push({ name, style })
        } else {
          styles += style
          dataEmotionAttribute += ` ${name}`
        }
      }
    })

    return (
      <React.Fragment>
        {globals.map(({ name, style }) => (
          <style dangerouslySetInnerHTML={{ __html: style }} data-emotion={`${registry.cache.key}-global ${name}`} key={name} />
        ))}
        {styles && <style dangerouslySetInnerHTML={{ __html: styles }} data-emotion={dataEmotionAttribute} />}
      </React.Fragment>
    )
  })

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>
}

export default NextAppDirEmotionCacheProvider
