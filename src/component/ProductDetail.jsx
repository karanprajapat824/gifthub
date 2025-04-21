import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

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
              console.error("Failed to parse product.details:", e);
              data.details = {};
            }
          }
        
      }
    };
    fetchProduct();
  }, [id]);


  return (
    <div className="product-detail-container">
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
        <p className="brand">Brand: <strong>{product?.brand || "Brand"}</strong></p>
        <p className="price">₹ {product?.price.toLocaleString() || "000"}</p>
        <p><strong>Category:</strong> {product?.category || "Category"}</p>
        <p><strong>For:</strong> {product?.for || "All"}</p>
        <p><strong>Availability:</strong> {product?.inStock ? "In Stock" : "Out of Stock"}</p>
        

        <div className="buttons">
          <button className="buy-now">Buy Now</button>
          <button className="add-cart">Add to Cart</button>
        </div>

        <div className="product-features">
  <h3>Features</h3>
  <div>
    {product?.details && typeof product.details === 'object' && 
    (
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
