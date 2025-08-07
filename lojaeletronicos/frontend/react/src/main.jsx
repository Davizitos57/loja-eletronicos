import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import { CarrinhoProvider } from './context/CarrinhoContext.jsx'
import SignIn from './pages/login/SignIn.jsx';
import SignUp from './pages/login/SignUp.jsx';

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
      <CarrinhoProvider>
        <Home />
      </CarrinhoProvider>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);