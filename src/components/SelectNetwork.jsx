import { useEffect } from 'react'

import { useNetwork } from '../context/network'

const NETWORKS = [
  { networkId: '80001', name: 'Mumbai' },
  { networkId: '43113', name: 'Fuji' },
  { networkId: '84531', name: 'Base Goerli' }
]

async function getSelectedNetwork () {
  try {
    if (!window.ethereum) {
      return
    }

    const selectedNetwork = await window.ethereum.request({ method: 'net_version' })

    if (!NETWORKS.map(x => x.networkId).includes(selectedNetwork)) {
      return
    }

    return selectedNetwork
  } catch (e) {
    console.error({ e })
  }
}

export const SelectNetwork = () => {
  const { network, setNetwork } = useNetwork()

  useEffect(() => {
    getSelectedNetwork()
      .then((n) => {
        if (!n) { return }

        setNetwork(n)
      })
  }, [setNetwork])

  const handleChange = (ev) => {
    setNetwork(ev.target.value)
  }

  return (
    <>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <h3 className='text-xs  font-bold py-3.5 text-gray-800'>
          Select a Network
        </h3>
        <div className='flex items-center justify-between sm:justify-start sm:space-x-5'>
          {
            NETWORKS.map((x, idx) => {
              return (
                <div className='flex items-center justify-center' key={idx}>
                  <input
                    type='radio'
                    className='w-4 h-4 accent-indigo-800'
                    id={`choice-${idx}`}
                    name='network'
                    value={x.networkId}
                    onChange={handleChange}
                    checked={network === x.networkId}
                  />
                  <label
                    htmlFor={`choice-${idx}`}
                    className='ml-1 text-sm text-gray-800 '
                  >
                    {x.name}
                  </label>
                </div>
              )
            })
          }
        </div>
      </form>

      {network === '80001' && <p><strong>We no longer support Mumbai</strong></p>}
    </>
  )
}
