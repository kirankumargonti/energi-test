import {createClient, configureChains, mainnet} from 'wagmi'
import {publicProvider} from 'wagmi/providers/public'
import {MetaMaskConnector} from 'wagmi/connectors/metaMask'
import {Chain} from 'wagmi'

// Energi Chain Configuration
const energiMainnet: Chain = {
  id: 0x9b75,
  name: 'Energi Mainnet',
  network: 'Energi',
  nativeCurrency: {
    decimals: 18,
    name: 'Energi',
    symbol: 'NRG',
  },
  rpcUrls: {
    default: {http: ['https://nodeapi.energi.network']},
  },
  blockExplorers: {
    default: {name: 'Energi', url: 'https://explorer.energi.network/'},
  },
}

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)

const {chains, provider, webSocketProvider} = configureChains(
  [mainnet, energiMainnet],
  [publicProvider()]
)

// Set up client
export const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({chains})],
  provider,
  webSocketProvider,
})
