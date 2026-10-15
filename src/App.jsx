import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Service from './Components/Service';
import FAQ from './Components/FAQ';
import Contactinfo from './Pages/Contactinfo';
import BlogPage from './Pages/BlogPage';
import AboutPage from './Pages/AboutPage';
import ShopPage from './Pages/ShopPage';
import AppointmentPage from './Pages/AppointmentPage';
import { Toaster } from "react-hot-toast";
import { useAppContext } from './Context/AppContext';
import Login from './Components/Login';
import AllProducts from './Pages/AllProducts';
import ProductCategory from './Pages/ProductCategory';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import AddAddress from './Pages/AddAddress';
import MyOrders from './Pages/MyOrders';
import SellerLogin from './Components/Seller/SellerLogin';
import SellerLayout from './Pages/Seller/SellerLayout';
import Addproduct from './Pages/Seller/Addproduct';
import ProductList from './Pages/Seller/ProductList';
import Orders from './Pages/Seller/Orders';
import AdminAppointment from './Pages/Seller/AdminAppointment';
 

function App() {

  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  
  const {showUserLogin ,isSeller }  = useAppContext();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className = "text-default min-h-screen text-gray-700 bg-white" >
     {isSellerPath ? null:<Navbar/>} 
     {showUserLogin ? <Login/> : null}

     <Toaster />

      <div className = {`page-transition ${isSellerPath ? "" : "px-2 md:px-2 lg:px-2 xl:px-2"}`}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path=' '  element={<ProductDetails/>}/>
          <Route path='/cart' element={<div className ="mt-25" ><Cart/></div>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/about' element={<div className ="mt-15" ><AboutPage/></div>}/>
          <Route path='/services' element={<div className ="mt-20" ><Service/></div>}/>
          <Route path='/appointment' element={<div className ="mt-15" ><AppointmentPage/></div>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/faq' element={<div className ="mt-15" ><FAQ/></div>}/>
          <Route path='/blog' element={<div className ="mt-15"> <BlogPage/></div>}/>
          <Route path='/contact' element={<div className ="mt-15" ><Contactinfo/></div>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>

          <Route path='/seller' element={ isSeller ? <SellerLayout/> : <SellerLogin/>}>
            <Route index element={isSeller ? <Addproduct/>: null} /> 
            <Route path='product-list' element= {<ProductList/>} />
            <Route path='orders' element={<Orders/>} />
            <Route path='appointment' element={<AdminAppointment/>} />
          </Route>

          

        </Routes>
      </div>
    </div>
  )
}

export default App
