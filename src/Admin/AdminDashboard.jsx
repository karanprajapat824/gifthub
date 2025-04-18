import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-card-container">
        <div className="admin-card" onClick={() => navigate('/add-product')}>
          <h2>Add Item</h2>
          <p>Add a new product to your store.</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/delete-product')}>
          <h2>Delete Item</h2>
          <p>Remove products from the store.</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/update-product')}>
          <h2>Update Item</h2>
          <p>Modify details of existing products.</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/manage-orders')}>
          <h2>Manage Orders</h2>
          <p>Track and update order statuses.</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/manage-users')}>
          <h2>Manage Users</h2>
          <p>View and control user accounts.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
