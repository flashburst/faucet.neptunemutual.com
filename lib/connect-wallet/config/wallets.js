import BinanceWalletLogo from '../components/logos/BinanceWalletLogo'
import BitKeepWalletLogo from '../components/logos/BitKeepLogo'
import CoinbaseLogo from '../components/logos/CoinbaseLogo'
import GnosisSafeLogo from '../components/logos/GnosisSafeLogo'
import InjectedWalletLogo from '../components/logos/InjectedWalletLogo'
import MetamaskLogo from '../components/logos/MetamaskLogo'
import OKXWalletLogo from '../components/logos/OKXWalletLogo'
import {
  getBinanceWalletProvider,
  getBitKeepWalletProvider,
  getCoinbaseWalletProvider,
  getInjectedProvider,
  getMetaMaskProvider,
  getOkxWalletProvider
} from '../providers'
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
  },
  {
    id: '7',
    name: WalletNames[ConnectorNames.BitKeepWallet],
    connectorName: ConnectorNames.BitKeepWallet,
    Icon: BitKeepWalletLogo,
    getAvailability: () => !!getBitKeepWalletProvider()
  }
]
