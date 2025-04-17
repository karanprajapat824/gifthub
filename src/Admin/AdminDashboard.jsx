import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import ManageSellers from "./ManageSellers";
import "./admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="add-product">Add Product</Link></li>
          <li><Link to="delete-product">Delete Product</Link></li>
          <li><Link to="manage-sellers">Manage Sellers</Link></li>
        </ul>
      </aside>
      <main className="admin-content">
        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="delete-product" element={<DeleteProduct />} />
          <Route path="manage-sellers" element={<ManageSellers />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
