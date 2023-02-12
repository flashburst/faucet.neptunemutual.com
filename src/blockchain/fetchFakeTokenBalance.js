import { Contract } from '@ethersproject/contracts'

import FakeTokenABI from './abis/FakeTokenABI.json'

export const fetchFakeTokenBalance = async (
  tokenAddress,
  signerOrProvider,
  account
) => {
  if (!signerOrProvider) {
    console.log('No provider found')
  }

  const instance = new Contract(tokenAddress, FakeTokenABI, signerOrProvider)

  if (!instance) {
    console.log('No instance found')
  }

  const result = await instance.balanceOf(account)
  return result.toString()
}
