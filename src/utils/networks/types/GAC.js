import gac from '@/assets/images/networks/etc.svg';

export default {
  name: 'GAC',
  name_long: 'GamerCoin',
  homePage: 'https://ethereumclassic.org/',
  blockExplorer: 'Blockscout',
  blockExplorerTX: 'https://blockscout.com/etc/mainnet/tx/[[txHash]]',
  blockExplorerAddr: 'https://blockscout.com/etc/mainnet/address/[[address]]',
  chainID: 61,
  tokens: import('@/_generated/tokens/tokens-etc.json').then(
    val => val.default
  ),
  contracts: import('@/_generated/contracts/contract-abi-etc.json').then(
    val => val.default
  ),
  icon: etc,
  currencyName: 'GAC',
  isTestNetwork: false,
  isEthVMSupported: {
    supported: true,
    url: null,
    blockExplorerTX: '',
    blockExplorerAddr: '',
    websocket: null
  },
  gasPriceMultiplier: 1,
  canBuy: true,
  coingeckoID: 'Gamer-Coin',
  balanceApi: '0x00000000000000000000000000000000000000'
};
