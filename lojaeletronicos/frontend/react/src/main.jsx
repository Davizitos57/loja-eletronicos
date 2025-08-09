import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import Home from './pages/Home.jsx';
import SignIn from './pages/login/SignIn.jsx';
import SignUp from './pages/login/SignUp.jsx';
import { CarrinhoProvider } from './context/CarrinhoContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import DashboardLayout from './pages/cadastro/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProdutoList from './components/produto/ProdutoList';
import ProdutoShow from './components/produto/ProdutoShow';
import ProdutoCreate from './components/produto/ProdutoCreate';
import ProdutoEdit from './components/produto/ProdutoEdit';
import AdminList from './components/admin/AdminList.jsx';
import AdminShow from './components/admin/AdminShow.jsx';
import AdminCreate from './components/admin/AdminCreate.jsx';
import AdminEdit from './components/admin/AdminEdit.jsx';
import ClienteList from './components/cliente/ClienteList.jsx';
import ClienteShow from './components/cliente/ClienteShow.jsx';
import ClienteCreate from './components/cliente/ClienteCreate.jsx';
import ClienteEdit from './components/cliente/ClienteEdit.jsx';
import AppTheme from './shared-theme/AppTheme';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from './shared-theme/customizations';
import NotificationsProvider from './hooks/cadastro/useNotifications/NotificationsProvider';
import DialogsProvider from './hooks/cadastro/useDialogs/DialogsProvider';


const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

const AppLayout = () => (
  <AuthProvider>
    <CarrinhoProvider>
      <Outlet />
    </CarrinhoProvider>
  </AuthProvider>
);

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
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/produto",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: ProdutoList,
          },
          {
            path: ':produtoId',
            Component: ProdutoShow,
          },
          {
            path: 'new',
            Component: ProdutoCreate,
          },
          {
            path: ':produtoId/edit',
            Component: ProdutoEdit,
          },
        ],
      },
      {
        path: "/administrador",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: AdminList,
          },
          {
            path: ':adminId',
            Component: AdminShow,
          },
          {
            path: 'new',
            Component: AdminCreate,
          },
          {
            path: ':adminId/edit',
            Component: AdminEdit,
          },
        ],
      },
      {
        path: "/cliente",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: ClienteList,
          },
          {
            path: ':clienteId',
            Component: ClienteShow,
          },
          {
            path: 'new',
            Component: ClienteCreate,
          },
          {
            path: ':clienteId/edit',
            Component: ClienteEdit,
          },
        ],
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppTheme themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  </StrictMode>
);