'use client'

import { createTheme } from '@mui/material'
import { BLACK } from './styles'

// constants

export const THEME = createTheme({
  breakpoints: {
    values: {
      lg: 15000,
      md: 10000,
      sm: 640,
      xl: 20000,
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
    },
    MuiLink: {
      styleOverrides: {
        root: { color: BLACK, textDecoration: 'none' }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: { lineHeight: 0.65 }
      }
    }
  },
  palette: { background: { default: '#ece6dc' } },
  typography: { fontFamily: 'lucida grande, lucida sans, -apple-system, sans-serif' }
})
