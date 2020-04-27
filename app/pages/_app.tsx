import { ThemeProvider, GlobalStyles, defaultTheme } from 'minerva-ui'
import * as Sentry from '@sentry/node'

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.SENTRY_DSN,
})

const customTheme = {
  ...defaultTheme,
  Button: {
    ...defaultTheme.Button,
    borderRadius: '10px',
    bg: 'primary',
    color: 'white',
    border: 0,
    fontSize: '16px',
    borderBottomWidth: '2px',
    borderBottomStyle: 'inset',
    borderBottomColor: 'primaryDark',
    fontWeight: 700,
    _hover: {
      bg: 'primaryDark',
    },
    _active: {
      bg: 'primaryDark',
    },
  },
  Input: {
    ...defaultTheme.Input,
    borderRadius: '10px',
  },
  colors: {
    ...defaultTheme.colors,
    primary: '#007d75',
    primaryDark: '#00645e',
  },
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
