import {NextPage} from 'next'

// Components
import AssetTable from '../modules/Home/assetTable/AssetTable'
import MetaData from '../shared/metaData/MetaData'

const Home: NextPage = () => {
  return (
    <>
      <MetaData title='Energi' description='Secure Blockchain' />
      <section className='price'>
        <div className='container'>
          <AssetTable />
        </div>
      </section>
    </>
  )
}

export default Home
