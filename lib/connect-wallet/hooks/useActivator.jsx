import { useCallback } from 'react'

import { NetworkNames } from '@/lib/connect-wallet/config/chains'
import { walletTrackerLS } from '@/lib/connect-wallet/utils/local-storage'
import {
  UnsupportedChainIdError,
  useWeb3React
} from '@web3-react/core'

import { WalletNames } from '../config/connectors'
import { getConnectorByName } from '../utils/connectors'
import { CustomException } from '../utils/CustomException'

export function useActivator () {
  const { activate } = useWeb3React()

  const login = useCallback(
    async (networkId, connectorName) => {
      const connectorObj = await getConnectorByName(connectorName, networkId)

      if (!connectorObj) {
        console.info('Invalid Connector Name', connectorName)
        return
      }

      const { connector, errorHandler, setupNetwork } = connectorObj

      try {
        await activate(connector, undefined, true)
        walletTrackerLS.trackConnector(connectorName)
      } catch (error) {
        walletTrackerLS.clear()

        if (error instanceof UnsupportedChainIdError) {
          const setupSuccess = await setupNetwork(networkId)

          if (setupSuccess) {
            await activate(connector, undefined, true)
            walletTrackerLS.trackConnector(connectorName)
            return
          }

          throw CustomException({
            type: 'error',
            title: 'Wrong network',
            message: `Please switch to ${NetworkNames[networkId]} in your ${WalletNames[connectorName]}`,
            error: error
          })
        }

        // Error handler throws an error object with more details, if it's a known error.
        errorHandler(error)

        // Fallback exception
        throw CustomException({
          type: 'error',
          title: 'Error',
          message: 'Something went wrong',
          error: error
        })
      }
    },
    [activate]
  )

  return login
}
