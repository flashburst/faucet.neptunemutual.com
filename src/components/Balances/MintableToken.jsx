import {
  useEffect,
  useState
} from 'react'

import AddCircleIcon from '@/components/icons/add-circle'
import CopyIcon from '@/components/icons/CopyIcon'
import OpenInNewIcon from '@/components/icons/open-in-new'
import { useMintableToken } from '@/src/hooks/useMintableToken'
import {
  convertFromUnits,
  hasValue
} from '@/src/utils/bn'

export const MintableToken = ({ address, symbol, decimals = 18 }) => {
  const { loading, balance, request, explorerUrl, register } = useMintableToken(
    address,
    decimals
  )

  const [message, setMessage] = useState('')

  useEffect(() => {
    setTimeout(() => setMessage(''), 1000)
  }, [message])

  if (!symbol) {
    return null
  }

  if (loading) {
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setMessage('Copied')
    } catch (error) {
      console.error(error)
      setMessage('Unable to copy token address')
    }
  }

  return (
    <>
      <tr className='flex items-center'>
        <td>
          <div className='text-sm text-gray-800 '>
            {hasValue(balance)
              ? convertFromUnits(balance, decimals).decimalPlaces(2).toString()
              : '0'}{' '}
            {symbol}
          </div>
        </td>
        <td className='p-1 ml-auto'>
          <button
            className='text-sm text-indigo-800 hover:text-red-600'
            onClick={request}
          >
            Request
          </button>
        </td>
        <td className='p-1 ml-1'>
          <button className='relative flex text-gray-400 hover:text-gray-500' onClick={handleCopy}>
            <span className='sr-only'>Copy token address</span>
            <CopyIcon width={18} height={18} />
            {message && (
              <span
                className='absolute right-0 px-2 py-1 text-center text-white transition-all bg-gray-400 rounded-md -left-7 -top-9 w-fit'
                aria-hidden='true'
              >
                {message}
              </span>
            )}
          </button>
        </td>
        <td className='p-1 ml-1'>
          <a className='text-gray-400 hover:text-gray-500' href={explorerUrl} rel='noreferrer' target='_blank'>
            <span className='sr-only'>Open in Explorer</span>
            <OpenInNewIcon width={18} height={18} />
          </a>
        </td>

        <td className='p-1 ml-1'>
          <button className='flex text-gray-400 hover:text-gray-500' onClick={() => register(symbol)}>
            <span className='sr-only'>Add to Wallet</span>
            <AddCircleIcon width={18} height={18} />
          </button>
        </td>
      </tr>
    </>
  )
}
