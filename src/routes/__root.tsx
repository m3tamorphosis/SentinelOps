import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'SentinelOps | Inventory Intelligence'
      },
      {
        name: 'description',
        content: 'Inventory Intelligence & Platform Health Command Center'
      }
    ],
    links: [{ rel: 'stylesheet', href: appCss }]
  }),
  component: Outlet,
  errorComponent: RootErrorBoundary,
  notFoundComponent: NotFound,
  shellComponent: RootDocument
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootErrorBoundary({ error }: { error: Error }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-slate-100">
      <div className="max-w-md rounded-xl border border-border bg-card p-6 shadow-lg shadow-black/20">
        <p className="text-sm font-semibold text-error">Application error</p>
        <h1 className="mt-2 text-2xl font-semibold">SentinelOps could not render this route.</h1>
        <p className="mt-3 text-sm text-slate-400">{error.message}</p>
      </div>
    </main>
  )
}

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-slate-100">
      <div className="max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-lg shadow-black/20">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-2xl font-semibold">Route not found</h1>
      </div>
    </main>
  )
}
