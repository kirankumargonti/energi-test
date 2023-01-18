export const copyToClipboard = async (text: string) => {
  typeof window !== 'undefined' &&
    (await window.navigator.clipboard.writeText(text))
}
export const truncateAddress = (address: string) => {
  if (!address) return 'No Account'
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  )
  if (!match) return address
  return `${match[1]}…${match[2]}`
}
