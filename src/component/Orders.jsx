import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import "./../css/Orders.css";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { email, token, login } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
    const navigateTo = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short"
    });
  };

  const addDays = (dateStr, days) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return formatDate(date);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`http://localhost:4040/getOrders/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    };

    if (login) {
      fetchOrders();
    }
  }, [email, token, login]);

  const handleCencel = async (orderId) => {
    const response = await fetch(`http://localhost:4040/cancelOrder/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (response.ok) {
      const updatedOrders = orders.filter(order => order.productId !== orderId);
      setOrders(updatedOrders);
    } else {
      console.error("Failed to cancel order:", response.statusText);
    }
  }

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <img src={order.productImage} alt={order.productName} />
              <div className="order-info">
                <h3>{order.productName}</h3>
                <p><strong>Price : </strong> ₹{order.price}</p>
                <p><strong>Quantity : </strong> {order.quantity}</p>
                <p><strong>Payment : </strong> {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</p>
                <p><strong>Order Status : </strong> {order.orderStatus}</p>
                <p><strong>Order Date : </strong> {formatDate(order.createdAt)}</p>
                <p><strong>Delivery Date : </strong> {addDays(order.createdAt, 5)}</p>
              </div>
              <div className="order-actions">
              <button className="add-cart" onClick={()=>navigateTo(`/product-details/${order.productId}`)}>View Details</button>
              <button onClick={()=>handleCencel(order.productId)} className="buy-now">Cencel Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
