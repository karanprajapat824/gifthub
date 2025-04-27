import React, { useEffect, useState, useContext } from "react";
import "./../css/Cart.css";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { email, token,cart,setCart,fetchCart} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (email) fetchCart();
  }, [email, token]);

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:4040/removeFromCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, productId: id }),
      });

      if (response.ok) {
        setCart((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="title">Your Shopping Cart</h1>
      {cart.length === 0 ? (
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
              {cart.map((item, index) => (
                <div key={item.id}>
                  <div className="cart-item">
                    <div className="img-container">
                      <img
                        src={item.images[0]}
                        alt={item.productName}
                        className="item-image"
                      />
                    </div>
                    <div className="item-details">
                      <div>
                        <h3 className="item-name">{item.productName}</h3>
                        <p className="item-price">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div>
                     <button 
                     style={{width : "10vw",margin : "2vh 2vw"}} 
                     className="buy-now"
                     onClick={()=>navigate("/buy-now/"+item._id)}
                     >Buy Now</button>
                     <button 
                     style={{width : "15vw",margin : "2vh 2vw"}} 
                     className="add-cart"
                     
                     >Remove From Cart
                     
                     </button> 
                     </div>
                    </div>
                  </div>
                  {index < cart.length - 1 && <hr className="separator" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
