import MenuBar from './MenuBar';
import Carousel from './Carousel';
import Board from './Board';
import Productcard from "./Productcard";
import Footer from "./Footer";

const flower = [
    {
      name : "Rose",
      image : "rose.webp",
    },
    {
      name : "Carnations",
      image : "Carnations.webp"
    },
    {
      name : "Orchids",
      image : "Orchids.webp"
    },
    {
      name : "Personalization Flowers",
      image : "Personal.webp"
    }
  ];


  const cake = [
    {
      name : "Choclate Cakes",
      image : "cake1.webp",
    },
    {
      name : "ButterScotch Cakes",
      image : "cake2.webp"
    },
    {
      name : "Pineapple Cakes",
      image : "cake3.webp"
    },
    {
      name : "Fruit Cakes",
      image : "cake4.webp"
    }
  ];

  const forman = [
    {
      name : "Watches",
      image : "watch.avif"
    },
    {
      name : "Perfumes",
      image : "man-perfume.webp"
    },
    {
      name : "Wallets",
      image : "wallet.jpg"
    },
    {
      name : "Belts",
      image : "balt.jpg"
    },
    {
      image : "bracelet.jpg",
      name : "Bracelets"
    },
    {
      name : "Shoes",
      image : "man-shoes.jpg"
    },
    {
      name : "Man Fashions",
      image : "man-fasion.jpg"
    },
    {
      name : "Key-Chains",
      image : "keychain.jpg"
    },
    {
      name : "Mugs",
      image : "man-mug.webp"
    }
  ];

  const forwomen = [
    {
      name : "Watches",
      image : "watch-women.jpeg"
    },
    {
      name : "Perfumes",
      image : "w-perfumes.jpeg"
    },
    {
      name : "Teddy Bears",
      image : "teddy.jpeg"
    },
    {
      name : "Choclates",
      image : "choclates.webp"
    },
    {
      image : "women-jewellery.jpeg",
      name : "Jewellary"
    },
    {
      name :"MakeUp",
      image : "women-makeup-kit.jpg"
    },
    {
      name :"Bags",
      image :"beg.jpeg"
    },
    {
      name : "Shoes",
      image : "women-shoes.jpg"
    },
    {
      name : "Women Fashions",
      image : "w-fashions.jpeg"
    },
    {
      name : "Key-Chains",
      image : "keychain.jpg"
    },
  ];

  const forkids = [
    {
      name : "Watches",
      image : "k-watches.jpeg"
    },
    {
      name :"Toys",
      image : "k-toys.jpeg"
    },
    {
      name :"",
      image : ""
    }
  ];

const Dashboard = ()=>{
    return(
        <div>     
            <MenuBar />
            <Carousel />
            <Productcard products={forman} mainHeading="For Man"/>
            <Productcard products={forwomen} mainHeading="For Women"/>
            <Productcard products={forkids} mainHeading="For Kids"/>
            <Board mainHeading={"Flowers"} board={flower}/>
            <Board mainHeading={"Cakes"} board={cake}/>
            <Footer />
        </div>
    )
}

export default Dashboard;