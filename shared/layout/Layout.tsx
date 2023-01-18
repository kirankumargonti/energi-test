import React from 'react'

// Types
interface I_Layout {
  children: React.ReactNode
}

// Components
import Header from '../header/Header'

// Font
import {Inter} from '@next/font/google'
const inter = Inter({subsets: ['latin'], weight: ['400', '500', '700']})

const Layout: React.FunctionComponent<I_Layout> = ({children}) => {
  return (
    <main className={inter?.className}>
      <Header />
      {children}
    </main>
  )
}

export default Layout
