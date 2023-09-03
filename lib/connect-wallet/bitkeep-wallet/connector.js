import { CustomException } from '../utils/CustomException'
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError
} from './package'

/**
 *
 * @param {number} chainId
 */
export const getConnector = (chainId) => {
  return new InjectedConnector({ supportedChainIds: [chainId] })
}

export function handleError (error) {
  if (error instanceof NoEthereumProviderError) {
    throw CustomException({
      type: 'error',
      title: 'Provider Error',
      message: 'Could not connect. No provider found',
      error: error
    })
  }

  if (error instanceof UserRejectedRequestError) {
    throw CustomException({
      type: 'error',
      title: 'Authorization Error',
      message: 'Please authorize to access your account',
      error: error
    })
  }

  throw CustomException({
    type: 'error',
    title: 'Error',
    message: 'BitKeep Wallet: Something went wrong',
    error: error
  })
}
