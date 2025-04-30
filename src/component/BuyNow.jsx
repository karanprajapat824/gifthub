import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import "./../css/BuyNow.css";

const BuyNow = () => {
  const { id } = useParams();
  const { email,token,login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addAddressModel,setAddressModel] = useState(false);
  const [newAddress,setNewAddress] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [quantity,setQuantity] = useState(1);
  const [orderConfirm,setOrderConfirm] = useState(false);

  const fetchAddresses = async () => {
    const response = await fetch("http://localhost:4040/getUserInfo",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({email})
    });
    if (response.ok) {
      const data = await response.json();
      setAddresses(data.address);
      setSelectedAddress(data.address[0]);
      console.log(data.address);
      if (data.length > 0) setSelectedAddress(data[0].id);
    }
  };

  useEffect(() => {
    if(!login)
    {
        navigate("/login");
    }
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
    fetchAddresses();
  }, [id]);

  const handleBuy = async (e) => {
    e.preventDefault();
    if (!selectedAddress || !paymentMethod || !phoneNumber) {
      alert("Please fill all the fields.");
      return;
    }

    const response = await fetch("http://localhost:4040/placeOrder",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `bearer ${token}`
        },
        body : JSON.stringify({
            productId : id,
            address : selectedAddress,
            paymentMethod : paymentMethod,
            userEmail : email,
            phoneNumber : phoneNumber,
            productName : product.productName,
            price : product.price,
            quantity : quantity,
            productImage : product.images[0],
        })
    })
    if(response.ok)
    {
        const data = await response.json();
        setOrderConfirm(true);
    }
    else {
        const data = await response.json();
        alert(data.message);
    }
  };

  const handleGoToOrders = () => navigate("/orders");
  const handleBrowseMore = () => navigate("/");

  const handleNewAddressRequest = ()=>{
     setAddressModel(true);
  }

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async ()=>{
     const response = await fetch("http://localhost:4040/updateUserAddress",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({email,address : newAddress})
     });
     if(response.ok)
     {
         setAddressModel(false);
         fetchAddresses();
     }
  }

  const onClose = ()=>{
    setAddressModel(false);
  }

  // console.log(selectedAddress);
  return (
    <div className="buynow">
      {orderConfirm ? (
        <div className="order-confirm-modal">
          <h2>Order Placed Successfully!</h2>
          <p>Your order for <strong>{product?.productName}</strong> has been confirmed.</p>
          <div className="modal-buttons">
            <button onClick={handleGoToOrders}>Go to Orders</button>
            <button onClick={handleBrowseMore}>Browse More</button>
          </div>
        </div>
      ) : (
        <>
          <div className="buynow-left-section">
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

          <form onSubmit={handleBuy} className="buynow-right-section">
            <h2>Confirm Your Purchase</h2>

            <div className="section">
              <h3>Select Address</h3>
              {addresses.length === 0 ? (
                <p>No address found.</p>
              ) : (
                <select
                  required
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  {addresses.map((addr, i) => (
                    <option 
                    onChange={(e => setSelectedAddress(e.target.value))}
                    key={i} 
                    value={addr}>
                    {addr}
                    </option>
                  ))}
                </select>
              )}
              <button className="add-new-address" onClick={handleNewAddressRequest}>
                Add New Address
              </button>
              {addAddressModel && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>Add New Address</h2>
                    <textarea
                      placeholder="Enter your full address"
                      rows="4"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                    />
                    <div className="modal-buttons">
                      <button className="submit-btn" onClick={handleSubmit}>Add Address</button>
                      <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="section">
              <h3>Phone Number</h3>
              <input
                required
                placeholder="Enter your phone number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="section">
              <h3>Product Quantity</h3>
              <input
                required
                placeholder="Enter Quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="section">
              <h3>Select Payment Method</h3>
              <label>
                <input
                  required
                  type="radio"
                  name="payment"
                  value="cod"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Pay on Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit/Debit Card
              </label>
            </div>

            <div className="section">
              <h3>Total Amount</h3>
              <p>₹{product?.price * quantity}</p>
            </div>

            <div className="buttons">
              <button className="confirm" type="submit">Confirm Purchase</button>
              <button className="cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default BuyNow;
