import { NavLink, Outlet } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext.jsx';

const AdminLayout = () => {
  const { user, logout } = useAdmin();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <p className="eyebrow">Restaurant POS</p>
          <h1>Control Room</h1>
          <p className="sidebar-copy">Manage live orders, menu updates, tables, and sales from one dashboard.</p>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/menu">Menu</NavLink>
          <NavLink to="/admin/tables">Tables</NavLink>
        </nav>

        <div className="admin-user-card">
          <p>{user?.name}</p>
          <span>{user?.role}</span>
          <button type="button" className="secondary-button full-width" onClick={logout}>
            Log Out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
