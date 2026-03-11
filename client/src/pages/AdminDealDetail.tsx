import { useState, useEffect } from 'react'
import { User, Deal, ComplianceItem, Page } from '../types'

interface AdminDealDetailProps {
  user: User
  dealId: string
  onNavigate: (page: Page) => void
  onLogout: () => void
}

export default function AdminDealDetail({ user, dealId, onNavigate, onLogout }: AdminDealDetailProps) {
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [rejectModal, setRejectModal] = useState<{ itemId: string; label: string } | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  useEffect(() => {
    fetchDeal()
  }, [dealId])

  const fetchDeal = async () => {
    try {
      const response = await fetch(`/api/deals/${dealId}`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setDeal(data.deal)
      } else {
        setError('Failed to load deal')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (itemId: string) => {
    setActionLoading(itemId)
    try {
      const response = await fetch(`/api/compliance/${itemId}/approve`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      if (response.ok) {
        await fetchDeal()
      } else {
        const data = await response.json()
        alert(data.message || 'Approve failed')
      }
    } catch (err) {
      alert('Action failed')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async () => {
    if (!rejectModal || !rejectReason.trim()) return
    setActionLoading(rejectModal.itemId)
    try {
      const response = await fetch(`/api/compliance/${rejectModal.itemId}/reject`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectReason.trim() })
      })
      if (response.ok) {
        setRejectModal(null)
        setRejectReason('')
        await fetchDeal()
      } else {
        const data = await response.json()
        alert(data.message || 'Reject failed')
      }
    } catch (err) {
      alert('Action failed')
    } finally {
      setActionLoading(null)
    }
  }

  const handleWaive = async (itemId: string) => {
    const reason = 'Waived by admin'
    setActionLoading(itemId)
    try {
      const response = await fetch(`/api/compliance/${itemId}/waive`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      })
      if (response.ok) {
        await fetchDeal()
      } else {
        const data = await response.json()
        alert(data.message || 'Waive failed')
      }
    } catch (err) {
      alert('Action failed')
    } finally {
      setActionLoading(null)
    }
  }

  const handleMarkDealApproved = async () => {
    setActionLoading('deal-approve')
    try {
      const response = await fetch(`/api/deals/${dealId}/status`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      })
      if (response.ok) {
        await fetchDeal()
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to approve deal')
      }
    } catch (err) {
      alert('Action failed')
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-800',
      uploaded: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      waived: 'bg-purple-100 text-purple-800',
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      in_review: 'bg-yellow-100 text-yellow-800',
      changes_requested: 'bg-orange-100 text-orange-800',
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

  if (error || !deal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Deal not found'}</p>
          <button onClick={() => onNavigate({ name: 'admin-deals' })} className="text-teal-600 hover:text-teal-500">
            Back to Admin Queue
          </button>
        </div>
      </div>
    )
  }

  const items = deal.complianceItems || []
  const totalRequired = items.filter(i => i.required).length
  const approvedRequired = items.filter(i => i.required && (i.status === 'approved' || i.status === 'waived')).length
  const progressPct = totalRequired > 0 ? Math.round((approvedRequired / totalRequired) * 100) : 0
  const allRequiredDone = totalRequired > 0 && approvedRequired === totalRequired
  const canApproveDeal = allRequiredDone && deal.status !== 'approved' && deal.status !== 'closed'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reject: {rejectModal.label}</h3>
            <p className="text-sm text-gray-500 mb-4">Please provide a reason for rejection.</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Reason for rejection..."
              autoFocus
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => { setRejectModal(null); setRejectReason('') }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim() || actionLoading === rejectModal.itemId}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading === rejectModal.itemId ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate({ name: 'admin-deals' })}
                className="text-teal-600 hover:text-teal-500 mr-4"
              >
                &larr; Admin Queue
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {deal.dealNumber} (Admin Review)
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{user.firstName} {user.lastName}</span>
              <button onClick={onLogout} className="text-sm text-gray-500 hover:text-gray-700">Sign out</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Deal Summary */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium text-gray-900">{deal.propertyAddress}</h2>
                <p className="text-sm text-gray-500 mt-1">{deal.city}, {deal.state} {deal.zip}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {deal.dealType.replace(/_/g, ' ')} &middot; {deal.dealNumber}
                  {deal.agent && <> &middot; Agent: {deal.agent.firstName} {deal.agent.lastName}</>}
                </p>
              </div>
              <div className="text-right">
                {getStatusBadge(deal.status)}
                {deal.closingDate && (
                  <p className="text-sm text-gray-500 mt-2">
                    Closing: {new Date(deal.closingDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {deal.jointlyDealUrl && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href={deal.jointlyDealUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-teal-600 hover:text-teal-500 font-medium"
                >
                  Open in Jointly &rarr;
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Compliance Progress + Approve Deal */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Compliance Progress</h3>
              <span className="text-sm text-gray-500">{approvedRequired} of {totalRequired} required docs approved</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className={`h-3 rounded-full transition-all ${progressPct === 100 ? 'bg-green-500' : 'bg-teal-500'}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {canApproveDeal && (
              <button
                onClick={handleMarkDealApproved}
                disabled={actionLoading === 'deal-approve'}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {actionLoading === 'deal-approve' ? 'Approving...' : 'Mark Deal Approved'}
              </button>
            )}
          </div>
        </div>

        {/* Compliance Checklist with Admin Actions */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Compliance Review</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.label}</p>
                      {!item.required && <span className="text-xs text-gray-400">(optional)</span>}
                    </div>
                    {item.documents && item.documents.length > 0 && (
                      <div className="mt-1">
                        {item.documents.map(doc => (
                          <p key={doc.id} className="text-xs text-gray-500">
                            {doc.filename} ({(doc.fileSize / 1024).toFixed(0)} KB)
                          </p>
                        ))}
                      </div>
                    )}
                    {item.status === 'rejected' && item.rejectionReason && (
                      <p className="text-xs text-red-600 mt-1">Rejected: {item.rejectionReason}</p>
                    )}
                    {item.reviewedBy && item.reviewedAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        Reviewed by {item.reviewedBy.firstName} {item.reviewedBy.lastName} on {new Date(item.reviewedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(item.status)}
                    {(item.status === 'uploaded' || item.status === 'rejected') && (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          disabled={actionLoading === item.id}
                          className="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setRejectModal({ itemId: item.id, label: item.label })}
                          disabled={actionLoading === item.id}
                          className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {item.status !== 'waived' && item.status !== 'approved' && item.required && (
                      <button
                        onClick={() => handleWaive(item.id)}
                        disabled={actionLoading === item.id}
                        className="px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-md disabled:opacity-50"
                      >
                        Waive
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
