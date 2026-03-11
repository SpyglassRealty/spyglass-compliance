import { useState, useEffect } from 'react'
import { User, Deal, Page } from '../types'

interface AdminDealsProps {
  user: User
  onNavigate: (page: Page) => void
  onLogout: () => void
}

export default function AdminDeals({ user, onNavigate, onLogout }: AdminDealsProps) {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      const response = await fetch('/api/deals?limit=200', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setDeals(data.deals)
      }
    } catch (error) {
      console.error('Failed to fetch deals:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      in_review: 'bg-yellow-100 text-yellow-800',
      changes_requested: 'bg-orange-100 text-orange-800',
      approved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-600 text-white',
      cancelled: 'bg-red-100 text-red-800'
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.replace(/_/g, ' ')}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate({ name: 'dashboard' })}
                className="text-teal-600 hover:text-teal-500 mr-4"
              >
                &larr; Dashboard
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Deal Queue
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{user.firstName} {user.lastName}</span>
              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                {user.role}
              </span>
              <button onClick={onLogout} className="text-sm text-gray-500 hover:text-gray-700">Sign out</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No deals found</td>
                </tr>
              ) : (
                deals.map((deal: any) => {
                  const complianceTotal = deal._count?.complianceItems || 0
                  return (
                    <tr
                      key={deal.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => onNavigate({ name: 'admin-deal-detail', dealId: deal.id })}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">
                        {deal.dealNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {deal.agent ? `${deal.agent.firstName} ${deal.agent.lastName}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {deal.propertyAddress}
                        <span className="text-gray-500 ml-1">{deal.city}, {deal.state}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deal.dealType.replace(/_/g, ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(deal.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complianceTotal > 0 ? `${complianceTotal} items` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deal.closingDate ? new Date(deal.closingDate).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
