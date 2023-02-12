import {
  useEffect,
  useState
} from 'react'

import { ConnectorNames } from '../config/connectors'
import { walletTrackerLS } from '../utils/local-storage'
import useAuth from './useAuth'

const _binanceChainListener = async () =>
  new Promise((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get () {
        return this.bsc
      },
      set (bsc) {
        this.bsc = bsc

        resolve()
      }
    })
  )

export const useEagerConnect = (networkId) => {
  // Makes sure that this hook only runs once
  const [tried, setTried] = useState(false)
  const { login } = useAuth()

  useEffect(() => {
    if (tried || !networkId) {
      return
    }

    setTried(true)

    const connectorName = walletTrackerLS.getConnector()

    if (!connectorName) {
      console.info('Unable to find connector from local storage')
      return
    }

    if (connectorName === ConnectorNames.BSC) {
      // window.BinanceChain might not be immediately available on page load
      const isConnectorBinanceChain = connectorName === ConnectorNames.BSC
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener()
          .then(() => login(networkId, connectorName))
          .catch(() => console.log('Could not auto connect'))

        return
      }
    }

    // added a slight delay in executing activate fx in connecting the wallet to prevent stale error issue
    setTimeout(() => {
      login(networkId, connectorName)
        .catch(() => console.log('Could not auto connect'))
    }, 500)
  }, [login, networkId, tried])
}
