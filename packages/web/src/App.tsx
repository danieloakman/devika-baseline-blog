import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRequestHandler,
  getRequestHandler,
} from '@baseline/client-api/request-handler';

async function protectedLoader() {
  console.debug('protected loader');
  if (!getRequestHandler()) {
    console.debug('creating request handler for unauthenticated requests');
    createRequestHandler();
  }
  return null;
}

const router = createBrowserRouter([
  { path: '/', element: <Home />, loader: protectedLoader },
  // { path: '/about', element: <About /> },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
);

export default App;
