import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import 'vite/modulepreload-polyfill'; // required for vite entrypoints
import {Outlet, RootRoute, Route, Router, RouterProvider} from "@tanstack/react-router";
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {Index} from "@/components/pages/Index";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Edit} from "@/components/pages/Edit";
import {New} from "@/components/pages/New";
import Box from '@mui/material/Box';

const rootRoute = new RootRoute(
  {
    component: () => (
      <Box sx={{width: 400}}>
        <h1>Diary</h1>
        <Outlet />
        <TanStackRouterDevtools />
      </Box>
    )
  }
)

const indexRoot = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index
})

const newRoot = new Route({
  getParentRoute: () => rootRoute,
  path: '/new',
  component: New
})

const editRoot = new Route({
  getParentRoute: () => rootRoute,
  path: '/$diaryId/edit',
  component: Edit
})

const routeTree = rootRoute.addChildren([indexRoot.addChildren([newRoot, editRoot])])
const router = new Router({ routeTree })

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
