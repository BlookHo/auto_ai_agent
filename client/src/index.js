import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: <App />
    }
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_fetcherPersist: true
    }
  }
);

// This is a workaround for the React Router warning
const WrappedApp = () => (
  <React.StrictMode>
    <RouterProvider 
      router={router}
      fallbackElement={null}
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
        v7_fetcherPersist: true
      }}
    />
  </React.StrictMode>
);

root.render(<WrappedApp />);
