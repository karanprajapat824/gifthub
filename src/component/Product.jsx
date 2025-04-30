import './../css/Product.css';
import { useParams,useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";

const Product = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const search = queryParams.get('search');
    const category = queryParams.get('category');
    const gender = queryParams.get('targetFor');

    const [product, setProduct] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4040/getProducts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({category,gender})
            });
            
            if (response.ok) {
                const item = await response.json();
                setProduct(item);
            }
        }

        const fetchAllProducts = async () => {
            const response = await fetch(`http://localhost:4040/getAllproducts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            }
        }

        const fetchBySearch = async () => {
            const response = await fetch(`http://localhost:4040/searchProducts`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({product : search})
            });
            if(response.ok){
                const data = await response.json();
                setProduct(data);
            }
        }

        if(search) fetchBySearch();
        else if(category || gender) fetchData();
        else fetchAllProducts();
    }, [search, category,gender]);

    return (
        <div className='Mainproduct'>
            <div className='mainproduct-cards' style={{width : "100vw"}}>
                {product?.map((item, index) => (
                    <div className='mainProduct-card' key={index}>
                        <div className='card-image'>
                            <img src={item.images[0] || "/default.jpg"} alt={item.productName} />
                        </div>
                        <div className='card-info'>
                            <div className='card-name' title={item.productName}>
                                {item.productName.length > 35
                                    ? item.productName.slice(0, 35) + "..."
                                    : item.productName}
                            </div>
                            <div className='card-bottom'>
                                <div className='card-price'>
                                    <MdOutlineCurrencyRupee />{item.price}
                                </div>
                                <button onClick={()=>navigateTo(`/product-details/${item._id}`)} className='card-button'>Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
