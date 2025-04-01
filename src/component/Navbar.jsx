import './../css/Navbar.css';
import { FcSearch } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../App';
import { useContext } from 'react';

const Navbar = ()=>{
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    
    return(
        <div>
            <div className='navbar'>
                <div className='logo'>
                    <img src='./websiteImages/gift-logo1.png'></img>
                </div>
                <div className='search-bar'>
                    <input placeholder='Search Anything.....'></input>
                    <button>
                    Search<FcSearch style={{fontSize : "1.5vw"}}/></button>
                </div>

                <div className='navbar-right'>
                    <div className='profile'>
                        <div onClick={()=>navigate("/addproducts")}>Add Products</div>
                    </div>
                    <div  
                    className='profile'>
                        <FaUserCircle />
                        {
                            login ? <div onClick={()=>navigate("/profile")}>Profile</div> : 
                            <div onClick={()=>navigate("/login")}>Login</div>
                        }
                    </div>

                    <div onClick={()=>navigate("/cart")} className='cart'>
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
