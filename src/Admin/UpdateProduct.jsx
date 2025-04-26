import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./../css/ProductDetail.css"; // Reusing your ProductDetail styles

const UpdateProduct = () => {
  const { token, role } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
const naviagetTo = useNavigate();

  const fetchProducts = async () => {
    const response = await fetch(`http://localhost:4040/getAllProducts`, {
      method : "GET",
      headers: {
          "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
      const defaultImages = {};
      data.forEach((product) => {
        defaultImages[product._id] = product.images[0];
      });
      setSelectedImages(defaultImages);
    } else {
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = async (id) => {
    if (role !== "admin") {
        alert("Only admins can update products.");
        return;
    }
    naviagetTo(`/update-product/${id}`);
  };

  return (
    <div className="delete-container">
      {products.map((product) => (
        <div key={product._id} className="product-item">
          <div className="left-section">
            <div className="thumbnail-gallery">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="product thumb"
                  className={`thumb ${
                    selectedImages[product._id] === img ? "active" : ""
                  }`}
                  onClick={() =>
                    setSelectedImages({ ...selectedImages, [product._id]: img })
                  }
                />
              ))}
            </div>
            <div className="main-image">
              <img
                src={selectedImages[product._id]}
                alt="Selected"
                className="selected-img"
              />
            </div>
          </div>

          <div className="right-section">
            <h2>{product.productName}</h2>
            <p className="brand">
              Brand: <strong>{product.brand || "Brand"}</strong>
            </p>
            <p className="price">₹ {product.price.toLocaleString()}</p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>For:</strong> {product.for}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>

            <div className="buttons">
              <button
                className="delete-btn"
                onClick={() => handleUpdate(product._id)}
              >
                Update Information
              </button>
            </div>

            <div className="product-features">
              <h3>Details</h3>
              <div>
                {product.details && typeof product.details === "object" && (
                  <ul>
                    {Object.entries(product.details).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                        {Array.isArray(value) ? (
                          <ul className="sub-list">
                            {value.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateProduct;
