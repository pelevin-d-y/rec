import 'normalize.css'
import 'src/styles/global.scss'
import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AuthProvider } from 'src/components/context/AuthContext'
import { ClientProvider } from 'src/components/context/ClientContext'
import { FreeStorageProvider } from 'src/components/context/FreeStorageContext'
import { ToastContainer } from 'react-toastify'
import 'ts-replace-all'
import 'react-toastify/dist/ReactToastify.css'
import ProductTour from 'src/components/ProductTour'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <div suppressHydrationWarning>
    {typeof window === 'undefined' ? null : (
      <>
        <AuthProvider>
          <ClientProvider>
            <TemplatesProvider>
              <FreeStorageProvider>
                <ProductTour />
                <Head>
                  <title>Strata</title>
                </Head>
                <Component {...pageProps} />
              </FreeStorageProvider>
            </TemplatesProvider>
          </ClientProvider>
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
      </>
    )}
  </div>
)

export default App
