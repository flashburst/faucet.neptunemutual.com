import { CustomException } from '../utils/CustomException'
import {
  NoSafeContext,
  SafeAppConnector,
  UserRejectedRequestError
} from './package'

/**
 *
 * @param {number} chainId
 */
export const getConnector = (chainId) => {
  return new SafeAppConnector({ supportedChainIds: [chainId] })
}

export function handleError (error) {
  if (error instanceof NoSafeContext) {
    throw CustomException({
      type: 'error',
      title: 'Provider Error',
      message: error.message,
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
    message: 'Gnosis Safe: Something went wrong',
    error: error
  })
}
