import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout.jsx';
import LoginPage from './pages/admin/LoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import MenuManagementPage from './pages/admin/MenuManagementPage.jsx';
import OrdersPage from './pages/admin/OrdersPage.jsx';
import TablesPage from './pages/admin/TablesPage.jsx';
import CustomerTablePage from './pages/customer/CustomerTablePage.jsx';
import { AdminProvider, useAdmin } from './context/AdminContext.jsx';

const ProtectedAdminRoute = ({ children }) => {
  const { token } = useAdmin();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/admin/login" replace />} />
    <Route path="/table/:tableName" element={<CustomerTablePage />} />
    <Route path="/admin/login" element={<LoginPage />} />
    <Route
      path="/admin"
      element={
        <ProtectedAdminRoute>
          <AdminLayout />
        </ProtectedAdminRoute>
      }
    >
      <Route index element={<DashboardPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="menu" element={<MenuManagementPage />} />
      <Route path="tables" element={<TablesPage />} />
    </Route>
  </Routes>
);

const App = () => (
  <AdminProvider>
    <AppRoutes />
  </AdminProvider>
);

export default App;
