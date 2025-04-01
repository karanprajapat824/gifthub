import './../css/Banner.css';
import { useNavigate } from 'react-router-dom';
const Banner = ({products,mainHeading})=>{
    const navigate = useNavigate();

    const handleNavigate = (productname,category)=>{
        navigate(`/products/${productname}/${category}`);
    }

    return(
        <div className='product-card'>
            <div className='product-heading'>{mainHeading}</div>
            <div className='product-card-content'>
               {
                    products.map((item)=>(
                        <div onClick={()=>handleNavigate(item.name,item.category)} className='product'>
                        <div className='product-image'>
                            <img src={item.image}/>
                        </div>
                        <div className='product-name'>{item.name}</div>
                </div>
                    ))
               }
            </div>
        </div>
    )
}

export default Banner;