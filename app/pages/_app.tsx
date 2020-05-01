import { ThemeProvider, GlobalStyles, defaultTheme } from 'minerva-ui';
import * as Sentry from '@sentry/node';
import ReactGA from 'react-ga';

import { useEffect } from 'react';

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.SENTRY_DSN,
});

const customTheme = {
  ...defaultTheme,
  Button: {
    ...defaultTheme.Button,
    borderRadius: '100px',
    bg: 'primary',
    color: 'white',
    border: 0,
    fontSize: '16px',
    borderBottomWidth: '2px',
    borderBottomStyle: 'inset',
    borderBottomColor: 'primaryDark',
    // fontWeight: 700,
    fontFamily: 'BalooBold',
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
    appearance: 'none',
  },
  colors: {
    ...defaultTheme.colors,
    primary: '#007d75',
    primaryDark: '#00645e',
  },
};

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize('UA-165302150-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
