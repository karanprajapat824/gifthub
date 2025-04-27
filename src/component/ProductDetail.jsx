import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./../css/ProductDetail.css";
import { FcViewDetails } from "react-icons/fc";
import { AuthContext } from "../App";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { login, email, token } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:4040/getProductById/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images[0]);

        if (typeof data.details === "string") {
          try {
            data.details = JSON.parse(data.details);
          } catch (e) {
            console.error("Failed to parse product.details:",e);
            data.details = {};
          }
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    if (!login) {
      navigateTo("/login");
    } else {
      navigateTo(`/buy-now/${id}`);
    }
  };

  const handleAddToCart = async () => {
    if(!login) navigateTo("/login");
    try {
      const response = await fetch("http://localhost:4040/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          productId: id,
        }),
      });
        const data = await response.json();
        setModalMessage(data.message);
        setShowModal(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setModalMessage("Something went wrong while adding to cart");
      setShowModal(true);
    }
  };

  return (
    <div className="product-detail-container">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            <div className="modal-buttons">
              <button onClick={() => navigateTo("/cart")}>Go to Cart</button>
              <button onClick={() => setShowModal(false)}>OK</button>
            </div>
          </div>
        </div>
      )}

      <div className="left-section">
        <div className="thumbnail-gallery">
          {product?.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="product thumb"
              className={`thumb ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={selectedImage} alt="Selected" />
        </div>
      </div>

      <div className="right-section">
        <h2>{product?.productName || "Name"}</h2>
        <p className="brand">
          Brand: <strong>{product?.brand || "Brand"}</strong>
        </p>
        <p className="price">₹ {product?.price.toLocaleString() || "000"}</p>
        <p>
          <strong>Category:</strong> {product?.category || "Category"}
        </p>
        <p>
          <strong>For:</strong> {product?.for || "All"}
        </p>
        <p>
          <strong>Availability:</strong>{" "}
          {product?.inStock ? "In Stock" : "Out of Stock"}
        </p>

        <div className="buttons">
          <button className="buy-now" onClick={handleBuyNow}>
            Buy Now
          </button>
          <button className="add-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        <div className="product-features">
          <h3>
            <FcViewDetails />
            Details
          </h3>

          <div>
            {product?.details && typeof product.details === "object" && (
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
  );
};

export default ProductDetail;
