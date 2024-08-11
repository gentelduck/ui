import { createRootRoute, Outlet } from '@tanstack/react-router'
import React from 'react'
import { App } from '../main'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  // <TanStackRouterDevtools position="bottom-right" />
  // <ReactQueryDevtools
  //     initialIsOpen={false}
  //     position="left"
  //     buttonPosition="bottom-left"
  // />
  // <ScrollRestoration />
  component: () => (
    <>
      <App />

      <Outlet />
    </>
  ),
})
