import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SignIn from './pages/login/SignIn.jsx';
import SignUp from './pages/login/SignUp.jsx';
import AppProviders from './providers/AppProviders.jsx'; // Se usar opção 1

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup", 
    element: <SignUp />,
  },
  {
    path: "/home",
    element: (
      <AppProviders>
        <Home />
      </AppProviders>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AppProviders>
        <Dashboard />
      </AppProviders>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);