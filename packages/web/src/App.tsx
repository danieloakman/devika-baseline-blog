import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
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
