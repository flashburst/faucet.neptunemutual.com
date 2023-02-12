import { convertToUnits } from '@/src/utils/bn'
import { Contract } from '@ethersproject/contracts'

import FakeTokenABI from './abis/FakeTokenABI.json'

export const requestFakeToken = async (
  tokenAddress,
  decimals,
  signerOrProvider
) => {
  if (!signerOrProvider) {
    console.log('No provider found')
  }

  const instance = new Contract(tokenAddress, FakeTokenABI, signerOrProvider)

  if (!instance) {
    console.log('No instance found')
  }

  const tx = await instance.mint(convertToUnits('2000', decimals).toString())
  await tx.wait()
  return tx
}
