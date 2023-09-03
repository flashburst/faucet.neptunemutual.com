import { ConnectorNames } from '../config/connectors'
import {
  getBinanceWalletProvider,
  getBitKeepWalletProvider,
  getCoinbaseWalletProvider,
  getInjectedProvider,
  getMetaMaskProvider,
  getOkxWalletProvider
} from '../providers'
import { walletTrackerLS } from './local-storage'

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage
) => {
  const connectorName = walletTrackerLS.getConnector()

  let provider = null

  switch (connectorName) {
    case ConnectorNames.BSC: {
      provider = getBinanceWalletProvider()
      break
    }

    case ConnectorNames.MetaMask: {
      provider = getMetaMaskProvider()
      break
    }

    case ConnectorNames.Injected: {
      provider = getInjectedProvider()
      break
    }

    case ConnectorNames.OKXWallet: {
      provider = getOkxWalletProvider()
      break
    }

    case ConnectorNames.BitKeepWallet: {
      provider = getBitKeepWalletProvider()
      break
    }

    case ConnectorNames.CoinbaseWallet: {
      provider = getCoinbaseWalletProvider()
      break
    }
  }

  if (!provider || !provider.request || typeof provider.request !== 'function') {
    return false
  }

  return provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage
      }
    }
  })
}
