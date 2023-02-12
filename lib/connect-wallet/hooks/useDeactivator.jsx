import {
  useCallback,
  useEffect
} from 'react'

import { walletTrackerLS } from '@/lib/connect-wallet/utils/local-storage'
import { useWeb3React } from '@web3-react/core'

export function useDeactivator () {
  const { deactivate, connector } = useWeb3React()

  useEffect(() => {
    if (!connector) {
      return
    }

    connector?.addListener('Web3ReactDeactivate', walletTrackerLS.clear)
    return () => {
      connector?.removeListener('Web3ReactDeactivate', walletTrackerLS.clear)
    }
  }, [connector])

  const logout = useCallback(() => {
    walletTrackerLS.clear()
    deactivate()
  }, [deactivate])

  return logout
}
