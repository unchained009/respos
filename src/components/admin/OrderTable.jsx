import StatusBadge from '../common/StatusBadge.jsx';

const OrderTable = ({ orders, onStatusChange, showActions = true }) => (
  <div className="table-wrapper">
    <table className="data-table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Table</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id.slice(-6)}</td>
            <td>
              {order.tableName} / #{order.tableNumber}
            </td>
            <td>{order.items.map((item) => `${item.name} x${item.quantity}`).join(', ')}</td>
            <td>Rs. {order.totalAmount}</td>
            <td>
              <StatusBadge status={order.status} />
            </td>
            <td>
              {showActions ? (
                <div className="action-row">
                  {['accepted', 'rejected', 'preparing', 'served', 'completed'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      className="ghost-button"
                      onClick={() => onStatusChange(order._id, status)}
                      disabled={order.status === status}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderTable;
