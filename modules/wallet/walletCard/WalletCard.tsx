import Image from 'next/image'
import {useAccount, useBalance, useConnect, useDisconnect} from 'wagmi'

//icons
import {MdContentCopy} from 'react-icons/md'
import {HiOutlineExternalLink} from 'react-icons/hi'

//Images
import NRG_Green from 'public/assets/svg/NRG.svg'
import Metamask from 'public/assets/svg/metamask.svg'

//Helpers
import {copyToClipboard, truncateAddress} from '../../../utilities/helpers'

// Hooks
import {useAxios} from '../../../hooks/useAxios'

const WalletCard: React.FunctionComponent = () => {
  const {address, isConnected} = useAccount()
  const {data} = useBalance({
    address: address,
  })
  const {disconnect}: any = useDisconnect()
  // Get the Energi Token Value in USD
  const {response} = useAxios({
    url: `${process.env.NEXT_PUBLIC_COINGECKO_API}?ids=energi&vs_currencies=usd`,
    method: 'GET',
  })

  return (
    <div className='walletCard'>
      <div className='walletCard__title'>
        <div className='walletCard__title__left'>
          <p>Energi Network</p>
        </div>
        <div className='walletCard__title__right'>
          <p>{isConnected && 'Connected'}</p>
        </div>
      </div>
      <div className='walletCard__info'>
        <div className='walletCard__info__left'>
          <Image src={Metamask} alt='NRG' width={25} height={25} />
          <p>{truncateAddress(address ?? '')}</p>
        </div>
        <div className='walletCard__info__right'>
          <MdContentCopy onClick={() => copyToClipboard(address ?? '')} />
          <HiOutlineExternalLink
            onClick={() =>
              window.open(
                `https://explorer.energi.network/address/${address}/transactions`
              )
            }
          />
        </div>
      </div>

      <div className='walletCard__assets'>
        <p>Total Balance</p>
        <span>
          <Image src={NRG_Green} alt='NRG' width={45} height={45} />
          <h1>
            {data?.formatted} {data?.symbol}
          </h1>
        </span>
        <h1>
          $
          {(
            Number(response?.data?.energi?.usd) * Number(data?.formatted)
          ).toLocaleString('en-US')}
        </h1>
        <button onClick={disconnect}>Disconnect wallet</button>
      </div>
    </div>
  )
}

export default WalletCard
