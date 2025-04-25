import Carousel from './Carousel';
import Board from './Board';
import Banner from "./Banner";
import Footer from "./Footer";


const Dashboard = ()=>{
    return(
        <div>     
            <Carousel />
            <Banner  mainHeading="Men"/>
            <Banner  mainHeading="Women"/>
            {/* <Banner  mainHeading="For Kids"/> */}
            {/* <Board mainHeading={"Flowers"} /> */}
            <Footer />
        </div>
    )
}

export default Dashboard;