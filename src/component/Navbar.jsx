import './../css/Navbar.css';
import { FcSearch } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../App';
import { useContext,useState,useEffect } from 'react';

const Navbar = ()=>{
    const navigateTo = useNavigate();
    const {login,logout,cart} = useContext(AuthContext);
    const [search,setSearch] = useState("");

    const handleLogout = async () => {
        logout();
        navigateTo("/");
    }
    return(
        <div>
            <div className='navbar'>
                <div className='logo' onClick={()=>navigateTo("/")}>
                    <img src='./websiteImages/gift-logo1.png'></img>
                </div>
                <div className='search-bar'>
                    <input placeholder='Search Anything.....'
                    onChange={(e)=>setSearch(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter")
                        {
                            navigateTo(`/products?search=${search}`)
                        }
                    }}
                    ></input>
                    <button onClick={()=>navigateTo(`/products?search=${search}`)}>
                    Search<FcSearch style={{fontSize : "1.5vw"}}/></button>
                </div>

                <div className='navbar-right'>
                    <div  
                    className='profile'>
                        <FaUserCircle />
                        {
                            login ? <><div onClick={()=>navigateTo("/profile")}>Profile</div>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div onClick={handleLogout}>Logout</div>
                            </> : 
                            <div onClick={()=>navigateTo("/login")}>Login</div>
                        }
                    </div>

                    <div onClick={()=>navigateTo("/cart")} className='cart'>
                        <FiShoppingCart />
                        <div>{cart.length}</div>
                        <span>Cart</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  Navbar;
