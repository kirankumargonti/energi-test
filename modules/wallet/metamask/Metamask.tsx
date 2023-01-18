import Image from 'next/image'
import {useAccount, useNetwork, useSwitchNetwork} from 'wagmi'
import {useConnect} from 'wagmi'

//images
import metamaskImg from 'public/assets/svg/metamask.svg'

//Hooks
import useIsMounted from '../../../hooks/useIsMounted'

const Metamask: React.FunctionComponent = () => {
  const {connect, connectors, isLoading, pendingConnector} = useConnect()
  const {isConnected} = useAccount()
  const {isMounted} = useIsMounted()
  const {chain} = useNetwork()
  const {chains, pendingChainId, switchNetwork} = useSwitchNetwork()
  const isSameNetwork = chains[1]?.id === chain?.id

  return (
    <div className='wallet__metamask'>
      <Image src={metamaskImg} alt='metamask' width={200} height={200} />
      <h1>Metamask</h1>
      {isMounted &&
        !isConnected &&
        connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({connector})}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </button>
        ))}
      {isMounted && !isSameNetwork && isConnected && (
        <button onClick={() => switchNetwork?.(chains[1]?.id)}>
          Switch Network
          {isLoading && pendingChainId === chains[1]?.id && ' (switching)'}
        </button>
      )}
    </div>
  )
}

export default Metamask
