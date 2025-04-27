import React, { useState, useEffect, useContext } from "react";
import "./Admin.css";
import { AuthContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import JSON5 from "json5"; 

const UpdateInfo = () => {
  const { role, token } = useContext(AuthContext);
  const { id } = useParams();
  const navigateTo = useNavigate();

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4040/getProductById/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (typeof data.details === "object") {
            data.details = JSON.stringify(data.details, null, 2); 
          }
          setForm(data);
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("image")) {
      const index = Number(name.split("-")[1]);
      const newImages = [...form.images];
      newImages[index] = value;
      setForm((prevForm) => ({ ...prevForm, images: newImages }));
    } else if (type === "checkbox") {
      setForm((prevForm) => ({ ...prevForm, [name]: checked }));
    } else if (name === "for") {
      setForm((prevForm) => ({ ...prevForm, for: value }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const addImageField = () => {
    setForm((prevForm) => ({ ...prevForm, images: [...prevForm.images, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "admin") {
      setMessage("Unauthorized: Only admin can update products.");
      return;
    }

    try {
      let parsedDetails = form.details;
      if (typeof parsedDetails === "string") {
        try {
          parsedDetails = JSON5.parse(parsedDetails); 
        } catch (error) {
          setMessage("Invalid format in Details field. Please check your syntax.");
          return;
        }
      }

      const response = await fetch(`http://localhost:4040/updateProduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          details: parsedDetails,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Product updated successfully!");
        navigateTo("/update-product");
      } else {
        setMessage(data.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Server error");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Update Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={form.productName}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={form.brand}
          onChange={handleChange}
        />

        <label>For (e.g. men, women, kids, all):</label>
        <select name="for" value={form.for} onChange={handleChange}>
          <option value="">-- Select --</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="all">All</option>
        </select>

        <label>In Stock:</label>
        <input
          type="checkbox"
          name="inStock"
          checked={form.inStock}
          onChange={handleChange}
        />

        <label>Details (JSON format):</label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder='e.g. {"color":"red", "material":"cotton"}'
        />
        <small>Note: You can use JS-style objects too, like {`{ color: "red", material: "cotton" }`}</small>

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

        {message && <p className="message">{message}</p>}

        <button type="submit" className="submit-btn">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateInfo;
