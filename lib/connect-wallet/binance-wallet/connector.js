import { CustomException } from '../utils/CustomException'
import {
  BscConnector,
  NoBscProviderError
} from './package'

export const getConnector = (chainId) => {
  return new BscConnector({ supportedChainIds: [chainId] })
}

export function handleError (error) {
  if (error instanceof NoBscProviderError) {
    throw CustomException({
      type: 'error',
      title: 'Provider Error',
      message: 'Binance Wallet: Could not connect. No provider found',
      error: error
    })
  }

  throw CustomException({
    type: 'error',
    title: 'Error',
    message: 'Binance Wallet: Something went wrong',
    error: error
  })
}

/**
 *
 * @param {number} networkId
 */
export async function setupNetwork (networkId) {
  const binanceChainIds = {
    97: 'bsc-testnet',
    56: 'bsc-mainnet',
    1: 'eth-mainnet'
  }

  const id = binanceChainIds[networkId]

  if (!id) {
    return false
  }

  try {
    await window.BinanceChain.switchNetwork(id)
    return true
  } catch (error) {
    console.error(error)
  }

  return false
}
