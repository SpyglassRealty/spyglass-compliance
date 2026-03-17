'use client'

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { ClientOnly } from '@/components/client-only'
import { AppShell } from '@/components/layout/app-shell'

export default function Home() {
  return (
    <ClientOnly fallback={<div className="p-6">Loading dashboard...</div>}>
      <AppShell title="Compliance Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {/* Enhanced Compliance */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Enhanced Compliance</dt>
                    <dd className="text-lg font-medium text-gray-900">Advanced compliance tools and workflows</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3">
              <div className="text-sm">
                <a href="/compliance/enhanced" className="font-medium text-orange-600 hover:text-orange-500">
                  View details<span className="sr-only"> Enhanced Compliance</span>
                </a>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Risk Assessment</dt>
                    <dd className="text-lg font-medium text-gray-900">Identify and mitigate compliance risks</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3">
              <div className="text-sm">
                <a href="/compliance/risk" className="font-medium text-orange-600 hover:text-orange-500">
                  View details<span className="sr-only"> Risk Assessment</span>
                </a>
              </div>
            </div>
          </div>

          {/* Agent Training */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Agent Training</dt>
                    <dd className="text-lg font-medium text-gray-900">Compliance training and certification</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3">
              <div className="text-sm">
                <a href="/agents/training" className="font-medium text-orange-600 hover:text-orange-500">
                  View details<span className="sr-only"> Agent Training</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-500">Compliance Rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-gray-500">Active Agents</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-500">Pending Reviews</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-500">High Risk Items</div>
            </div>
          </div>
        </div>
      </AppShell>
    </ClientOnly>
  )
}