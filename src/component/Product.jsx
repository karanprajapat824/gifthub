import Sidebar from './Sidebar';
import './../css/Product.css';
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";

const Product = () => {
    const { category, gender } = useParams();
    const [product, setProduct] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4040/getproduct/${category}/${gender}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const item = await response.json();
                setProduct(item);
                console.log(item);
            }
        }
        fetchData();
    }, [category, gender]);

    return (
        <div className='Mainproduct'>
            <Sidebar category={category} />
            <div className='mainproduct-cards'>
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
