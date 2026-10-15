import React from 'react'
import Categories from '../Components/Categories'
import ShopMain from '../Components/ShopMain'
import shopImage from '../assets/petshop.jpg'
import ProductCard from '../Components/ProductCard';
import BottomshopBanner from '../Components/BottomshopBanner';
import Contactinfo from './Contactinfo';
import ShopNavbar from '../Components/ShopNavbar';



const BgStyle2 = {
    backgroundImage: `url(${shopImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "local",
    height: "100%",
    width: "100%",
  };
  
  

function ShopPage() {
  return (

    <div>

     <ShopNavbar/>

    <div style={BgStyle2} className = "mt-5" ><ShopMain/> </div>
        
    <Categories/>

    <ProductCard/>

    <BottomshopBanner/>

    <Contactinfo/>


    </div>
  )
}

export default ShopPage