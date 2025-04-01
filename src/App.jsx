import "./App.css";
import Dashboard from "./component/Dashboard";
import Product from './component/Product';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Register from "./component/Register";
import Cart from "./component/Cart";
import AddProduct from './component/AddProduct';

import { BrowserRouter,Routes,Route } from "react-router-dom";
import {createContext,useState,useEffect} from 'react';

export const AuthContext = createContext();

function App() {
  

    const [login,setLogin] = useState(false);
    const [token,setToken] = useState(null);
    
    const handleRegister = async (name,email,password)=>{
        const response = await fetch("http://localhost:4040/register",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({name,email,password})
        });

        if(response.ok)
        {
            const data = await response.json();
            setToken(data.token);
            localStorage.setItem("token",data.token);
            setLogin(true);
            return "success";
        }
        else {
            const data = await response.json();
            return data.message;
        }
    }

    const handleLogin = async (email,password)=>{
        const response = await fetch("http://localhost:4040/login",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({email,password})
        });

        if(response.ok)
        {
            const data = await response.json();
            setToken(data.token);
            localStorage.setItem("token",data.token);
            setLogin(true);
            return "success";
        }
        else {
            const data = await response.json();
            return data.message;
        }
    }

    const logout = async ()=>{
        setLogin(false);
        localStorage.removeItem("token");
        setToken(null);
    }

    useEffect(()=>{
        setToken(localStorage.getItem("token"));
        if(token)
        {
            const verifyToken = async ()=>{
                const response = await fetch("http://localhost:4040/verifyToken",{
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json",
                    },
                    body : JSON.stringify({token})
                });

                if(response.ok)
                {
                    setLogin(true);
                }
                else {
                    setLogin(false);
                    localStorage.removeItem("token");
                }
            }
            verifyToken();
        }
    },[token,login]);

  return (
   <div>
    <BrowserRouter >
    <AuthContext.Provider value={{login,handleRegister,setLogin,handleLogin,logout}}>
      <Navbar />
      <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/products/:productname/:category" element={<Product />}></Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/addproducts" element={<AddProduct />} />
      </Routes>
    </AuthContext.Provider>
    </BrowserRouter>
   </div>
  )
}

export default App
