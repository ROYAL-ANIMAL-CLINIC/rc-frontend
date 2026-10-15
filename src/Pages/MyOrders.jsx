import React from 'react'
import { useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import { dummyOrders } from '../assets/products'
import { useEffect } from 'react'

function MyOrders() {

  const [myOrders, setMyOrders] = useState([])
  const {currency ,axios,user} = useAppContext()

  //fetch the myOrders
  const fetchMyOrders = async ()=>{
   try {
    const {data} = await axios.get('/api/order/user')
    if(data.success){
      setMyOrders(data.orders)
    }
   } catch (error) {
    console.log(error);
   }
  }

  useEffect(()=>{
    if(user){
      fetchMyOrders()
    }
    
  },[user])
  return (
    <div className ='mt-26 pb-16 px-10'>
       <div className ='flex flex-col items-end w-max mb-8'>
       <p className =' text-2xl font-medium uppercase'>My Orders</p> 
       <div  className ='w-16 h-0.5 bg-blue-300 rounded-full '></div>
       </div>
       
       {myOrders.map((order,index)=>(
        <div key  ={index} className  = 'border border-gray-300 rounded-lg mb-10 p-10 py-5 max-w-4xl'>
          <p className  = 'flex justify-between md:items-center text-gray-500 md:font-medium max-md:flex-col '>
            <span>Order Id : {order._id}</span>
            <span>Cash On Delivery</span>
            <span>Total Amount : {currency}{order.amount}</span>
          </p>
         {order.items.map((item,index) =>(
          <div key = {index}
          className  = {`relative bg-white text-gray-900/70 ${
            order.items.length !== index + 1 && "border-b"  }
             border-gray-300 flex flex-col md:flex-row md:items-center justify-between  py-5 md:gap-10 w-full max-w-4xl `}>
              <div className = 'flex  items-center mb-4 md:mb-0'>
                <div className  = 'bg-blue-500/10  p-2 rounded-lg mt-5'> 
                  <img src  = {item.product.image} alt ='imageOrder' className = 'w-16 h-16'/>
                </div>

                <div className  = 'px-2 '>
                  <h2 className = 'text-gray-800 font-semibold text-lg'>{item.product.name}</h2>
                  <p> Category: {item.product.category}</p>  
                  </div>
                </div>

                <div className  = 'flex-flex-col justify-center md:ml-8 mb-4 md:mb-0 mt-5'>
                  <p>Quantity : {item.quantity || '1'}</p>
                  <p>Status : {order.status}</p>
                  <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div className  = 'text-blue-950 text-lg font-medium' > Amount : <p>{currency} {item.product.price * item.quantity}</p></div>
            </div>
         ))} 
          </div>
       )

       )}

    </div>
  )
}

export default MyOrders