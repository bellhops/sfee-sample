import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Layout from './components/shared/Layout';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      element: <App queryClient={queryClient} />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: 'entry',
              lazy: () =>
                import('./routes/entry').then(({ loader, ...rest }) => ({
                  loader: loader(),
                  ...rest,
                })),
            },
            {
              path: ':step',
              lazy: () =>
                import('./routes/step').then(({ action, loader, ...rest }) => ({
                  action: action(queryClient),
                  loader: loader(queryClient),
                  ...rest,
                })),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  },
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
