import { NOTO_SANS_JP } from '@/utilities/fonts'
import { WHITE } from '@/utilities/styles'
import { Box, SxProps, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { FC } from 'react'

// constants

const SX = { fontFamily: NOTO_SANS_JP.style.fontFamily, fontWeight: 'bold', textShadow: `-0.5px 0 #000, 0 0.5px #000, 0.5px 0 #000, 0 -0.5px #000` }
const SX_JAPAN = { bottom: 3, color: blueGrey[50], display: ['none', 'inline'], fontSize: 57, position: 'relative' }
const SX_TOKYO = { color: WHITE, fontSize: 65, textTransform: 'uppercase' }

// components

export const Location: FC = () => (
  <Typography sx={{ position: 'absolute', right: 0.5 }}>
    <Box component="span" sx={{ ...SX, ...SX_TOKYO }}>
      To
      <Box component="span" sx={{ position: 'relative', right: 4 }}>
        k
      </Box>
      yo
    </Box>

    <Box component="span" sx={{ ...SX, ...SX_JAPAN } as SxProps}>
      <> 日本</>
    </Box>
  </Typography>
)
