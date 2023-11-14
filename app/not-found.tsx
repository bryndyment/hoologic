'use client'

import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

// components

const NotFound: FC = () => {
  const { replace } = useRouter()

  useEffect(() => replace('/'), [replace])

  return null
}

export default NotFound
