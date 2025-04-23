import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import "./../css/UserProfile.css";

const UserProfile = () => {
  const { email, login, token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:4040/getUserByEmail/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error("Error fetching user:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUser();
  }, [email, token]);

  if (!login) {
    return <p className="unauthorized">🔒 Please log in to view your profile.</p>;
  }

  if (!user) {
    return <p className="loading">Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">{user.name.substring(0,1)}</div>
        <div>
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-phone">{user.phoneNumber || "Phone: Not Provided"}</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="addresses">
          <h3>Saved Addresses</h3>
          {user.address?.length > 0 ? (
            <ul>
              {user.address.map((addr, i) => (
                <li key={i}>{addr}</li>
              ))}
            </ul>
          ) : (
            <p className="faded-text">No addresses added.</p>
          )}
        </div>

        <div className="cart-info">
          <h3>Cart Summary</h3>
          <p className="cart-items-count">🛒 Items in Cart: {user.cart?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
