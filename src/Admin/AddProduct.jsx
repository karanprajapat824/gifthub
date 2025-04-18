import React, { useState, useContext } from "react";
import "./Admin.css"; 
import { AuthContext } from "../App";

const AddProduct = () => {
  const { role,token } = useContext(AuthContext);
  const [form, setForm] = useState({
    productName: "",
    category: "",
    price: "",
    brand: "",
    for: "all",
    images: [""],
    inStock: true,
    details: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("image")) {
      const index = Number(name.split("-")[1]);
      const newImages = [...form.images];
      newImages[index] = value;
      setForm({ ...form, images: newImages });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "admin") {
      setMessage("Unauthorized: Only admin can add products.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4040/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Product added successfully!");
        setForm({
          productName: "",
          category: "",
          price: "",
          brand: "",
          for: "all",
          images: [""],
          inStock: true,
          details: "",
        });
      } else {
        setMessage(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Server error");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      {message && <p className="message">{message}</p>}
      <div className="product-form">
        <label>Product Name:</label>
        <input type="text" name="productName" value={form.productName} onChange={handleChange} required />

        <label>Category:</label>
        <input type="text" name="category" value={form.category} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} required />

        <label>Brand:</label>
        <input type="text" name="brand" value={form.brand} onChange={handleChange} />

        <label>For (e.g. men, women, kids, all):</label>
        <input type="text" name="for" value={form.for} onChange={handleChange} />

        <label>In Stock:</label>
        <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />

        <label>Details (JSON format):</label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder='e.g. {"color":"red", "material":"cotton"}'
        />

        <label>Product Images (URLs):</label>
        {form.images.map((img, index) => (
          <input
            key={index}
            type="text"
            name={`image-${index}`}
            value={img}
            onChange={handleChange}
            placeholder={`Image URL ${index + 1}`}
          />
        ))}
        <button type="button" onClick={addImageField}>
          + Add another image
        </button>

        <button type="submit" className="submit-btn" onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;
