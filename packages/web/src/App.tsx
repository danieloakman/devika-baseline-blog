import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  createRequestHandler,
  getRequestHandler,
} from '@baseline/client-api/request-handler';
import Blog from './pages/Blog';
import { queryClient } from '@baseline/client-api/query-client';

async function protectedLoader() {
  console.debug('protected loader');
  if (!getRequestHandler()) {
    console.debug('creating request handler for unauthenticated requests');
    createRequestHandler();
  }
  return null;
}

const router = createBrowserRouter([
  {
    id: 'public',
    Component: Outlet,
    loader: protectedLoader,
    children: [
      { path: '/', Component: Home, index: true },
      { path: '/blog/:id', Component: Blog },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
