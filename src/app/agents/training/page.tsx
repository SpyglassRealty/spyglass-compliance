'use client'

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { ClientOnly } from '@/components/client-only'
import { AppShell } from '@/components/layout/app-shell'

export default function AgentTrainingPage() {
  return (
    <ClientOnly fallback={<div className="p-6">Loading agent training...</div>}>
      <AppShell title="Agent Training & Certification">
        <div className="px-4">
          <div className="max-w-6xl mx-auto">
            {/* Training Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800">45</div>
                  <div className="text-blue-600 text-sm">Active Agents</div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">38</div>
                  <div className="text-green-600 text-sm">Certified</div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-800">5</div>
                  <div className="text-yellow-600 text-sm">In Progress</div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-800">2</div>
                  <div className="text-red-600 text-sm">Overdue</div>
                </div>
              </div>
            </div>

            {/* Training Modules */}
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Required Training Modules</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">Texas Real Estate Law</h4>
                        <p className="text-sm text-gray-500">45 min • Required</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Comprehensive overview of Texas real estate regulations and legal requirements.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 text-sm font-medium">42/45 completed</span>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Continue
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">Ethics & Fair Housing</h4>
                        <p className="text-sm text-gray-500">30 min • Required</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Professional ethics guidelines and fair housing compliance requirements.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 text-sm font-medium">Completed ✓</span>
                      <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed">
                        Completed
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">TREC Compliance</h4>
                        <p className="text-sm text-gray-500">60 min • Required</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Texas Real Estate Commission rules, forms, and compliance procedures.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-600 text-sm font-medium">15/60 completed</span>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Continue
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">Contract Law</h4>
                        <p className="text-sm text-gray-500">40 min • Required</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Understanding real estate contracts, amendments, and legal obligations.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 text-sm font-medium">Not started</span>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Start Now
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">Technology Tools</h4>
                        <p className="text-sm text-gray-500">25 min • Optional</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">How to use Spyglass technology platforms and compliance tools effectively.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 text-sm font-medium">Completed ✓</span>
                      <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed">
                        Completed
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">Client Relations</h4>
                        <p className="text-sm text-gray-500">35 min • Recommended</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Best practices for client communication and relationship management.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-600 text-sm font-medium">8/35 completed</span>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overdue Training */}
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-red-800">Agents with Overdue Training</h3>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Jessica Martinez</h4>
                      <p className="text-gray-600">Missing: Texas Real Estate Law, Contract Law</p>
                      <p className="text-red-600 text-sm">Overdue by 15 days</p>
                    </div>
                    <div className="flex space-x-3">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Send Reminder
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Restrict Access
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Robert Chen</h4>
                      <p className="text-gray-600">Missing: TREC Compliance</p>
                      <p className="text-red-600 text-sm">Overdue by 8 days</p>
                    </div>
                    <div className="flex space-x-3">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Send Reminder
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Restrict Access
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Training Administration */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Training Administration</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Add New Module
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Bulk Assign Training
                  </button>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Generate Reports
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Export Certificates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </ClientOnly>
  )
}