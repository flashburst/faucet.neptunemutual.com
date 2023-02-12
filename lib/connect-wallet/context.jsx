import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { Popup } from '@/lib/connect-wallet/components/ConnectWallet/Popup'
import useAuth from '@/lib/connect-wallet/hooks/useAuth'
import { useEagerConnect } from '@/lib/connect-wallet/hooks/useEagerConnect'
import { getProviderOrSigner } from '@/lib/connect-wallet/utils/web3'
import { useNetwork } from '@/src/context/network'
import { AddressZero } from '@ethersproject/constants'
import { useWeb3React } from '@web3-react/core'

const Context = createContext({
  isActive: false,
  logout: () => {},
  openPopup: () => {},
  login: async (_networkId, _connectorName) => {},
  signerOrProvider: null
})

export function useConnectWallet () {
  const context = useContext(Context)

  if (!context) {
    console.error('Use useConnectWallet inside the ConnectWalletProvider')
  }

  return context
}

export function ConnectWalletProvider ({ children }) {
  const { active, chainId, account, library } = useWeb3React()
  const { login, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const { network } = useNetwork()
  const networkId = parseInt(network, 10)

  useEagerConnect(networkId)

  useEffect(() => {
    if (active && chainId !== networkId) {
      logout()
    }
  }, [active, chainId, logout, networkId])

  function onClose () {
    setIsOpen(false)
  }

  const signerOrProvider = useMemo(() => {
    let signerOrProvider = null

    if (networkId) {
      signerOrProvider = getProviderOrSigner(library, account || AddressZero, networkId)
    }

    return signerOrProvider
  }, [account, library, networkId])

  const value = useMemo(() => ({
    isActive: active,
    logout,
    login,
    signerOrProvider,
    openPopup: function () {
      if (active) {
        logout()
      }

      setIsOpen(true)
    }
  }), [active, login, logout, signerOrProvider])

  return (
    <Context.Provider value={value}>
      {children}

      <Popup
        networkId={networkId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Context.Provider>
  )
}
