import { useState, useEffect, useRef } from 'react'
import { User, Deal, ComplianceItem, Page } from '../types'

interface DealDetailProps {
  user: User
  dealId: string
  onNavigate: (page: Page) => void
  onLogout: () => void
}

export default function DealDetail({ user, dealId, onNavigate, onLogout }: DealDetailProps) {
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

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

  const handleUploadClick = (itemId: string) => {
    setSelectedItemId(itemId)
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedItemId) return

    if (file.size > 25 * 1024 * 1024) {
      alert('File must be less than 25MB')
      return
    }

    setUploadingItemId(selectedItemId)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('complianceItemId', selectedItemId)

    try {
      const response = await fetch(`/api/documents/upload/${dealId}`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      })

      if (response.ok) {
        await fetchDeal()
      } else {
        const data = await response.json()
        alert(data.message || 'Upload failed')
      }
    } catch (err) {
      alert('Upload failed. Please try again.')
    } finally {
      setUploadingItemId(null)
      setSelectedItemId(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
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
          <button onClick={() => onNavigate({ name: 'dashboard' })} className="text-teal-600 hover:text-teal-500">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const items = deal.complianceItems || []
  const approvedCount = items.filter(i => i.status === 'approved' || i.status === 'waived').length
  const totalRequired = items.filter(i => i.required).length
  const approvedRequired = items.filter(i => i.required && (i.status === 'approved' || i.status === 'waived')).length
  const progressPct = totalRequired > 0 ? Math.round((approvedRequired / totalRequired) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate({ name: 'dashboard' })}
                className="text-teal-600 hover:text-teal-500 mr-4"
              >
                &larr; Back
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {deal.dealNumber}
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
                <p className="text-sm text-gray-500 mt-1">
                  {deal.city}, {deal.state} {deal.zip}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {deal.dealType.replace(/_/g, ' ')} &middot; {deal.dealNumber}
                  {deal.mlsNumber && <> &middot; MLS# {deal.mlsNumber}</>}
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

            {/* Jointly URL */}
            {deal.jointlyDealUrl && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">Jointly:</span>
                  <a
                    href={deal.jointlyDealUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:text-teal-500 font-medium"
                  >
                    Open in Jointly &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compliance Progress */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Compliance Progress</h3>
              <span className="text-sm text-gray-500">{approvedRequired} of {totalRequired} required docs approved</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${progressPct === 100 ? 'bg-green-500' : 'bg-teal-500'}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Compliance Checklist */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Compliance Checklist</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.label}</p>
                      {!item.required && (
                        <span className="text-xs text-gray-400">(optional)</span>
                      )}
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
                      <p className="text-xs text-red-600 mt-1">Reason: {item.rejectionReason}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(item.status)}
                    {(item.status === 'pending' || item.status === 'rejected') && (
                      <button
                        onClick={() => handleUploadClick(item.id)}
                        disabled={uploadingItemId === item.id}
                        className="px-3 py-1 text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md disabled:opacity-50"
                      >
                        {uploadingItemId === item.id ? 'Uploading...' : 'Upload'}
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
