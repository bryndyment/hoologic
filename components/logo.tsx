import { useAppContext } from '@/hooks/useAppContext'
import { PATHNAME_ABOUT } from '@/utilities/constants'
import Link from 'next/link'
import { FC } from 'react'

// types

type _LogoProps = { pathname: string }

// constants

const LOGO = (
  <svg className="icon__logo-svg" height="50" width="50" xmlns="http://www.w3.org/2000/svg">
    <rect className="icon__logo-background" fill="#aaa" height="50" width="50" />
    <g strokeWidth="0">
      <rect fill="#fff" height="30" width="10" x="10" y="10" />
      <rect fill="#fff" height="10" width="30" x="10" y="20" />
      <rect className="icon__logo-l" fill="#ccc" height="10" width="10" x="30" y="10" />
      <rect className="icon__logo-l" fill="#ccc" height="10" width="20" x="30" y="30" />
    </g>
  </svg>
)

// components

export const Logo: FC<_LogoProps> = ({ pathname }) => {
  const { setPostPosition } = useAppContext()

  const handleClick = () => setPostPosition({ left: -314, top: 114 })

  if (pathname === PATHNAME_ABOUT) {
    return <span className="icon icon__logo icon__logo--current">{LOGO}</span>
  }

  return (
    <Link className="icon icon__logo" href={PATHNAME_ABOUT} onClick={handleClick}>
      {LOGO}
    </Link>
  )
}
