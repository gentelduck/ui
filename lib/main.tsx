import ReactDOM from 'react-dom/client'
import './global.css'
import { TooltipProvider } from '@/ui'
import './global.css'
import React from 'react'
import { Icon } from '@/assets'
import { DuckNavGroup } from './ui/DuckUI/DuckNavGroup'

export const App = () => {
  const [open, setOpen] = React.useState(true)
  const location = useLocation()
  const route = useNavigate()
  return (
    <div className="h-screen flex gap-[12rem]">
      <div className="pt-[5rem] ">
        <TooltipProvider>
          <DuckNavGroup<true>
            nav={{
              isCollabsed: open,
              group: [1, 1],
              router: route,
              location: location,
              className: 'border-r-border border-r-solid border-r border-t border-t-border border-t-solid',
            }}
            navigationKeys={[
              {
                button: {
                  route: '/inbox',
                  title: 'Inbox',
                  label: '12',
                  icon: Icon.inbox,
                },
              },

              {
                button: {
                  route: '/sent',
                  title: 'Sent',
                  label: '32',
                  icon: Icon.send,
                },
              },
            ]}
          />
        </TooltipProvider>
      </div>
      <button
        className="mt-[5rem]"
        onClick={() => setOpen(!open)}
      >
        Toggle
      </button>
    </div>
  )
}

import { createRouter, RouterProvider, useLocation, useNavigate } from '@tanstack/react-router'
import { routeTree } from '../src/routeTree.gen'

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>,
)
