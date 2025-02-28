import { useNavigate } from 'react-router-dom';

import './../css/MenuBar.css';
const MenuBar = ()=>{
    const navigate = useNavigate();
     return(
            <div className='menu-bar'>
            <label onClick={()=>navigate("/products")}>Cakes</label>
            <label onClick={()=>navigate("/products")}>Birthday</label>
            <label onClick={()=>navigate("/products")}>Anniversary</label>
            <label onClick={()=>navigate("/products")}>Festival</label>
            <label onClick={()=>navigate("/products")}>Decoration</label>
            <label onClick={()=>navigate("/products")}>Flowers</label>
            <label onClick={()=>navigate("/products")}>Choclates</label>
            <label onClick={()=>navigate("/products")}>Personalised</label>
            <label onClick={()=>navigate("/products")}>Combos</label>
            <label onClick={()=>navigate("/products")}>Others</label>
            </div>
    )
}

export default MenuBar;