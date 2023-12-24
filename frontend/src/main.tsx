import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import 'vite/modulepreload-polyfill'; // required for vite entrypoints
import {Outlet, RootRoute, Route, Router, RouterProvider} from "@tanstack/react-router";
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {Index} from "./components/pages/Index";

const rootRoute = new RootRoute(
  {
    component: () => (
      <>
        <h1>Diary</h1>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  }
)

const indexRoot = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index
})

const routeTree = rootRoute.addChildren([indexRoot])
const router = new Router({ routeTree })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
