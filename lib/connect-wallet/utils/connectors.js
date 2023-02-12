import {
  commonSetupNetwork,
  fallbackSetupNetwork
} from '@/lib/connect-wallet/utils/setup-network'

import { ConnectorNames } from '../config/connectors'

/**
 * Asynchronously load the selected connector only
 *
 * @param {string} name
 * @param {number} chainId
 */
export const getConnectorByName = async (name, chainId) => {
  switch (name) {
    case ConnectorNames.Injected: {
      const c = await import('../injected/connector')

      const connector = c.getConnector(chainId)
      const provider = await connector.getProvider()
      return {
        connector,
        errorHandler: c.handleError,
        setupNetwork: (networkId) => commonSetupNetwork(provider, networkId)
      }
    }

    case ConnectorNames.MetaMask: {
      const c = await import('../metamask/connector')

      const connector = c.getConnector(chainId)
      const provider = await connector.getProvider()
      return {
        connector,
        errorHandler: c.handleError,
        setupNetwork: (networkId) => commonSetupNetwork(provider, networkId)
      }
    }

    case ConnectorNames.CoinbaseWallet: {
      const c = await import('../coinbase-wallet/connector')

      const connector = c.getConnector(chainId)
      const provider = await connector.getProvider()
      return {
        connector,
        errorHandler: c.handleError,
        setupNetwork: (networkId) => commonSetupNetwork(provider, networkId)
      }
    }

    case ConnectorNames.OKXWallet: {
      const c = await import('../okx-wallet/connector')

      const connector = c.getConnector(chainId)
      const provider = await connector.getProvider()
      return {
        connector,
        errorHandler: c.handleError,
        setupNetwork: (networkId) => commonSetupNetwork(provider, networkId)
      }
    }

    case ConnectorNames.BSC: {
      const c = await import('../binance-wallet/connector')

      return {
        connector: c.getConnector(chainId),
        errorHandler: c.handleError,
        setupNetwork: c.setupNetwork
      }
    }

    case ConnectorNames.Gnosis: {
      const c = await import('../gnosis-safe/connector')

      return {
        connector: c.getConnector(chainId),
        errorHandler: c.handleError,
        setupNetwork: fallbackSetupNetwork
      }
    }

    default:
      return null
  }
}
