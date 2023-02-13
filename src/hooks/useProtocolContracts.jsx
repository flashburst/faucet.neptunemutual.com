import {
  useEffect,
  useState
} from 'react'

import { useConnectWallet } from '@/lib/connect-wallet/context'
import { useNetwork } from '@/src/context/network'
import { getMetadataKeys } from '@/src/utils/keys'
import { utils } from '@neptunemutual/sdk'
import { useWeb3React } from '@web3-react/core'

export const useProtocolContracts = () => {
  const [data, setData] = useState({})

  const { account } = useWeb3React()
  const { network } = useNetwork()
  const { signerOrProvider } = useConnectWallet()

  useEffect(() => {
    const getAddresses = async () => {
      const chain = parseInt(network, 10)

      if (!network || !account || !signerOrProvider) {
        return
      }

      const metadataKeys = getMetadataKeys()
      const metadataResult = await utils.store.readStorage(
        chain,
        metadataKeys,
        signerOrProvider.provider
      )
      setData({
        [chain]: {
          ...metadataResult
        }
      })
    }

    getAddresses().catch(() => {
      window.alert('Could not get addresses')
    })
  }, [account, network, signerOrProvider])

  return { data }
}
