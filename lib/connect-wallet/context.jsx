import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useNetwork } from '@/src/context/network'
import { AddressZero } from '@ethersproject/constants'
import { useWeb3React } from '@web3-react/core'

import { Popup } from './components/ConnectWallet/Popup'
import useAuth from './hooks/useAuth'
import { useEagerConnect } from './hooks/useEagerConnect'
import { getProviderOrSigner } from './utils/web3'

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
  const { active, chainId: connectedChainId, account, library } = useWeb3React()
  const { login, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const { network } = useNetwork()
  const selectedChainId = parseInt(network, 10)

  useEagerConnect(selectedChainId)

  useEffect(() => {
    if (active && connectedChainId !== selectedChainId) {
      logout()
    }
  }, [active, connectedChainId, logout, selectedChainId])

  function onClose () {
    setIsOpen(false)
  }

  const signerOrProvider = useMemo(() => {
    let signerOrProvider = null

    if (account && connectedChainId && connectedChainId === selectedChainId) {
      signerOrProvider = getProviderOrSigner(library, account || AddressZero, selectedChainId)
    }

    return signerOrProvider
  }, [account, connectedChainId, library, selectedChainId])

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
        networkId={selectedChainId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Context.Provider>
  )
}
