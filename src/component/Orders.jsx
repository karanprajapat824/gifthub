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
      const res = await fetch("http://localhost:4040/getUserOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email })
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

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div className="order-card" key={index} onClick={()=>navigateTo(`/product-detailes/${order.productId}`)}>
              <img src={order.productImage} alt={order.productName} />
              <div className="order-info">
                <h3>{order.productName}</h3>
                <p><strong>Price:</strong> ₹{order.price}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</p>
                <p><strong>Order Status:</strong> {order.orderStatus}</p>
                <p><strong>Order Date:</strong> {formatDate(order.createdAt)}</p>
                <p><strong>Delivery Date:</strong> {addDays(order.createdAt, 5)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
