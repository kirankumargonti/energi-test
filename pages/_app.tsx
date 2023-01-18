//  styles
import '../styles/index.scss'
import type {AppProps} from 'next/app'

// Configurations
import {WagmiConfig} from 'wagmi'
import {client} from '../config/walletConfig'

// Components
import Layout from '../shared/layout/Layout'

export default function App({Component, pageProps}: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  )
}
