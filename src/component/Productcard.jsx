import './../css/Productcard.css';

const Productcard = ({products,mainHeading})=>{
    return(
        <div className='product-card'>
            <div className='product-heading'>{mainHeading}</div>
            <div className='product-card-content'>
               {
                    products.map((item)=>(
                        <div className='product'>
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

export default Productcard;