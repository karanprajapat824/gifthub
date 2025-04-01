import { useState } from 'react';
import './../css/AddProduct.css';

const AddProduct = ()=>{
    const [name,setName] = useState("");
    const [des,setDes] = useState("");
    const [price,setPrice] = useState(0);
    const [url,setUrl] = useState("");
    const [category,setCategory] = useState("");
    const [product,setProduct] = useState("");

    const sendData = async ()=>{
        const response = await fetch("http://localhost:4040/addproduct",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name,description : des,price,url,category,product})
        }) ;

        if(response.ok)
        {
            alert("Done");
        }
        else alert("error");
    }

    return(
        <div className="addproduct-container">
            <div className='addproduct-fields'>
                <div>Name</div>
                <input type='text' onChange={(event)=>setName(event.target.value)}></input>
            </div>
            <div className='addproduct-fields'>
                <div>Description</div>
                <input type='text' onChange={(event)=>setDes(event.target.value)}></input>
            </div>
            <div className='addproduct-fields'>
                <div>price</div>
                <input type='text' onChange={(event)=>setPrice(event.target.value)}></input>
            </div>
            <div className='addproduct-fields'>
                <div>Image URL</div>
                <input type='text' onChange={(event)=>setUrl(event.target.value)}></input>
            </div>
            <div className='addproduct-fields'>
                <div>Category</div>
                <input type='text' onChange={(event)=>setCategory(event.target.value)}></input>
            </div>
            <div className='addproduct-fields'>
                <div>product</div>
                <input type='text' onChange={(event)=>setProduct(event.target.value)}></input>
            </div>
            <button onClick={sendData}>Add me</button>
        </div>
    )
}

export default AddProduct;