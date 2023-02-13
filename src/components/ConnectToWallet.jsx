import { useConnectWallet } from '@/lib/connect-wallet/context'

function ConnectBtn ({ onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`mt-6 font-inter text-white text-sm font-semibold py-2 px-6 focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors duration-200 ${'bg-36309D hover:bg-indigo-700 focus:ring-indigo-800 '}`}
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
      className={`mt-6 font-inter text-white text-sm font-semibold py-2 px-6 focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors duration-200 ${'bg-red-600 hover:bg-red-700 focus:ring-red-800'}`}
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
