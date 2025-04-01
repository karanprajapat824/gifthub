import { useEffect, useState } from 'react';
import './../css/Carousel.css';
import { GoDotFill } from "react-icons/go";
import { GoDot } from "react-icons/go";
import { CiSquareChevLeft,CiSquareChevRight } from "react-icons/ci";
const Carousel = ()=>{
    const [index,setIndex] = useState(0);

    const rightShift = ()=>{
       setIndex((index+1)%4) 
    }

    const leftShift = ()=>{
        if(index == 0) setIndex(3);
        else setIndex(index-1);
    }

    useEffect(()=>{
        const intervalId = setInterval(rightShift,3000);
        return ()=>clearInterval(intervalId);
    },[index]);

    return(
        <div className='carousel'>
            <div className='carousel-image' style={{transform : `translatex(${-index*100}%)`}}>
            <img src="./websiteImages/carousel1.png" alt="" />
            <img src="./websiteImages/carousel2.png" alt="" />
            <img src="./websiteImages/carousel3.png" alt="" />
            <img src="./websiteImages/carousel4.png" alt="" />
            </div>
            
            <div className='left-button' onClick={leftShift}>
            <CiSquareChevLeft className='button' />
            </div>
            <div className='right-button' onClick={rightShift}>
            <CiSquareChevRight className='button'/>
            </div>

            <div className='dots'>
                {index == 0 ? <GoDotFill /> : <GoDot />}
                {index == 1 ? <GoDotFill /> : <GoDot />}
                {index == 2 ? <GoDotFill /> : <GoDot />}
                {index == 3 ? <GoDotFill /> : <GoDot />}
            </div>
            
        </div>
    )
}

export default Carousel;