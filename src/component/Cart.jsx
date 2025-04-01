import React, { useState } from 'react';
import './../css/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 249.99,
      image: "watch.avif",
      quantity: 1,
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      image: "watch.avif",
      quantity: 2,
    },
    {
      id: "3",
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "watch.avif",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = (price, quantity) => price * quantity;

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + calculateSubtotal(item.price, item.quantity),
      0
    );

  return (
    <div className="cart-container">
      <h1 className="title">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛍️</div>
          <h2 className="empty-title">Your cart is empty</h2>
          <p className="empty-text">
            Looks like you haven't added anything to your cart yet.
          </p>
          <a href="/products" className="btn">Start Shopping</a>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            <div className="card">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="cart-item">
                    <div className="img-container">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="item-image"
                      />
                    </div>
                    <div className="item-details">
                      <div>
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="quantity-controls">
                        <div className="quantity-btns">
                          <button
                            className="btn-icon"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            &#8722;
                          </button>
                          <span className="quantity-text">{item.quantity}</span>
                          <button
                            className="btn-icon"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            &#43;
                          </button>
                        </div>
                        <div className="item-actions">
                          <span className="subtotal">
                            ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
                          </span>
                          <button
                            className="btn-icon btn-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            &#128465; 
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <hr className="separator" />}
                </div>
              ))}
            </div>
          </div>
          <div className="order-summary">
            <div className="card">
              <h2 className="order-summary-title">Order Summary</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span>Free</span>
                </div>
                <hr className="separator" />
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <button className="btn btn-primary">Proceed to Checkout</button>
                <a href="/products" className="btn btn-outline">Continue Shopping</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
