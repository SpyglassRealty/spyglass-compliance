'use client'

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { ClientOnly } from '@/components/client-only'
import { AppShell } from '@/components/layout/app-shell'

export default function EnhancedCompliancePage() {
  return (
    <ClientOnly fallback={<div className="p-6">Loading enhanced compliance...</div>}>
      <AppShell title="Enhanced Compliance">
        <div className="px-4">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Compliance Management</h2>
                <p className="text-gray-600 mb-6">
                  Comprehensive tools for managing complex compliance requirements, automated workflows, and advanced reporting capabilities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Automated Workflows</h3>
                    <p className="text-orange-600">Streamline compliance processes with intelligent automation</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Real-time Monitoring</h3>
                    <p className="text-blue-600">Track compliance status across all transactions in real-time</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Advanced Analytics</h3>
                    <p className="text-green-600">Deep insights into compliance patterns and trends</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Integration Hub</h3>
                    <p className="text-purple-600">Connect with third-party compliance tools and services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Workflow */}
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-6 py-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Enhanced Workflow Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">1</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Automated Pre-screening</h4>
                      <p className="text-gray-600">AI-powered document analysis and risk assessment</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">2</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Smart Document Management</h4>
                      <p className="text-gray-600">Intelligent categorization and version control</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">3</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Multi-level Review Process</h4>
                      <p className="text-gray-600">Hierarchical approval with automated escalation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">4</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Real-time Notifications</h4>
                      <p className="text-gray-600">Instant alerts and status updates via Slack integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Start New Review
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    View Analytics
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Export Report
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