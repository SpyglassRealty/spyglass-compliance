import { useState, useEffect } from 'react'
import Login from './pages/Login'
import AgentDashboard from './pages/AgentDashboard'
import NewDeal from './pages/NewDeal'
import DealDetail from './pages/DealDetail'
import AdminDeals from './pages/AdminDeals'
import AdminDealDetail from './pages/AdminDealDetail'
import { User } from './types'

type Page =
  | { name: 'login' }
  | { name: 'dashboard' }
  | { name: 'new-deal' }
  | { name: 'deal-detail'; dealId: string }
  | { name: 'admin-deals' }
  | { name: 'admin-deal-detail'; dealId: string }

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>({ name: 'login' })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
        setCurrentPage({ name: 'dashboard' })
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (userData: User) => {
    setUser(userData)
    setCurrentPage({ name: 'dashboard' })
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout failed:', error)
    }
    setUser(null)
    setCurrentPage({ name: 'login' })
  }

  const navigateTo = (page: Page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  switch (currentPage.name) {
    case 'new-deal':
      return <NewDeal user={user} onNavigate={navigateTo} onLogout={handleLogout} />
    case 'deal-detail':
      return <DealDetail user={user} dealId={currentPage.dealId} onNavigate={navigateTo} onLogout={handleLogout} />
    case 'admin-deals':
      return <AdminDeals user={user} onNavigate={navigateTo} onLogout={handleLogout} />
    case 'admin-deal-detail':
      return <AdminDealDetail user={user} dealId={currentPage.dealId} onNavigate={navigateTo} onLogout={handleLogout} />
    default:
      return <AgentDashboard user={user} onNavigate={navigateTo} onLogout={handleLogout} />
  }
}

export default App
