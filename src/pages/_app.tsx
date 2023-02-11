import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient, goerli } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const client = createClient(
  getDefaultClient({ appName: 'ZNP-POC', chains: [goerli] }),
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
