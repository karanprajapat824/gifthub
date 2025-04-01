import Sidebar from './Sidebar';
import './../css/Product.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";
const Product = ()=>{

    const {productname,category} = useParams();
    const [product,setProduct] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await fetch(`http://localhost:4040/getproduct/${productname}/${category}`,{
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            if(response.ok)
            {
                const item = await response.json();
                setProduct(item.data);
                console.log(item.data);
            }
        }

        fetchData();

    },[]);

    return(
        <div className='Mainproduct'>
            <Sidebar />
            <div className='mainproduct-cards'>
                {
                    product?.map((item)=>(
                    <div className='mainProduct-card'>
                    <div className='card-image'>
                        <img src={item.image_url}></img>
                    </div>
                    <div className='card-info'>
    <div className='card-name'>{item.product_name}</div>
    <div className='card-description' title={item.product_description}>
        {item.product_description.length > 60 
            ? item.product_description.slice(0, 60) + " ..." 
            : item.product_description}
    </div>
    <div style={{display: "flex", alignItems: "center",justifyContent : "space-around"}}>
        <div className='card-price'><MdOutlineCurrencyRupee />{item.product_price}</div>
        <div className='card-button'>
            <button>Add to Cart</button>
        </div>
    </div>
</div>
 
                    </div>
                    ))
                }
                    
            </div>            
        </div>
    )
}

export default Product;