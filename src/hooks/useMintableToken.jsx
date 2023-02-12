import {
  useEffect,
  useState
} from 'react'

import { useConnectWallet } from '@/lib/connect-wallet/context'
import { getTokenLink } from '@/lib/connect-wallet/utils/explorer'
import { registerToken } from '@/lib/connect-wallet/utils/register-token'
import { fetchFakeTokenBalance } from '@/src/blockchain/fetchFakeTokenBalance'
import { requestFakeToken } from '@/src/blockchain/requestFakeToken'
import { useWeb3React } from '@web3-react/core'

const fetchBalance = async (tokenAddress, signerOrProvider, account, networkId) => {
  try {
    const res = await fetchFakeTokenBalance(
      tokenAddress,
      signerOrProvider,
      account
    )
    return res
  } catch (error) {
    console.log({ tokenAddress, account, networkId })
    console.log(error)
  }
}

const requestToken = async (
  tokenAddress,
  decimals,
  signerOrProvider
) => {
  const res = await requestFakeToken(
    tokenAddress,
    decimals,
    signerOrProvider
  )
  return res
}

export const useMintableToken = (address, decimals) => {
  const { chainId, account } = useWeb3React()
  const { signerOrProvider } = useConnectWallet()

  const [balance, setBalance] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!chainId || !account || !address) return

    let ignore = false
    setLoading(true)

    fetchBalance(address, signerOrProvider, account, chainId)
      .then((bal) => {
        if (ignore) return

        setBalance(bal)
        setLoading(false)
      })
      .catch((e) => {
        console.error(e)
        if (ignore) return

        setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [account, chainId, address, signerOrProvider])

  const request = () => {
    if (!chainId || !account) return

    requestToken(address, decimals, signerOrProvider)
      .then(() => {
        fetchBalance(address, signerOrProvider, account, chainId)
          .then((bal) => setBalance(bal))
          .catch(console.error)
      })
      .catch(console.error)
  }

  const register = (symbol) => {
    if (!chainId || !account) return

    const image = symbol
      ? `https://api.neptunemutual.net/images/tokens/${symbol.toLowerCase()}.svg`
      : undefined

    registerToken(address, symbol, decimals, image)
      .then(console.log)
      .catch(console.error)
  }

  return {
    loading,
    balance,
    request,
    register,
    explorerUrl: getTokenLink(chainId, address, account)
  }
}
