import { useEffect } from 'react'

import { useNetwork } from '../context/network'

const NETWORK_IDS = ['80001', '43113']

export const SelectNetwork = () => {
  const { network, setNetwork } = useNetwork()

  const handleChange = (ev) => {
    setNetwork(ev.target.value)
  }

  useEffect(() => {
    async function getSelectedNetwork () {
      try {
        if (!window.ethereum) {
          return
        }

        const selectedNetwork = await window.ethereum.request({
          method: 'net_version'
        })
        if (!NETWORK_IDS.includes(selectedNetwork)) {
          return
        }

        return selectedNetwork
      } catch (e) {
        console.error({ e })
      }
    }

    getSelectedNetwork().then((n) => {
      if (!n) {
        return
      }
      setNetwork(n)
    })
  }, [setNetwork])

  return (
    <>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <h3 className='text-xs font-inter font-bold py-3.5 text-gray-800'>
          Select a Network
        </h3>
        <div className='flex items-center justify-between sm:justify-start sm:space-x-5'>
          <div className='flex items-center justify-center'>
            <input
              type='radio'
              className='w-4 h-4 accent-36309D'
              id='networkChoice2'
              name='network'
              value='80001'
              onChange={handleChange}
              checked={network === '80001'}
            />
            <label
              htmlFor='networkChoice2'
              className='ml-1 text-sm text-gray-800 font-inter'
            >
              Mumbai
            </label>
          </div>
          <div className='flex items-center justify-center'>
            <input
              type='radio'
              className='w-4 h-4 accent-36309D'
              id='networkChoice2'
              name='network'
              value='43113'
              onChange={handleChange}
              checked={network === '43113'}
            />
            <label
              htmlFor='networkChoice2'
              className='ml-1 text-sm text-gray-800 font-inter'
            >
              Fuji
            </label>
          </div>
        </div>
      </form>

      {network === '80001' && <p><strong>We no longer support Mumbai</strong></p>}
    </>
  )
}
