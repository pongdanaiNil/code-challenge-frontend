import '@styles/globals.css'
import type { AppProps, AppContext } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { createRef, useEffect, useState } from 'react'
import createEmotionCache from '../createEmotionCache'
import theme from '../theme'
import CssBaseline from '@mui/material/CssBaseline'
import '../locales/i18n'
import { wrapper } from '../store'
import { SnackbarKey, SnackbarProvider } from 'notistack'
import { IconButton, ThemeProvider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import App from 'next/app'
import { Provider } from 'react-redux'

const cache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = ({ Component, ...rest}: MyAppProps) => {
  const notistackRef = createRef<SnackbarProvider>()

  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = cache, pageProps } = props;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            ref={notistackRef}
            maxSnack={3}
            preventDuplicate={true}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            action={(key: SnackbarKey) => (
              <IconButton id="dismiss" color="inherit" onClick={() => notistackRef?.current?.closeSnackbar(key)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          >
            <CssBaseline />
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
 
  return { ...appProps }
})

export default MyApp
