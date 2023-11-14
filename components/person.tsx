import { useAppContext } from '@/hooks/useAppContext'
import { PATHNAME_PERSON } from '@/utilities/constants'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

// types

type _PersonProps = { pathname: string }

// constants

const PERSON = <Image alt="Bryn Dyment" className="icon__image" height="50" src="/profile.png" unoptimized width="50" />

// components

export const Person: FC<_PersonProps> = ({ pathname }) => {
  const { setPostPosition } = useAppContext()

  const handleClick = () => setPostPosition({ left: -314, top: 114 })

  if (pathname === PATHNAME_PERSON) {
    return <span className="icon icon__profile icon__profile--current">{PERSON}</span>
  }

  return (
    <Link className="icon icon__profile" href={PATHNAME_PERSON} onClick={handleClick}>
      {PERSON}
    </Link>
  )
}
