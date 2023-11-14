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
      default: '#fae1e6'
    }
  },
  typography: {
    fontFamily: 'lucida grande',
    fontSize: 21 * 16
  }
})
