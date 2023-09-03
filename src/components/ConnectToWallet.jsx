import { useConnectWallet } from '@/lib/connect-wallet/context'

function ConnectBtn ({ onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='px-6 py-2 mt-6 text-sm font-semibold text-white transition-colors duration-200 bg-indigo-800 focus:ring-2 focus:ring-offset-2 focus:outline-none hover:bg-indigo-700 focus:ring-indigo-800'
    >
      Connect
    </button>
  )
}

function DisconnectBtn ({ onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='px-6 py-2 mt-6 text-sm font-semibold text-white transition-colors duration-200 bg-red-600 focus:ring-2 focus:ring-offset-2 focus:outline-none hover:bg-red-700 focus:ring-red-800'
    >
      Disconnect
    </button>
  )
}

export const ConnectToWallet = () => {
  const { isActive, logout, openPopup } = useConnectWallet()

  return isActive
    ? <DisconnectBtn onClick={logout} />
    : <ConnectBtn onClick={openPopup} />
}
