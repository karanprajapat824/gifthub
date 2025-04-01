import { useState } from 'react';
import './../css/Sidebar.css';
const Sidebar =()=>{
    const [priceValue,setPriceValue] = useState(100);
    const cake = [
        {
            mainHeading : "Flavours",
            data : ["Choclate","Valina","Pineapple","Strawberry","fruits","Red velvet","Caramel","Coconut"]
        },
        {
            mainHeading : "Size",
            data : ["1 Pound","2 Pount","Greater then 3 Pound"]
        }
    ];

    const cloths = [
        {
            mainHeading : "Men",
            data : ["Shirt","T-shirts","Jeans","Shots","Kurtas","Sweters","Jakets"],
        },
        {
            mainHeading : "Women",
            data : ["Kurtis","Saree","Tops","T-shirts","Jeans","Plazzos","Shirts"]
        },
        {
            mainHeading : "Kids", 
            data : ["Shirt","T-shirts","Jeans","Shots","Kurtas","Sweters","Jakets","Tops"]
        }
    ];

    return(
        <div className='sidebar'>
            <div className='filter'>Filter & Category</div>
            <div className='filter-price'>
                <div>Price : {priceValue}</div>
                <input type='range' min="100" step="50" max="2000" onChange={(e)=>setPriceValue(Math.round(e.target.value))}></input>
            </div>
            <div className='filter-category'>
                {
                    cloths?.map((pro)=>(
                        <>
                        <div className='filter-heading'>{pro.mainHeading}</div>
                        {pro.data?.map((item)=>(
                            <div className='filter-content'>
                            <input type='checkbox'></input>
                            <div>{item}</div>
                            </div>
                        ))}
                        </>
                    ))
                }
                
                
            </div>
        </div>
    )
}

export default Sidebar;