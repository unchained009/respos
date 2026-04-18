const CartDrawer = ({ cartItems, onAdd, onRemove, onPlaceOrder, loading }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="cart-drawer">
      <div className="cart-drawer__header">
        <div>
          <h2>Your Order</h2>
          <p>{cartItems.length} items ready to place</p>
        </div>
        <strong>Rs. {total}</strong>
      </div>

      <div className="cart-drawer__items">
        {cartItems.length === 0 ? (
          <p className="empty-state">Your cart is empty. Add something tasty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div>
                <h4>{item.name}</h4>
                <p>Rs. {item.price}</p>
              </div>
              <div className="quantity-control">
                <button type="button" onClick={() => onRemove(item)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => onAdd(item)}>
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button type="button" className="primary-button full-width" onClick={onPlaceOrder} disabled={!cartItems.length || loading}>
        {loading ? 'Placing order...' : 'Place Order'}
      </button>
    </aside>
  );
};

export default CartDrawer;
