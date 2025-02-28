import './../css/Navbar.css';
import { FcSearch } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = ()=>{

    return(
        <div>
            <div className='navbar'>
            <div className='logo'>
                <img src='./gift-logo1.png'></img>
            </div>
                <div className='search-bar'>
                    <input placeholder='Search Anything.....'></input>
                    <button>
                    Search<FcSearch style={{fontSize : "1.5vw"}}/></button>
                </div>
            
            <div className='navbar-right'>
            <div className='profile'>
                <FaUserCircle />
            <div>Login</div>
            </div>
            <div className='cart'><FiShoppingCart />
            <div>0</div>
            <span>Cart</span>
            </div>
            
            </div>
        </div>
        
        </div>
        

    )
}

export default  Navbar;