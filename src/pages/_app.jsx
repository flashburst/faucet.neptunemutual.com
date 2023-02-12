import 'tailwindcss/tailwind.css'
import '@fontsource/inter/latin.css'

import { ConnectWalletProvider } from '@/lib/connect-wallet/context'
import { getLibrary } from '@/lib/connect-wallet/utils/web3'
import { Web3ReactProvider } from '@web3-react/core'

import { NetworkProvider } from '../context/network'

function MyApp ({ Component, pageProps }) {
  return (
    <NetworkProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectWalletProvider>
          <Component {...pageProps} />
        </ConnectWalletProvider>
      </Web3ReactProvider>
    </NetworkProvider>
  )
}

export default MyApp
