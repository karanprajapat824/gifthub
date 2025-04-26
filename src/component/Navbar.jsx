import './../css/Navbar.css';
import { FcSearch } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../App';
import { useContext,useState } from 'react';

const Navbar = ()=>{
    const navigateTo = useNavigate();
    const {login,logout} = useContext(AuthContext);
    const [search,setSearch] = useState("");
    return(
        <div>
            <div className='navbar'>
                <div className='logo' onClick={()=>navigateTo("/")}>
                    <img src='./websiteImages/gift-logo1.png'></img>
                </div>
                <div className='search-bar'>
                    <input placeholder='Search Anything.....'
                    onchange={(e)=>setSearch(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            navigateTo("/products?product="+search);
                        }
                    }
                    }
                    ></input>
                    <button>
                    Search<FcSearch style={{fontSize : "1.5vw"}}/></button>
                </div>

                <div className='navbar-right'>
                    <div  
                    className='profile'>
                        <FaUserCircle />
                        {
                            login ? <><div onClick={()=>navigateTo("/profile")}>Profile</div>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div onClick={logout}>Logout</div>
                            </> : 
                            <div onClick={()=>navigateTo("/login")}>Login</div>
                        }
                    </div>

                    <div onClick={()=>navigateTo("/cart")} className='cart'>
                        <FiShoppingCart />
                        <div>0</div>
                        <span>Cart</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  Navbar;
