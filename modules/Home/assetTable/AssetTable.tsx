import {useEffect, useState} from 'react'
import Image from 'next/image'

// Assets Response for fallback response
import assets from '../../../utilities/assetsInfo.json'

// Hooks
import {useAxios} from '../../../hooks/useAxios'

// Types
interface I_response {
  name: string
  symbol: string
  last_price: number
  maker_fee: number
  taker_fee: number
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string

const AssetTable: React.FunctionComponent = () => {
  const [data, setData] = useState<I_response[]>([])
  const [coinFieldSort, setCoinFieldSort] = useState<
    'ascending' | 'descending'
  >('ascending')
  const [priceFieldSort, setPriceFieldSort] = useState<
    'ascending' | 'descending'
  >('ascending')

  // Fetch the values from the Energi API
  const {response, error, loading} = useAxios({
    url: baseURL,
    method: 'GET',
  })

  useEffect(() => {
    if (!loading && (response || error)) {
      // Here using assets Json if API response fail
      const res = Object.values(error ? assets : response?.data)
      // @ts-ignore
      sortByNumber(res, 'ascending')
    }
  }, [response, error, loading])

  // Function for Sorting Numbers
  const sortByNumber = (
    assetsInfo: I_response[],
    order: 'ascending' | 'descending'
  ) => {
    if (order === 'ascending') {
      const response = assetsInfo.sort((a, b) => a.last_price - b.last_price)
      setData(response)
      return response
    }
    if (order === 'descending') {
      const response = assetsInfo.sort((a, b) => b.last_price - a.last_price)
      setData(response)
      return response
    }
  }
  // Function for Sorting Text
  const sortByAlphabetically = (
    assetsInfo: I_response[],
    order: 'ascending' | 'descending'
  ) => {
    if (order === 'ascending') {
      const response = assetsInfo.sort((a, b) => a.name.localeCompare(b.name))
      setData(response)
    }
    if (order === 'descending') {
      const response = assetsInfo.sort((a, b) => b.name.localeCompare(a.name))
      setData(response)
    }
  }
  return (
    <table className='price__table'>
      <thead>
        <th>#</th>
        <th
          onClick={() => {
            sortByAlphabetically(data, coinFieldSort)
            setCoinFieldSort((prev) =>
              prev === 'ascending' ? 'descending' : 'ascending'
            )
          }}
        >
          Coin
        </th>
        <th></th>
        <th
          onClick={() => {
            sortByNumber(
              data,
              priceFieldSort === 'ascending' ? 'descending' : 'ascending'
            )
            setPriceFieldSort((prev) =>
              prev === 'ascending' ? 'descending' : 'ascending'
            )
          }}
        >
          Price
        </th>
      </thead>
      <tbody>
        {data?.map((info: any, index) => (
          <tr key={info?.symbol}>
            <td>{index}</td>
            <td>
              <Image
                src={`/assets/svg/${info.symbol}.svg`}
                width={20}
                height={20}
                alt={info.symbol}
              />
              {info.name}
            </td>
            <td>{info.symbol}</td>
            <td>${info.last_price?.toLocaleString('en-US')}</td>
          </tr>
        ))}
        {loading &&
          Array.from({length: 10}, (v, i) => (
            <>
              <tr className='loading' key={i}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </>
          ))}
      </tbody>
    </table>
  )
}

export default AssetTable
