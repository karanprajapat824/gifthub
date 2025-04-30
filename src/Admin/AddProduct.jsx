import React, { useState, useContext } from "react";
import "./Admin.css";
import { AuthContext } from "../App";

const AddProduct = () => {
  const { role, token } = useContext(AuthContext);
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

  const products = [
    {
      productName: "Nike Air Max 90",
      category: "shoes",
      price: 120.99,
      brand: "Nike",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product1-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product1-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product1-Image3"
      ],
      inStock: true,
      details: { color: "Black", material: "Leather" },
      createdAt: new Date()
    },
    {
      productName: "Adidas Ultraboost 21",
      category: "shoes",
      price: 180.50,
      brand: "Adidas",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product2-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product2-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product2-Image3"
      ],
      inStock: true,
      details: { color: "White", material: "Primeknit" },
      createdAt: new Date()
    },
    {
      productName: "Puma Clyde Court",
      category: "shoes",
      price: 110.99,
      brand: "Puma",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product3-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product3-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product3-Image3"
      ],
      inStock: true,
      details: { color: "Red", material: "Synthetic" },
      createdAt: new Date()
    },
    {
      productName: "Reebok Classic Leather",
      category: "shoes",
      price: 75.99,
      brand: "Reebok",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product4-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product4-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product4-Image3"
      ],
      inStock: true,
      details: { color: "Blue", material: "Leather" },
      createdAt: new Date()
    },
    {
      productName: "Under Armour HOVR Phantom",
      category: "shoes",
      price: 130.75,
      brand: "Under Armour",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product5-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product5-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product5-Image3"
      ],
      inStock: true,
      details: { color: "Gray", material: "Textile" },
      createdAt: new Date()
    },
    {
      productName: "New Balance 574",
      category: "shoes",
      price: 85.99,
      brand: "New Balance",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product6-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product6-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product6-Image3"
      ],
      inStock: true,
      details: { color: "Gray", material: "Suede" },
      createdAt: new Date()
    },
    {
      productName: "Vans Old Skool",
      category: "shoes",
      price: 60.99,
      brand: "Vans",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product7-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product7-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product7-Image3"
      ],
      inStock: true,
      details: { color: "Black", material: "Canvas" },
      createdAt: new Date()
    },
    {
      productName: "Nike Air Force 1",
      category: "shoes",
      price: 95.99,
      brand: "Nike",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product8-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product8-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product8-Image3"
      ],
      inStock: true,
      details: { color: "White", material: "Leather" },
      createdAt: new Date()
    },
    {
      productName: "Converse Chuck Taylor",
      category: "shoes",
      price: 50.99,
      brand: "Converse",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product9-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product9-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product9-Image3"
      ],
      inStock: true,
      details: { color: "Red", material: "Canvas" },
      createdAt: new Date()
    },
    {
      productName: "Fila Disruptor II",
      category: "shoes",
      price: 75.50,
      brand: "Fila",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product10-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product10-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product10-Image3"
      ],
      inStock: true,
      details: { color: "White", material: "Leather" },
      createdAt: new Date()
    },
    {
      productName: "Skechers GOwalk 5",
      category: "shoes",
      price: 69.99,
      brand: "Skechers",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product11-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product11-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product11-Image3"
      ],
      inStock: true,
      details: { color: "Blue", material: "Mesh" },
      createdAt: new Date()
    },
    {
      productName: "Brooks Addiction Walker",
      category: "shoes",
      price: 120.00,
      brand: "Brooks",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product12-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product12-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product12-Image3"
      ],
      inStock: true,
      details: { color: "Black", material: "Leather" },
      createdAt: new Date()
    },
    {
      productName: "Salomon Speedcross 5",
      category: "shoes",
      price: 140.99,
      brand: "Salomon",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product13-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product13-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product13-Image3"
      ],
      inStock: true,
      details: { color: "Yellow", material: "Textile" },
      createdAt: new Date()
    },
    {
      productName: "Asics Gel-Kayano 27",
      category: "shoes",
      price: 160.75,
      brand: "Asics",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product14-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product14-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product14-Image3"
      ],
      inStock: true,
      details: { color: "Blue", material: "Mesh" },
      createdAt: new Date()
    },
    {
      productName: "Hoka One One Clifton 7",
      category: "shoes",
      price: 140.00,
      brand: "Hoka One One",
      for: "all",
      images: [
        "https://via.placeholder.com/150/0000FF/808080?Text=Product15-Image1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Product15-Image2",
        "https://via.placeholder.com/150/FFFF00/000000?Text=Product15-Image3"
      ],
      inStock: true,
      details: { color: "Green", material: "Textile" },
      createdAt: new Date()
    },
  ];
  
  const seedProducts = async () => {
    try {
      const response = await fetch("http://localhost:4040/seedProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({products : products}),
      });
  
      const data = await response.json(); 
  
      if (response.status === 201) {
        alert("Products seeded successfully!");
      } else {
        alert("Failed to seed products.");
      }

    } catch (error) {
      console.error("Error seeding products:", error);
      alert("There was an error seeding the products.");
    }
  };  
  


  

  const [message, setMessage] = useState("");

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
          "Authorization": `Bearer ${token}`,
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
        <select name="for" value={form.for} onChange={handleChange}>
        <option value="">-- Select --</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
        <option value="all">All</option>
        <option value="all">flowers</option>
        </select>


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
        {message && <p className="message">{message}</p>}
        <button type="submit" className="submit-btn" onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;
