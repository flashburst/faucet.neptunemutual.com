import CoinbaseLogo from '@/lib/connect-wallet/components/logos/CoinbaseLogo'
import GnosisSafeLogo
  from '@/lib/connect-wallet/components/logos/GnosisSafeLogo'
import InjectedWalletLogo
  from '@/lib/connect-wallet/components/logos/InjectedWalletLogo'
import OKXWalletLogo from '@/lib/connect-wallet/components/logos/OKXWalletLogo'
import {
  getBinanceWalletProvider,
  getCoinbaseWalletProvider,
  getInjectedProvider,
  getMetaMaskProvider,
  getOkxWalletProvider
} from '@/lib/connect-wallet/providers'

import BinanceWalletLogo from '../components/logos/BinanceWalletLogo'
import MetamaskLogo from '../components/logos/MetamaskLogo'
import {
  ConnectorNames,
  WalletNames
} from './connectors'

const isNotFrame = () => {
  return ((window === null || window === undefined ? undefined : window.parent) === window)
}

export const wallets = [
  {
    id: '1',
    name: WalletNames[ConnectorNames.Injected],
    connectorName: ConnectorNames.Injected,
    Icon: InjectedWalletLogo,
    getAvailability: () => !!getInjectedProvider()
  },
  {
    id: '2',
    name: WalletNames[ConnectorNames.MetaMask],
    connectorName: ConnectorNames.MetaMask,
    Icon: MetamaskLogo,
    getAvailability: () => !!getMetaMaskProvider()
  },
  {
    id: '3',
    name: WalletNames[ConnectorNames.CoinbaseWallet],
    connectorName: ConnectorNames.CoinbaseWallet,
    Icon: CoinbaseLogo,
    getAvailability: () => !!getCoinbaseWalletProvider()
  },
  {
    id: '4',
    name: WalletNames[ConnectorNames.BSC],
    connectorName: ConnectorNames.BSC,
    Icon: BinanceWalletLogo,
    getAvailability: () => !!getBinanceWalletProvider()
  },
  {
    id: '5',
    name: WalletNames[ConnectorNames.OKXWallet],
    connectorName: ConnectorNames.OKXWallet,
    Icon: OKXWalletLogo,
    getAvailability: () => !!getOkxWalletProvider()
  },
  {
    id: '6',
    name: WalletNames[ConnectorNames.Gnosis],
    connectorName: ConnectorNames.Gnosis,
    Icon: GnosisSafeLogo,
    getAvailability: () => !isNotFrame()
  }
]
