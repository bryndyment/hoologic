import { useAppContext } from '@/hooks/useAppContext'
import profileImage from '@/public/profile.png'
import { PATHNAME_PERSON } from '@/utilities/constants'
import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

// types

type _PersonProps = { pathname: string }

// constants

const PERSON = <Image alt="Bryn Dyment" className="icon__image" src={profileImage} />

// components

export const Person: FC<_PersonProps> = ({ pathname }) => {
  const { setPostPosition } = useAppContext()

  const handleClick = () => setPostPosition({ left: -314, top: 114 })

  if (pathname === PATHNAME_PERSON) {
    return (
      <Box className="icon icon__profile icon__profile--current" component="span">
        {PERSON}
      </Box>
    )
  }

  return (
    <Link className="icon icon__profile" href={PATHNAME_PERSON} onClick={handleClick}>
      {PERSON}
    </Link>
  )
}
