import {useState} from 'react'

const useDarkMode = () => {
  // Detecting the system theme
  const isBrowserDefaultDark = () =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false

  // Detecting the default theme from local storage
  const getDefaultTheme = () => {
    if (typeof window !== 'undefined') {
      const localStorageTheme = localStorage.getItem('default-theme')
      const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light'
      return localStorageTheme || browserDefault
    }
  }

  const [theme, setTheme] = useState(getDefaultTheme())

  if (typeof window !== 'undefined') {
    window.document.body.className = `theme-${theme}`
  }

  // Toggle Theme
  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark'
    setTheme(isCurrentDark ? 'light' : 'dark')
    localStorage.setItem('default-theme', isCurrentDark ? 'light' : 'dark')
  }

  return {theme, handleThemeChange}
}

export default useDarkMode
