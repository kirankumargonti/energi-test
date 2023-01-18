import {useRouter} from 'next/router'
import Link from 'next/link'

// Icons
import {AiFillHome} from 'react-icons/ai'
import {RiWallet3Fill} from 'react-icons/ri'
import {BsSunFill, BsFillMoonFill} from 'react-icons/bs'

// Hooks
import useDarkMode from '../../hooks/useDarkMode'

const Header: React.FunctionComponent = () => {
  const {theme, handleThemeChange} = useDarkMode()
  const {pathname} = useRouter()

  return (
    <header className='header'>
      <nav className='container'>
        <div className='header__tabs'>
          <div
            className={`${
              pathname == '/'
                ? 'header__tabs__item header__tabs__item--active'
                : 'header__tabs__item'
            }`}
          >
            <Link href='/'>
              <AiFillHome />
              Home
            </Link>
          </div>
          <div
            className={`${
              pathname == '/wallet'
                ? 'header__tabs__item header__tabs__item--active'
                : 'header__tabs__item'
            }`}
          >
            <Link href='/wallet'>
              <RiWallet3Fill />
              Wallet
            </Link>
          </div>
        </div>
        <div className='header__toggler'>
          {theme === 'dark' ? (
            <BsSunFill onClick={() => handleThemeChange()} />
          ) : (
            <BsFillMoonFill onClick={() => handleThemeChange()} />
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
