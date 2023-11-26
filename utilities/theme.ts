'use client'

import { createTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

// constants

export const THEME = createTheme({
  breakpoints: {
    values: {
      lg: 10000,
      md: 960,
      sm: 640,
      xl: 15000,
      xs: 0
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { userSelect: 'none' },
        '*:focus': { outline: 'none' },
        body: { WebkitFontSmoothing: 'auto' },
        'li, p': { fontSize: 14.5 }
      }
    }
  },
  palette: { background: { default: blueGrey[50] } },
  typography: { fontFamily: 'lucida grande, lucida sans, -apple-system, sans-serif' }
})
