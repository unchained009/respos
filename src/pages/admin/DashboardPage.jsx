import { useEffect, useState } from 'react';
import MetricCard from '../../components/admin/MetricCard.jsx';
import OrderTable from '../../components/admin/OrderTable.jsx';
import SectionCard from '../../components/common/SectionCard.jsx';
import { api } from '../../services/api.js';
import { createSocket } from '../../services/socket.js';

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState({
    salesToday: 0,
    allTimeSales: 0,
    orderCount: 0,
    topSellingItems: []
  });
  const [orders, setOrders] = useState([]);

  const loadData = async () => {
    const [summary, orderList] = await Promise.all([api.getAnalyticsSummary(), api.getOrders()]);
    setAnalytics(summary);
    setOrders(orderList.slice(0, 6));
  };

  useEffect(() => {
    loadData();

    const socket = createSocket();
    socket.emit('join:admin');

    socket.on('order:new', loadData);
    socket.on('order:updated', loadData);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleStatusChange = async (orderId, status) => {
    await api.updateOrderStatus(orderId, status);
    await loadData();
  };

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Live overview</p>
          <h2>Operations Dashboard</h2>
        </div>
      </header>

      <div className="metric-grid">
        <MetricCard label="Sales Today" value={`Rs. ${analytics.salesToday}`} helper="Accepted and completed orders" />
        <MetricCard label="All-Time Sales" value={`Rs. ${analytics.allTimeSales}`} helper="Revenue across all orders" />
        <MetricCard label="Total Orders" value={analytics.orderCount} helper="Every order ever placed" />
        <MetricCard
          label="Top Item"
          value={analytics.topSellingItems[0]?._id || 'No sales yet'}
          helper={analytics.topSellingItems[0] ? `${analytics.topSellingItems[0].quantitySold} sold` : 'Waiting for orders'}
        />
      </div>

      <SectionCard title="Recent Orders" subtitle="New orders appear here in real time.">
        <OrderTable orders={orders} onStatusChange={handleStatusChange} />
      </SectionCard>

      <SectionCard title="Top Selling Items" subtitle="Simple sales ranking from completed order data.">
        <div className="top-item-list">
          {analytics.topSellingItems.map((item) => (
            <article key={item._id} className="top-item-card">
              <h4>{item._id}</h4>
              <p>{item.quantitySold} sold</p>
              <span>Revenue: Rs. {item.revenue}</span>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default DashboardPage;
