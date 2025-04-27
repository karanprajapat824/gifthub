import './../css/Banner.css';
import {useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
const Banner = ({mainHeading})=>{
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    
    const handleNavigate = (category) => {
        navigate(`/products/?category=${category}&targetFor=${mainHeading}`);
      };
      
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await fetch(`http://localhost:4040/getAllCategory/${mainHeading}`,{
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            if(response.ok)
            {
                const data = await response.json();
                setProducts(data);
            }
        }
        fetchData();
    },[]);

    return(
        <div className='product-card'>
            <div className='product-heading'>For  {mainHeading}</div>
            <div className='product-card-content'>
               {
                    products?.map((item)=>(
                        <div onClick={()=>handleNavigate(item.category)} className='product'>
                        <div className='product-image'>
                            <img src={item.images[0] || ""}/>
                        </div>
                        <div className='product-name'>{item.category}</div>
                </div>
                    ))
               }
            </div>
        </div>
    )
}

export default Banner;