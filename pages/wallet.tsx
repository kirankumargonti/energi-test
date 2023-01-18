import {NextPage} from 'next'
import {useAccount, useNetwork, useSwitchNetwork} from 'wagmi'

// Components
import Metamask from '../modules/wallet/metamask/Metamask'
import WalletCard from '../modules/wallet/walletCard/WalletCard'
import MetaData from '../shared/metaData/MetaData'

const Wallet: NextPage = () => {
  const {address, isConnected} = useAccount()
  const {chain} = useNetwork()
  const {chains} = useSwitchNetwork()
  const isSameNetwork = chains[1]?.id === chain?.id

  return (
    <>
      <MetaData title='Wallet' description='Connect Wallet' />
      <section className='wallet'>
        <div className='container'>
          {isSameNetwork && isConnected && address ? (
            <WalletCard />
          ) : (
            <Metamask />
          )}
        </div>
      </section>
    </>
  )
}

export default Wallet
