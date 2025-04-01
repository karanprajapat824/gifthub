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



  const forman = [
    {
      name : "watch",
      image : "./websiteImages/man-watch.jpg",
      category : "men"
    },
    {
      name : "Perfumes",
      image : "./websiteImages/man-perfume.webp",
      category : "men"
    },
    {
      name : "Wallets",
      image : "./websiteImages/man-wallet.jpg",
      category : "men"
    },
    {
      name : "Belts",
      image : "./websiteImages/man-belt.webp",
      category : "men"
    },
    {
      image : "./websiteImages/man-brecelat.jpg",
      name : "Bracelets",
      category : "men"
    },
    {
      name : "Shoes",
      image : "./websiteImages/man-shoes.jpeg",
      category : "men"
    },
    {
      name : "Man Fashions",
      image : "./websiteImages/man-fashion.jpeg",
      category : "men"
    },
    {
      name : "Key-Chains",
      image : "./websiteImages/man-keychains.webp",
      category : "men"
    },
    {
      name : "Mugs",
      image : "./websiteImages/man-mug.jpeg",
      category : "men"
    }
  ];

  const forwomen = [
    {
      name : "Watches",
      image : "./websiteImages/women-watch.webp"
    },
    {
      name : "Perfumes",
      image : "./websiteImages/women-perfume.webp"
    },
    {
      name : "Teddy Bears",
      image : "./websiteImages/women-teddy.webp"
    },
    {
      name : "Choclates",
      image : "./websiteImages/choclate.jpeg"
    },
    {
      image : "./websiteImages/women-jewellery.jpeg",
      name : "Jewellary"
    },
    {
      name :"MakeUp",
      image : "./websiteImages/women-makup.jpeg"
    },
    {
      name :"Bags",
      image :"./websiteImages/women-bag.jpeg"
    },
    {
      name : "Shoes",
      image : "./websiteImages/women-shoes.webp"
    },
    {
      name : "Women Fashions",
      image : "./websiteImages/women-fashion.jpg"
    },
    {
      name : "Key-Chains",
      image : "./websiteImages/women-keychain.webp"
    }
  ];

  const forkids = [
    {
      name : "Watches",
      image : "./websiteImages/kid-image.jpeg"
    },
    {
      name :"Toys",
      image : "./websiteImages/kid-toy.jpeg"
    },
    {
      name :"Fashion",
      image : "./websiteImages/kid-fashion.jpeg"
    },
    {
      name :"Shoes",
      image : "./websiteImages/kid-shoes.jpeg"
    }
  ];

const Dashboard = ()=>{
    return(
        <div>     
            <Carousel />
            <Banner products={forman} mainHeading="For Man"/>
            <Banner products={forwomen} mainHeading="For Women"/>
            <Banner products={forkids} mainHeading="For Kids"/>
            <Board mainHeading={"Flowers"} board={flower}/>
            <Footer />
        </div>
    )
}

export default Dashboard;