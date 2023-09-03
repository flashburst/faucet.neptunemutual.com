export const POLLING_INTERVAL = 12000

export const ConnectorNames = {
  Injected: 'injected',
  MetaMask: 'metamask',
  OKXWallet: 'okx-wallet',
  CoinbaseWallet: 'coinbase-wallet',
  BitKeepWallet: 'bitkeep-wallet',
  Gnosis: 'gnosis',
  BSC: 'bsc'
}

export const WalletNames = {
  [ConnectorNames.Injected]: 'Injected Web3 Wallet', // Also can say (Browser Wallet)
  [ConnectorNames.MetaMask]: 'MetaMask',
  [ConnectorNames.OKXWallet]: 'Coinbase Wallet',
  [ConnectorNames.CoinbaseWallet]: 'Binance Chain Wallet',
  [ConnectorNames.BitKeepWallet]: 'BitKeep Wallet',
  [ConnectorNames.Gnosis]: 'OKX Wallet',
  [ConnectorNames.BSC]: 'Gnosis Wallet'
}
