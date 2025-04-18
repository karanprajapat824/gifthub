import "./App.css";
import Dashboard from "./component/Dashboard";
import Product from './component/Product';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Register from "./component/Register";
import Cart from "./component/Cart";
import AdminDashboard from './Admin/AdminDashboard';
import AddProduct from './Admin/AddProduct';
import ManageFilters from './Admin/ManageFilters';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const handleRegister = async (name, email, password) => {
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

    if (!name || name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }

    if (!email || !email.includes('@')) {
      return "Invalid email address";
    } else {
      const domain = email.split("@")[1];
      if (!validDomains.includes(domain)) {
        return "Invalid email domain";
      }
    }

    if (!password || password.length < 5 || password.length > 20) {
      return "Password must be between 5 and 20 characters";
    }

    try {
      const response = await fetch("http://localhost:4040/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setLogin(true);
        setRole(data.role);
        return "success";
      } else {
        const data = await response.json();
        return data.message || "Registration failed";
      }
    } catch (error) {
      console.error("Registration error:", error);
      return "An error occurred. Please try again.";
    }
  };

  const handleLogin = async (email, password) => {
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

    if (!email || !email.includes('@')) {
      return "Invalid email address";
    } else {
      const domain = email.split("@")[1];
      if (!validDomains.includes(domain)) {
        return "Invalid email address";
      }
    }

    if (!password || password.length < 5 || password.length > 20) {
      return "Password must be between 5 and 20 characters";
    }

    try {
      const response = await fetch("http://localhost:4040/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setLogin(true);
        setRole(data.role);
        return "success";
      } else {
        const data = await response.json();
        return data.message;
      }
    } catch (error) {
      console.error("Login error:", error);
      return "An error occurred. Please try again.";
    }
  };

  const logout = () => {
    setLogin(false);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const verifyToken = async () => {
        try {
          const response = await fetch("http://localhost:4040/verifyToken", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${storedToken}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setLogin(true);
            setRole(data.user.role);
          } else {
            logout();
          }
        } catch (err) {
          console.error("Token verification failed:", err);
          logout();
        } finally {
          setLoading(false); 
        }
      };
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AuthContext.Provider value={{ login, handleRegister, setLogin, handleLogin, logout, role, token}}>
          <Navbar />
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>
          ) : (
            <Routes>
              {login && role === "admin" ? (
                <>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/manage-filters" element={<ManageFilters />}/>
                </>
              ) : (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products/:productname/:category" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}
            </Routes>
          )}
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
