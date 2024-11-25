import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store'
import { Toaster } from './components/ui/sonner'
import { useLoadUserQuery } from './features/api/authApi'
import Loading from './components/Loading'

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery()
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isLoading])
  return (
    <div>
      {isLoading || showLoading ? (
        <Loading />
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
      </Custom>
      <Toaster />
    </Provider>
  </StrictMode>,
)
