import { useEffect, useState } from 'react';
import './../css/Board.css';

const Board = ({mainHeading})=>{
    const [board,setBoard] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await fetch("http://localhost:4040/getProducts",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    category : mainHeading
                })
            });
            if(response.ok){
                const data = await response.json();
                setBoard(data);            
            }
        }
        fetchData();    
    },[]);
    return(
        <div className='board'>
            <div className='board-content'>
                <div className='board-top'>
                    <div className='board-heading'>{mainHeading}</div>
                        <button>View All</button>
                </div>
                <div className='board-down'>
                    {
                        board?.slice(0,4).map((item,index)=>(
                            <div key={index} className='round-board'>
                            <div className='round-image'>
                                <img src={item.images[0]}></img>
                            </div>
                            <div className='round-board-heading'>{item.productName}</div>
                            </div>
                        ))
                    }
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Board;