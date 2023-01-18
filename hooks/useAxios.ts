import axios from 'axios'
import {useState, useEffect} from 'react'

//Types
interface I_axiosParams {
  method: string
  url: string
}

export const useAxios = (axiosParams: I_axiosParams) => {
  // Controller for cancelling api calls
  const controller = new AbortController()
  // State values
  const [response, setResponse] = useState<any>([undefined])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  }

  // Function to fetch the info from API
  const fetchData = async (params: any) => {
    try {
      setError(false)
      const result = await axios(params, {
        signal: controller.signal,
        headers,
      })
      setResponse(result)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(axiosParams)
    return () => {
      controller.abort()
    }
  }, []) // execute once only

  return {response, error, loading}
}
