import { Navigation } from './nav'

interface AppShellProps {
  children: React.ReactNode
  title?: string
}

export function AppShell({ children, title }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-10">
        <header className="mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {title && (
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                {title}
              </h1>
            )}
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}