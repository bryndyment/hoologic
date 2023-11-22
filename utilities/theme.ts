'use client'

import { createTheme } from '@mui/material'

// constants

export const THEME = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: 'auto',
          fontSize: '21rem'
        },
        html: {
          fontSize: 0.8
        }
      }
    }
  },
  palette: {
    background: {
      default: '#f6e7e5'
    }
  },
  typography: {
    fontFamily: 'lucida grande, lucida sans, -apple-system, sans-serif',
    fontSize: 21 * 16
  }
})
