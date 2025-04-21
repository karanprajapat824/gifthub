import Carousel from './Carousel';
import Board from './Board';
import Banner from "./Banner";
import Footer from "./Footer";

const flower = [
    {
      name : "Rose",
      image : "./websiteImages/rose.webp",
    },
    {
      name : "Carnations",
      image : "./websiteImages/Carnations.webp"
    },
    {
      name : "Orchids",
      image : "./websiteImages/Orchids.webp"
    },
    {
      name : "Personalization Flowers",
      image : "./websiteImages/Personal.webp"
    }
  ];


const Dashboard = ()=>{
    return(
        <div>     
            <Carousel />
            <Banner  mainHeading="Men"/>
            {/* <Banner  mainHeading="For Women"/> */}
            {/* <Banner  mainHeading="For Kids"/> */}
            {/* <Board mainHeading={"Flowers"} /> */}
            <Footer />
        </div>
    )
}

export default Dashboard;