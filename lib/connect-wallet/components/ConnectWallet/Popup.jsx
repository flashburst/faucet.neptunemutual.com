import {
  useEffect,
  useState
} from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { wallets } from '../../config/wallets'
import { useConnectWallet } from '../../context'
import { Disclaimer } from '../ConnectWallet/Disclaimer'
import { WalletList } from '../ConnectWallet/WalletList'
import CloseIcon from '../icons/CloseIcon'
import { Loader } from '../Loader/Loader'
import { Modal } from './Modal'

export const Popup = ({ isOpen, onClose, networkId }) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const { isActive, login } = useConnectWallet()

  useEffect(() => {
    if (!isOpen) {
      setIsConnecting(false)
    }

    if (isActive) {
      setIsConnecting(false)
      onClose()
    }
  }, [isOpen, isActive, onClose])

  const onConnect = async (id) => {
    const wallet = wallets.find((x) => x.id === id)
    const connectorName = wallet.connectorName

    try {
      setIsConnecting(true)
      await login(networkId, connectorName)
      setIsConnecting(false)
    } catch (error) {
      setIsConnecting(false)
      onClose()
      alert(error.message)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={[
        'w-full relative border-[1.5px] border-B0C4DB flex flex-col p-5 text-left align-middle rounded-3xl max-h-full m-auto overflow-auto',
        'sm:p-12 xs:p-8',
        'max-w-md transition-all bg-white'
      ].join(' ')}
      >
        <Dialog.Title className='font-bold leading-9 text-black text-h2'>
          Connect wallet
        </Dialog.Title>

        <button
          type='button'
          onClick={onClose}
          className='absolute flex items-center justify-center text-black rounded-md top-5 md:top-7 right-8 md:right-12 hover:text-4e7dd9 focus:text-4e7dd9 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-transparent'
          title='Close'
        >
          <span className='sr-only'>Close</span>
          <CloseIcon width={24} height={24} />
        </button>

        {!isConnecting && (
          <>
            <Disclaimer />
            <WalletList wallets={wallets} onConnect={onConnect} />
          </>
        )}

        {isConnecting && (
          <>
            <div className='flex items-center mt-8 justify-left'>
              <Loader />
              <p>Connecting...</p>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
